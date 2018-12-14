<template>
  <el-form :model="formModel" label-width="110px">
    <el-row :gutter="10">
      <el-col :span="12">
        <el-form-item label="出库日期：">
          <el-input v-model="saleDate" readonly></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="出库经办人：">
          <el-input v-model="formModel.operator" readonly></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
        <el-form-item label="客户名称：">
          <el-input v-model="formModel.psName" readonly></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="所在地区：">
          <el-input v-model="formModel.psRegion" readonly></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
        <el-form-item label="详细地址：">
          <el-input v-model="formModel.psAddress" readonly></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="联系人：">
          <el-input v-model="formModel.contactMan" readonly></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
        <el-form-item label="合同编号：">
          <el-input v-model="formModel.saleContract" readonly></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="联系方式：">
          <el-input v-model="formModel.contactTelPhone" readonly></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
export default {
  name: 'DialogDetail',
  data() {
    return {
      formModel: {
        saleDate: '',
        psAddress: '',
        psRegion: '',
        saleContract: '',
        contactMan: '',
        contactTelPhone: '',
        psName: '',
        operator: '',
      },
    };
  },
  computed: {
    saleDate() {
      if (!this.formModel.saleDate) {
        return '';
      }
      return this.$hp.formatDate(this.formModel.saleDate, 'Y-m-d');
    },
  },
};
</script>

<style>

</style>
