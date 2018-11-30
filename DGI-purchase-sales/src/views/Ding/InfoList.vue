<template>
  <el-container>
    <el-header
      height="40px"
      class="mar-t-xs mar-b-xs flexbox"
      style="line-height: 40px;justify-content: space-between;">
      <router-link :to="{ name: 'Information' }">
        <el-button
          size="medium"
          icon="el-icon-plus"
          round
          style="background-color: transparent;">
          新 增
        </el-button>
      </router-link>
      <el-button
        size="medium"
        icon="el-icon-edit"
        round
        @click="longPressFlag = !longPressFlag;"
        style="background-color: transparent;">
        {{ !longPressFlag ? '编 辑 ': '完 成' }}
      </el-button>
    </el-header>
    <hr/>
    <el-main style="padding: 10px;">
      <div
        v-for="(item, i) in itemList"
        :key="i"
        class="mar-b-sm flexbox itembox pad-a-xs">
        <el-checkbox
          v-model="itemSelection[i]"
          @touch.stop.native="onTouchSelect(itemSelection[i], item)"
          v-show="longPressFlag"
          class="mar-r-sm align-center">
        </el-checkbox>
        <div style="flex: 1;">
          <h4 class="flexbox">
            <p class="mar-a-xs">
              <span>数采仪名称：</span>
              <span>数采仪名称</span>
            </p>
            <p class="mar-a-xs">
              <span>数采仪名称：</span>
              <span>数采仪名称</span>
            </p>
          </h4>
          <h4 class="flexbox">
            <p class="mar-a-xs">
              <span>数采仪名称：</span>
              <span>数采仪名称</span>
            </p>
            <p class="mar-a-xs">
              <span>数采仪名称：</span>
              <span>数采仪名称</span>
            </p>
          </h4>
        </div>
      </div>
    </el-main>
    <hr/>
    <el-footer height="40px" class="mar-b-sm" style="line-height: 40px;">
      <el-switch
        v-if="longPressFlag"
        v-model="allSelection"
         active-text="全 选"
        active-color="#409EFF">
      </el-switch>
      <el-button
        v-if="!longPressFlag"
        round
        type="primary"
        size="medium"
        @click="onSubmit"
        style="width: 100%;">提 交</el-button>
      <div v-else class="float-r">
        <el-button type="danger" size="medium">删 除</el-button>
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
      itemSelection: [], // 选择框的数组
      allSelection: false, // 是否为全选
      selection: [], // 选中的数组
    };
  },
  watch: {
    longPressFlag(val) {
      if (!val) {
        this.allSelection = val;
        this.selection = [];
        for (let i = 0; i < this.itemList.length; i++) {
          this.itemSelection[i] = false;
        }
      }
    },
    allSelection(val) {
      if (val) {
        for (let i = 0; i < this.itemList.length; i++) {
          this.itemSelection[i] = true;
        }
      } else {
        for (let i = 0; i < this.itemList.length; i++) {
          this.itemSelection[i] = false;
        }
      }
    },
  },
  created() {
    this.itemList[1] = {
      a: 1,
      b: 2,
      c: 3,
    };
  },
  methods: {
    // onTouchStart() {
    //   this.longPressFlag = false;
    //   this.loop = setTimeout(() => {
    //     this.longPressFlag = true;
    //   }, 700);
    // },
    // onTouchEnd() {
    //   clearTimeout(this.loop);
    // },
    onSubmit() {
    },
    onTouchSelect(flag, item) {
      if (!flag) {
        this.selection.push(item);
      } else {
        this.selection.splice(this.selection.indexOf(item), 1);
      }
    },
  },
};
</script>

<style>
  .flexbox {
    display: flex;
    flex-direction: row;
    /* align-items: center; */
  }
  .itembox {
    background-color: #fcfcfc;
  }
  .align-center {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
</style>
