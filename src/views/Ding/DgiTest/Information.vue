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
      <el-form-item label="测试人：" prop="operator">
        <el-input v-model="itemModel.operator">
          <template slot="append">
            <el-button @click="onRefresh"><i class="fas fa-sync-alt"></i></el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="测试时间：" prop="testDate">
        <el-input type="datetime-local" v-model="dateTime">
        </el-input>
      </el-form-item>
      <el-form-item label="测试结果：" prop="result">
        <el-select v-model="itemModel.result" style="width: 100%;">
          <el-option :value="1" label='合格'></el-option>
          <el-option :value="2" label='不合格'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="测试说明：" prop="testExplain">
        <el-input type="textarea" v-model="itemModel.testExplain"></el-input>
      </el-form-item>
      <el-button type="primary" round style="width: 100%;" class="mar-t-sm" @click="onSave">保存</el-button>
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
        testDate: '',
        result: 1,
      },
      dateTime: '', // 表单展示入库时间
      index: undefined, // 选择编辑的索引 undefined--新增 [0-9]--索引值
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
          { required: true, message: '请输入测试人', trigger: 'blur' },
        ],
        testDate: [
          { required: true, message: '请选择测试时间', trigger: 'blur' },
        ],
        result: [
          { required: true, message: '请选择测试结果', trigger: 'change' },
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
        this.itemModel.testDate = `${value.split('T')[0]} ${value.split('T')[1]}:00`;
      }
    },
  },
  created() {
    this.$store.dispatch('GET_PSBASE_LIST');
    this.index = this.$route.params.index;
    if (typeof (this.$route.params.index) === 'number') { // 编辑
      this.itemModel = this.$route.params.itemModel;
      this.dateTime = `${this.itemModel.testDate.split(' ')[0]}T${this.itemModel.testDate.split(' ')[1].substr(0, 5)}`;
    } else { // 新增
      this.itemModel.operator = this.userInfo.name;
    }
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
    onGetDate() {
      this.$dd.datetimepicker({}, (result) => {
        this.dateTime = result.body.value;
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
      // this.itemModel.testDate = this.dateTime !== ''
      //   ? `${this.dateTime.split('T')[0]} ${this.dateTime.split('T')[1]}:00`
      //   : '';
      let flag = true;
      this.itemList.forEach((element) => {
        if (element.dgiCode === this.itemModel.dgiCode) {
          flag = false;
        }
      });
      this.$refs.itemForm.validate((valid) => {
        if (!valid) {
          return;
        }
        if (typeof (this.index) === 'number') { // 编辑
          this.$store.commit('editTestDgiInfo', {
            index: this.index,
            itemModel: {
              ...this.itemModel,
              isSelected: false,
            },
          });
          this.$router.push({ name: 'DgiTest' });
        } else if (flag) {
          this.$store.commit('addTestDgiInfo', {
            ...this.itemModel,
            isSelected: false,
          });
          this.$router.push({ name: 'DgiTest' });
        } else {
          this.$message({
            message: '该数采仪已在测试列表。',
            type: 'error',
          });
        }
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
