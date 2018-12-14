<template>
  <!-- <el-row :gutter="10" style="text-align: center; height: auto;">
    <el-col :xs="24" :sm="12" :md="6">
      <router-link :to="{ name: 'InStorage' }">入库</router-link>
    </el-col>
    <el-col :xs="24" :sm="12" :md="6">
      <router-link :to="{ name: 'Home' }">领用</router-link>
    </el-col>
    <el-col :xs="24" :sm="12" :md="6">
      <router-link :to="{ name: 'Home' }">测试</router-link>
    </el-col>
    <el-col :xs="24" :sm="12" :md="6">
      <router-link :to="{ name: 'Home' }">维修</router-link>
    </el-col>
    <el-col :xs="24" :sm="12" :md="6">
      <router-link :to="{ name: 'Home' }">出库</router-link>
    </el-col>
  </el-row> -->
  <div class="home-page">
    <router-link :to="{ name: 'InStorage' }" tag="div" class="putInStorage">
      入库
    </router-link>
    <router-link :to="{ name: 'Receive' }" tag="div" class="receive">
      领用
    </router-link>
    <router-link :to="{ name: 'DgiTest' }" tag="div" class="test">
      测试
    </router-link>
    <router-link :to="{ name: 'Service' }" tag="div" class="maintenance">
      维修
    </router-link>
    <router-link :to="{ name: 'OutStorage' }" tag="div" class="outOfStorage">
      出库
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style lang="scss" scoped>
.home-page{
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: .2rem 2% .1rem;
  font-size: .4rem;
  font-family: "微软雅黑";
  background: #f5f7fa;
  // background: url('../../assets/bg.jpg') no-repeat 12% 40%;
  // background-image: linear-gradient(270deg, #89f7fe 0%, #66a6ff 100%);
  overflow: hidden;
  >div{
    flex: 1;
    position: relative;
    margin: 0rem 0 .1rem;
    padding: .15rem;
    border: 1px solid #ebeef5;
    // box-shadow: 0px 2px 12px 0 rgba(0,0,0,.2);
    border-radius: .2rem;
    color: #409EFF;
    font-size: .7rem;
    font-weight: 600;
    text-shadow: .04rem .08rem .1rem rgba(0,0,0,.2);
    background: rgba(255, 255, 255, .2);
    &::after{
      content: '';
      position: absolute;
      right: 0;
      bottom: 50%;
      transform: translateY(50%);
      border: .32rem solid transparent;
      border-left-color: #409EFF;
      border-radius: .1rem;
    }
  }
}
</style>
