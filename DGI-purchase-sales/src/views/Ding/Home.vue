<template>
  <el-row :gutter="10" style="text-align: center; height: auto;">
    <el-col :xs="24" :sm="12" :md="6">
      <router-link :to="{ name: 'InStorage' }" tag="h3">入库</router-link>
    </el-col>
    <el-col :xs="24" :sm="12" :md="6">
      <router-link :to="{ name: 'Home' }" tag="h3">领用</router-link>
    </el-col>
    <el-col :xs="24" :sm="12" :md="6">
      <router-link :to="{ name: 'Home' }" tag="h3">测试</router-link>
    </el-col>
    <el-col :xs="24" :sm="12" :md="6">
      <router-link :to="{ name: 'Home' }" tag="h3">维修</router-link>
    </el-col>
    <el-col :xs="24" :sm="12" :md="6">
      <router-link :to="{ name: 'Home' }" tag="h3">出库</router-link>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style>

</style>
