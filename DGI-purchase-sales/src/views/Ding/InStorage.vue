<template>
  <el-card>
    <el-radio-group v-model="labelPosition" size="small" class="mar-b-sm">
      <el-radio-button label="left">左对齐</el-radio-button>
      <el-radio-button label="right">右对齐</el-radio-button>
      <el-radio-button label="top">顶部对齐</el-radio-button>
    </el-radio-group>
    <el-form :label-position="labelPosition" label-width="100px">
      <el-form-item label="生产厂商：">
        <el-select v-model="form.name" style="width: 100%;">
          <el-option value="123" label="456"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="联系人：">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="联系方式：">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="数采仪名称：">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <router-link :to="{ name: 'InfoList' }">
        <el-button type="primary" round style=" width: 100%;" class="mar-t-sm">保存</el-button>
      </router-link>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'InStorage',
  data() {
    return {
      labelPosition: 'top',
      form: {
        name: '',
      },
    };
  },
};
</script>

<style>

</style>
