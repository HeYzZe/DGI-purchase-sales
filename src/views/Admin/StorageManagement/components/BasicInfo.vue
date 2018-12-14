<template>
  <el-form :model="formModel" label-width="100px">
    <el-row :gutter="10">
      <el-col :span="12">
        <el-form-item label="数采仪名称：">
          <el-input v-model="formModel.dgiName" readonly></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="数采仪编号：">
          <el-input v-model="formModel.dgiCode" readonly></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
        <el-form-item label="MN号："><el-input v-model="formModel.dgiMN" readonly></el-input></el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="主板型号："><el-input v-model="formModel.mainBoardModel" readonly></el-input></el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
        <el-form-item label="生产批号：">
          <el-input v-model="formModel.productionBatchNumber" readonly></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="生产厂商："><el-input v-model="formModel.psName" readonly></el-input></el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
        <el-form-item label="联系人："><el-input v-model="formModel.contactMan" readonly></el-input></el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="联系方式："><el-input v-model="formModel.contactTelPhone" readonly></el-input></el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
        <el-form-item label="入库日期："><el-input v-model="getDate" readonly></el-input></el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="入库经办人："><el-input v-model="formModel.operator" readonly></el-input></el-form-item>
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
        dgiName: '',
        dgiCode: '',
        dgiMN: '',
        mainBoardModel: '',
        productionBatchNumber: '',
        psName: '',
        contactMan: '',
        contactTelPhone: '',
        getDate: '',
        operator: '',
      },
    };
  },
  computed: {
    getDate() {
      if (!this.formModel.getDate) {
        return '';
      }
      return this.$hp.formatDate(this.formModel.getDate, 'Y-m-d');
    },
  },
};
</script>

<style>

</style>
