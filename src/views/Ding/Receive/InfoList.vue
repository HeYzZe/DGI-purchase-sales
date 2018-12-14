<template>
  <el-container>
    <el-header
      height="40px"
      class="mar-t-xs mar-b-xs flexbox"
      style="line-height: 40px;justify-content: space-between;">
      <router-link :to="{ name: 'ReceiveInfo' }">
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
        @click="isEdit = !isEdit;allSelection = false;"
        style="background-color: transparent;">
        {{ !isEdit ? '编 辑 ': '完 成' }}
      </el-button>
    </el-header>
    <hr/>
    <el-main style="padding: 10px;">
      <div
        v-for="(item, i) in itemList"
        :key="i"
        class="mar-b-sm flexbox itembox pad-a-xs">
        <el-checkbox
          v-model="item.isSelected"
          v-show="isEdit"
          class="mar-r-sm align-center">
        </el-checkbox>
        <div style="flex: 1;" @click="onClickDgiItem(item, i)">
          <h4 class="flexbox">
            <p class="mar-a-xs">
              <span>数采仪名称：</span>
              <span>{{item.dgiName}}</span>
            </p>
            <p class="mar-a-xs">
              <span>主板型号：</span>
              <span>{{item.mainBoardModel}}</span>
            </p>
          </h4>
          <h4 class="flexbox">
            <p class="mar-a-xs">
              <span>生产批号：</span>
              <span>{{item.productionBatchNumber}}</span>
            </p>
            <p class="mar-a-xs">
              <span>数采仪编号：</span>
              <span>{{item.dgiCode}}</span>
            </p>
          </h4>
        </div>
      </div>
    </el-main>
    <hr/>
    <el-footer height="40px" class="mar-b-sm" style="line-height: 40px;">
      <el-switch
        v-if="isEdit"
        v-model="allSelection"
         active-text="全 选"
        active-color="#409EFF">
      </el-switch>
      <el-button
        v-if="!isEdit"
        round
        type="primary"
        size="medium"
        @click="onSubmit"
        style="width: 100%;">提 交</el-button>
      <div v-else class="float-r">
        <el-button type="danger" size="medium" @click="onDelete">删 除</el-button>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'InfoList',
  data() {
    return {
      isEdit: false, // 是否为编辑状态
    };
  },
  computed: {
    ...mapState({
      itemList: state => state.Receive.receiveList,
    }),
    allSelection: {
      get() {
        let flag = true;
        if (this.itemList.length === 0) {
          flag = false;
        } else {
          this.itemList.forEach((element) => {
            if (!element.isSelected) {
              flag = false;
            }
          });
        }
        return flag;
      },
      set(newValue) {
        if (newValue) {
          this.itemList.forEach((element) => {
            this.$set(element, 'isSelected', true);
          });
        } else {
          this.itemList.forEach((element) => {
            this.$set(element, 'isSelected', false);
          });
        }
      },
    },
  },
  methods: {
    onClickDgiItem(item, i) {
      if (this.isEdit) {
        this.$set(item, 'isSelected', !item.isSelected);
      } else {
        // console.log(item); // 非编辑状态，点击跳转详细信息
        this.$router.push({
          name: 'ReceiveInfo',
          params: {
            itemModel: item,
            index: i,
          },
        });
      }
    },
    onSubmit() {
      this.$http.post('dgi/dgiApply', this.itemList).then((response) => {
        if (response.status === 200) {
          this.$message({
            showClose: true,
            message: '操作成功',
            type: 'success',
          });
        } else {
          this.$message({
            showClose: true,
            message: response.data.message,
            type: 'error',
          });
        }
        this.$store.commit('setDgiInfo', []);
        this.$router.push({ name: 'DingHome' });
      }, ({ response }) => {
        this.$store.commit('setDgiInfo', []);
        this.$hp.resp(response);
      });
    },
    onDelete() {
      // this.$store.commit('setDgiInfo', this.itemList.filter(n => !n.isSelected));
      // this.isEdit = false;
      this.$dd.confirm({
        title: '提示',
        message: '是否确认删除？',
      }, (index) => {
        if (index === 1) {
          this.$store.commit('setDgiInfo', { ...this.itemList.filter(n => !n.isSelected) });
          this.isEdit = false;
        }
      });
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
