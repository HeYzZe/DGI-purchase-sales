<template>
  <el-container>
    <el-header>
      <el-menu
        mode="horizontal"
        :default-active="$route.name">
        <el-menu-item index="BusinessManagement">
          <router-link class="clickExpand" tag="div" :to="{ name: 'BusinessManagement' }">企业管理</router-link>
        </el-menu-item>
        <el-menu-item index="ManufacturerManagement">
          <router-link class="clickExpand" tag="div" :to="{ name: 'ManufacturerManagement' }">生产厂商管理</router-link>
        </el-menu-item>
        <el-menu-item index="CustomerManagement">
          <router-link class="clickExpand" tag="div" :to="{ name: 'CustomerManagement' }">客户管理</router-link>
        </el-menu-item>
        <el-menu-item index="StorageManagement">
          <router-link class="clickExpand" tag="div" :to="{ name: 'StorageManagement' }">仓库管理</router-link>
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {};
  },
  created() {},
};
</script>
