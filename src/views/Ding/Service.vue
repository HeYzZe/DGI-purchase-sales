<template>
  <el-row style="background-color: #fafafa;" class="pad-a-sm">
    <el-form ref="itemForm" :rules="rules" :model="itemModel" label-width="125px">
      <el-form-item label="数采仪名称：">
        <el-input v-model="itemModel.dgiName" readonly></el-input>
      </el-form-item>
      <el-form-item label="主板型号：" prop="mainBoardModel">
        <el-input type="number" v-model="itemModel.mainBoardModel">
          <template slot="append">
            <el-button @click="onScan"><i class="fas fa-barcode"></i></el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="生产批号：" prop="productionBatchNumber">
        <el-input type="number" v-model="itemModel.productionBatchNumber"></el-input>
      </el-form-item>
      <el-form-item label="数采仪编号：" prop="dgiCode">
        <!-- @blur="onDgiCodeChange" -->
        <el-input type="number" v-model="itemModel.dgiCode" ></el-input>
      </el-form-item>
      <el-form-item label="生产厂商：">
        <el-select v-model="itemModel.psId" style="width: 100%;" disabled>
          <el-option v-for="(item, index) in psBaseList"
            :key="index"
            :value="item.rowGuid"
            :label="item.psName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="维修人：" prop="operator">
        <el-input v-model="itemModel.operator">
          <template slot="append">
            <el-button @click="onRefresh"><i class="fas fa-sync-alt"></i></el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="维修时间：" prop="repairDate"
      :rules="{ required: true, message: '请选择维修时间', trigger: 'blur' }">
        <el-input type="datetime-local" v-model="dateTime">
        </el-input>
      </el-form-item>
      <el-form-item label="维修结果：" prop="result">
        <el-select v-model="itemModel.result" style="width: 100%;">
          <el-option :value="1" label='通过'></el-option>
          <el-option :value="2" label='不通过'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="维修原因：" prop="destroyCause">
        <el-input type="textarea" v-model="itemModel.destroyCause"></el-input>
      </el-form-item>
      <el-form-item label="维修说明：" prop="repairExplain">
        <el-input type="textarea" v-model="itemModel.repairExplain"></el-input>
      </el-form-item>
      <el-button type="primary" round style="width: 100%;" class="mar-t-sm" @click="onSave">提交</el-button>
    </el-form>
  </el-row>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Information',
  data() {
    const validateDgiCode = (rule, value, callback) => {
      if (value) {
        this.GET_DGI_INFO(value).then((flag) => {
          if (!flag) {
            callback(new Error('请输入合适的数采仪编码'));
          } else {
            callback();
          }
        });
      }
    };
    return {
      itemModel: {
        dgiName: '',
        psId: '',
        mainBoardModel: '', // 主板型号
        productionBatchNumber: '', // 生产批号
        dgiCode: '', // 数采仪编号
        operator: '',
        repairDate: '',
        result: 1,
        destroyCause: '', // 仪器损坏原因
        repairExplain: '', // 维修说明
      },
      dateTime: '', // 表单展示入库时间
      rules: {
        dgiName: [
          { required: true, message: '请输入数采仪名称', trigger: 'blur' },
        ],
        mainBoardModel: [
          { required: true, message: '请输入主板型号', trigger: 'blur' },
        ],
        productionBatchNumber: [
          { required: true, message: '请输入生产批号', trigger: 'blur' },
        ],
        dgiCode: [
          { required: true, message: '请输入数采仪编号', trigger: 'blur' },
          { validator: validateDgiCode, trigger: 'blur' },
        ],
        psId: [
          { required: true, message: '请选择生产厂商', trigger: 'change' },
        ],
        operator: [
          { required: true, message: '请输入维修人', trigger: 'blur' },
        ],
        result: [
          { required: true, message: '请选择维修结果', trigger: 'change' },
        ],
        destroyCause: [
          { required: true, message: '请选择维修原因', trigger: 'change' },
        ],
        repairExplain: [
          { required: true, message: '请选择维修说明', trigger: 'change' },
        ],
      },
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo,
      itemList: state => state.Receive.testList,
      psBaseList: state => state.PsBaseList,
    }),
  },
  watch: {
    dateTime(value) {
      if (value) {
        this.itemModel.repairDate = `${value.split('T')[0]} ${value.split('T')[1]}:00`;
      }
    },
  },
  created() {
    this.$store.dispatch('GET_PSBASE_LIST');
    this.itemModel.operator = this.userInfo.name;
  },
  methods: {
    onRefresh() {
      this.$dd.showPreloader({});
      this.$dd.getAuthCode((code) => {
        this.$http.get(`auth/getUserInfo/${code}`).then((result) => {
          this.itemModel.operator = result.data.name;
          this.$dd.hidePreloader();
        }, () => {
          this.$dd.hidePreloader();
        });
      });
    },
    onScan() {
      this.$dd.scan({
        type: 'bar',
      }, (result) => {
        this.itemModel.dgiCode = result.body.text;
        this.GET_DGI_INFO(result.body.text);
        this.dateTime = this.$hp.formatDate(new Date(), 'Y-m-dTH:i:00');
      });
    },
    GET_DGI_INFO(dgiCode) {
      return new Promise((resolve) => {
        this.$http.get(`dgi/dgiInfo/code/${dgiCode}`).then((response) => {
          if (response.status === 200) {
            if (Object.keys(response.data).length === 0) {
              resolve(false);
            } else {
              resolve(true);
              this.itemModel.dgiName = response.data.dgiName;
              this.itemModel.psId = response.data.psId;
              this.itemModel.mainBoardModel = response.data.mainBoardModel;
              this.itemModel.productionBatchNumber = response.data.productionBatchNumber;
              this.itemModel.dgiId = response.data.rowGuid;
            }
          } else {
            this.$message({
              message: response.data.message,
              type: 'error',
            });
          }
        }, ({ response }) => {
          this.$hp.resp(response);
        });
      });
    },
    onSave() {
      this.$refs.itemForm.validate((valid) => {
        if (!valid) {
          return;
        }
        this.$http.post('dgi/dgiRepair', { ...this.itemModel }).then((response) => {
          if (response.status === 200) {
            this.$message({
              showClose: true,
              message: '操作成功',
              type: 'success',
            });
            this.$router.push({ name: 'DingHome' });
          } else {
            this.$message({
              showClose: true,
              message: response.data.message,
              type: 'error',
            });
          }
        }, ({ response }) => {
          this.$hp.resp(response);
        });
      });
    },
  },
};
</script>

<style scoped>
  .el-form .el-form-item {
    margin-bottom: 15px;
  }
</style>
