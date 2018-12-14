<template>
  <el-container>
    <el-header height="40px" class="mar-t-xs mar-b-xs" style="line-height: 40px;">
      <el-button type="primary" size="medium">新 增</el-button>
    </el-header>
    <hr/>
    <el-main style="padding: 10px;">
      <el-card>
        <h2 v-for="(item, i) in itemList" :key="i" @touchstart.prevent="onTouchStart" @touchend="onTouchEnd">
          <el-checkbox v-model="selectionItem[i]" @touchstart.stop.native="onTouchSelect" v-show="longPressFlag"></el-checkbox>
          321
        </h2>
      </el-card>
    </el-main>
    <hr/>
    <el-footer height="40px" class="mar-b-sm" style="line-height: 40px;">
      <el-switch
        v-if="longPressFlag"
        v-model="allSelection"
         active-text="全 选"
        active-color="#409EFF">
      </el-switch>
      <div class="float-r">
        <el-button v-if="!longPressFlag" type="warning" size="medium" @click="onSubmit">提 交</el-button>
        <el-button v-else type="danger" size="medium">删 除</el-button>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  name: 'InfoList',
  data() {
    return {
      value: '',
      itemList: new Array(120), // 数据列表
      loop: '', // 按住不放定时器id
      longPressFlag: false, // 长按后为true，短按为false
      selectionItem: [], // 选中的数组
      allSelection: false, // 是否为全选
    };
  },
  watch: {
    longPressFlag(val) {
      if (!val) {
        this.allSelection = val;
        for (let i = 0; i < this.itemList.length; i++) {
          this.selectionItem[i] = false;
        }
      }
    },
    allSelection(val) {
      if (val) {
        for (let i = 0; i < this.itemList.length; i++) {
          this.selectionItem[i] = true;
        }
      } else {
        for (let i = 0; i < this.itemList.length; i++) {
          this.selectionItem[i] = false;
        }
      }
    },
  },
  methods: {
    onTouchStart() {
      this.longPressFlag = false;
      this.loop = setTimeout(() => {
        this.longPressFlag = true;
      }, 1000);
    },
    onTouchEnd() {
      clearTimeout(this.loop);
    },
    onSubmit() {
      console.log(this.selectionItem);
    },
    onTouchSelect() {
      // if (e) {
      //   // e.stopPropagation();
      // }
    },
  },
};
</script>

<style>

</style>
