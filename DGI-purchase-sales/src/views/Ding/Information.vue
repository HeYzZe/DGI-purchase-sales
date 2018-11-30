<template>
  <el-row style="background-color: #fafafa;" class="pad-a-sm">
    <el-button @click="onScan">扫一扫</el-button>
    <el-form label-position="right" label-width="115px">
      <el-form-item label="数采仪名称：">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="主板型号：">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="生产批号：">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="数采仪编号：">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="生产厂商：">
        <el-select v-model="form.name">
          <el-option value="123" label="456"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="联系人：">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="联系方式：">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="采购合同编号：">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="入库人：">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="入库时间：">
        <el-date-picker
          v-model="form.name"
          :editable="false"
          type="date"
          value-format="yyyy-M-dd 00:00:00"
          placeholder="选择日期"
          style="width: 100%;">
        </el-date-picker>
      </el-form-item>
      <router-link :to="{ name: 'InfoList' }">
        <el-button type="primary" round style=" width: 100%;" class="mar-t-sm">保存</el-button>
      </router-link>
    </el-form>
  </el-row>
</template>

<script>
export default {
  name: 'Information',
  data() {
    return {
      form: {
        name: '',
      },
    };
  },
  methods: {
    onScan() {
      this.$dd.scan({
        type: 'bar',
      }, (res) => {
        // console.log(res);
        this.$message(res.body.text);
        // this.name = `${res} + ${code}`;
        // this.$dd.alert({
        //   title: code,
        //   message: res,
        // });
      });
    },
  },
};
</script>

<style scoped>
  .el-form .el-form-item {
    margin-bottom: 10px;
  }
</style>
