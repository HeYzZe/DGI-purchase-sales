<template>
  <el-dialog
    :title="dialogData.title"
    :visible.sync="detailVisible"
    :close-on-click-modal="false"
    @close="closeDialog">
    <el-form
      v-if="$route.name !== 'CustomerManagement'"
      ref="Form"
      :model="entiseInfation"
      label-width="96px"
      :rules="rules"
      class="mar-t-sm">
      <el-form-item label="企业类别：" prop="psTypes">
        <el-checkbox-group v-model="entiseInfation.psTypes">
          <el-checkbox :label="1" name="psTypes">生产厂商</el-checkbox>
          <el-checkbox :label="2" name="psTypes">客户</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="企业名称：" prop="psName">
        <el-input v-model.trim="entiseInfation.psName"></el-input>
      </el-form-item>
      <el-form-item label="所在地区：" prop="psRegion">
        <el-input v-model.trim="entiseInfation.psRegion"></el-input>
      </el-form-item>
      <el-form-item label="地址：" prop="psAddress">
        <el-input v-model.trim="entiseInfation.psAddress"></el-input>
      </el-form-item>
      <el-form-item label="联系人：" prop="contactMan">
        <el-input v-model.trim="entiseInfation.contactMan"></el-input>
      </el-form-item>
      <el-form-item label="联系方式：" prop="contactTelPhone">
        <el-input v-model.trim="entiseInfation.contactTelPhone"></el-input>
      </el-form-item>
    </el-form>
    <el-tabs v-else>
      <el-tab-pane label="客户管理">
        <el-form
          ref="Form"
          :model="entiseInfation"
          label-width="96px"
          :rules="rules"
          class="mar-t-sm">
          <el-form-item label="企业类别：" prop="psTypes">
            <el-checkbox-group v-model="entiseInfation.psTypes">
              <el-checkbox :label="1" name="psTypes">生产厂商</el-checkbox>
              <el-checkbox :label="2" name="psTypes">客户</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="企业名称：" prop="psName">
            <el-input v-model.trim="entiseInfation.psName"></el-input>
          </el-form-item>
          <el-form-item label="所在地区：" prop="psRegion">
            <el-input v-model.trim="entiseInfation.psRegion"></el-input>
          </el-form-item>
          <el-form-item label="地址：" prop="psAddress">
            <el-input v-model.trim="entiseInfation.psAddress"></el-input>
          </el-form-item>
          <el-form-item label="联系人：" prop="contactMan">
            <el-input v-model.trim="entiseInfation.contactMan"></el-input>
          </el-form-item>
          <el-form-item label="联系方式：" prop="contactTelPhone">
            <el-input v-model.trim="entiseInfation.contactTelPhone"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="合同记录">
        <el-table :data="itemList" border stripe class="mar-t-xs" style="height: calc(100% - 10px)">
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column label="合同编号" prop="xxx"></el-table-column>
          <el-table-column label="合同总需求量" prop="xxx"></el-table-column>
          <el-table-column label="已出库数量" prop="xxx"></el-table-column>
          <el-table-column label="待出库数量" prop="xxx"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <span slot="footer">
      <el-button @click="onSaveItem" size="small" type="primary">
        <i class="fas fa-save" aria-hidden="true"></i> 保 存
      </el-button>
      <el-button size="small" @click="closeDialog">
        <i class="fas fa-times" aria-hidden="true"></i> 关 闭
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'ManagementDetail',
  props: ['dialogData'],
  data() {
    return {
      detailVisible: false,
      rules: {
        psName: [
          { required: true, message: '请输入企业名称', trigger: 'blur' },
        ],
        psAddress: [
          { required: true, message: '请输入详细地址', trigger: 'blur' },
        ],
        psRegion: [
          { required: true, message: '请输入所在地区', trigger: 'blur' },
        ],
        contactMan: [
          { required: true, message: '请输入所在地区', trigger: 'blur' },
        ],
        contactTelPhone: [
          { required: true, message: '请输入所在地区', trigger: 'blur' },
        ],
        psTypes: [
          {
            required: true, type: 'array',  message: '请选择企业类别', trigger: 'change',
          },
        ],
      },
      psTypeData: [
        { label: '客户', value: 2 },
        { label: '生产厂商', value: 1 },
      ],
      entiseInfation: {
        psTypes: [],
        psName: '',
        psRegion: '',
        psAddress: '',
        contactMan: '',
        contactTelPhone: '',
      },
      itemList: [],
    };
  },
  methods: {
    closeDialog() {
      this.detailVisible = false;
      this.$refs.Form.resetFields();
      this.entiseInfation = this.getEmptyForm();
    },
    onSaveItem() {
      this.$refs.Form.validate((valid) => {
        if (!valid) return;
        this.$http[this.dialogData.rowGuid === '' ? 'post' : 'put']('dgi/psBaseInfo', this.entiseInfation)
          .then((response) => {
            if (response.status === 200) {
              this.$message({
                showClose: true,
                message: '恭喜你，操作成功',
                type: 'success',
              });
              this.$emit('getData');
              this.detailVisible = false;
            } else {
              this.$message({
                showClose: true,
                message: response.data.msg,
                type: 'error',
              });
            }
          }, ({ response }) => {
            this.$hp.resp(response);
          });
      });
    },
    getEmptyForm() {
      return {
        psTypes: [],
        psName: '',
        psRegion: '',
        psAddress: '',
        contactMan: '',
        contactTelPhone: '',
      };
    },
  },
};
</script>

<style scoped>

</style>
