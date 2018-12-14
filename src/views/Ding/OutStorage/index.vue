<template>
  <el-card>
    <el-form ref="itemForm" :rules="rules" :model="itemModel" label-position="top" label-width="100px">
      <el-form-item label="购买商：" prop="psId">
        <el-select v-model="itemModel.psId" style="width: 100%;">
          <el-option v-for="(item, index) in customerList"
            :key="index"
            :value="item.rowGuid"
            :label="item.psName"
            @click.native="onSelectBase(item)"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="购买商联系人：">
        <el-input v-model="itemModel.contactMan" readonly></el-input>
      </el-form-item>
      <el-form-item label="联系方式：">
        <el-input v-model="itemModel.contactTelPhone" readonly></el-input>
      </el-form-item>
      <el-form-item label="销售合同编号：" prop="saleContract">
        <el-input type="number" v-model="itemModel.saleContract"></el-input>
      </el-form-item>
      <el-form-item label="合同总需求量：" prop="totalAmount">
        <el-input type="number" v-model="itemModel.totalAmount"></el-input>
      </el-form-item>
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
        saleContract: '',
      },
      rules: {
        psId: [
          { required: true, message: '请选择购买商', trigger: 'change' },
        ],
        contactMan: [
          { required: true, message: '请输入联系人', trigger: 'blur' },
        ],
        contactTelPhone: [
          { required: true, message: '请输入联系方式', trigger: 'blur' },
        ],
        saleContract: [
          { required: true, message: '请输入销售合同编号', trigger: 'blur' },
        ],
        totalAmount: [
          { required: true, message: '请输入购买数量', trigger: 'blur' },
        ],
      },
    };
  },
  computed: {
    ...mapState({
      customerList: state => state.customerList,
    }),
  },
  created() {
    this.$store.dispatch('GET_CUSTOMER_LIST');
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
        this.$store.commit('setCommonOutStorage', { ...this.itemModel });
        this.$router.push({ name: 'OutStorageList' });
      });
    },
  },
};
</script>

<style>

</style>
