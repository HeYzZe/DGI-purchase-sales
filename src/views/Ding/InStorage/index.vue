<template>
  <el-card>
    <el-form ref="itemForm" :rules="rules" :model="itemModel" label-position="top" label-width="100px">
      <el-form-item label="生产厂商：" prop="psId">
        <el-select v-model="itemModel.psId" style="width: 100%;">
          <el-option v-for="(item, index) in psBaseList"
            :key="index"
            :value="item.rowGuid"
            :label="item.psName"
            @click.native="onSelectBase(item)"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="联系人：">
        <el-input v-model="itemModel.contactMan" readonly></el-input>
      </el-form-item>
      <el-form-item label="联系方式：">
        <el-input v-model="itemModel.contactTelPhone" readonly></el-input>
      </el-form-item>
      <el-form-item label="数采仪名称：" prop="dgiName">
        <el-input v-model="itemModel.dgiName"></el-input>
      </el-form-item>
      <el-form-item label="采购合同编号：" prop="purchaseContract">
        <el-input type="number" v-model="itemModel.purchaseContract"></el-input>
      </el-form-item>
      <!-- <router-link :to="{ name: 'InfoList' }"> -->
      <el-button type="primary" round style="width: 100%;" class="mar-t-sm" @click="onSave">保存</el-button>
    </el-form>
  </el-card>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'InStorage',
  data() {
    return {
      itemModel: {
        psId: '',
        dgiName: '',
      },
      rules: {
        psId: [
          { required: true, message: '请选择企业', trigger: 'change' },
        ],
        contactMan: [
          { required: true, message: '请输入联系人', trigger: 'blur' },
        ],
        contactTelPhone: [
          { required: true, message: '请输入联系方式', trigger: 'blur' },
        ],
        dgiName: [
          { required: true, message: '请输入数采仪名称', trigger: 'blur' },
        ],
        purchaseContract: [
          { required: true, message: '请输入采购合同编号', trigger: 'blur' },
        ],
      },
    };
  },
  computed: {
    ...mapState({
      psBaseList: state => state.PsBaseList,
    }),
  },
  created() {
    this.$store.dispatch('GET_PSBASE_LIST');
  },
  methods: {
    onSelectBase(val) {
      this.itemModel.contactMan = val.contactMan;
      this.itemModel.contactTelPhone = val.contactTelPhone;
    },
    onSave() {
      this.$refs.itemForm.validate((valid) => {
        if (!valid) {
          return;
        }
        this.$store.commit('setCommonModel', { ...this.itemModel });
        this.$router.push({ name: 'InfoList' });
      });
    },
  },
};
</script>

<style>

</style>
