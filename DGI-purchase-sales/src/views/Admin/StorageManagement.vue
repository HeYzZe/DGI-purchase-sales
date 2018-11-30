<template>
  <el-row :gutter="10">
    <el-col :span="10">
      <el-card fill no-ops>
        <template slot="header">
          <el-form inline :model="queryForm">
            <el-form-item>
              <el-input
                v-model="queryForm.name"
                placeholder="数采仪名称、主板型号"
                clearable
                style="width:200px">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </el-form-item>
            <!-- <el-form-item label="主板型号：">
              <el-input v-model="queryForm.name" placeholder="关键字：型号" clearable></el-input>
            </el-form-item> -->
            <el-form-item label="生产厂商：">
              <el-select v-model="queryForm.name" placeholder="请选择" clearable>
                <el-option label="江苏远大" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getItemList()">
                <i class="fas fa-search" aria-hidden="true"></i> 查 询
              </el-button>
            </el-form-item>
          </el-form>
        </template>
        <el-table
          class="mar-t-xs"
          :highlight-current-row="true"
          fill
          border
          stripe
          :data="itemList"
          v-loading="loading"
          @row-click="onRowClick">
          <el-table-column align="center" width="50" label="序号" type="index"></el-table-column>
          <el-table-column property="name" label="数采仪名称" show-overflow-tooltip></el-table-column>
          <el-table-column property="specification" label="主板型号" show-overflow-tooltip></el-table-column>
          <el-table-column property="grade" label="生产厂商" show-overflow-tooltip></el-table-column>
          <el-table-column property="sum" label="库存" show-overflow-tooltip></el-table-column>
        </el-table>
        <paging-query :pager="pager" @query="getItemList"/>
      </el-card>
    </el-col>
    <el-col :span="14">
      <el-card fill no-ops no-pager>
        <template slot="header">
          <el-form inline :model="queryForm">
            <el-form-item>
              <el-input
                v-model="queryForm.name"
                placeholder="数采仪编号、生产批号"
                clearable
                style="width:200px">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </el-form-item>
            <!-- <el-form-item label="生产批号：">
              <el-input v-model="queryForm.name" placeholder="关键字：型号" clearable></el-input>
            </el-form-item> -->
            <el-form-item label="入库日期：">
              <el-date-picker
                v-model="queryForm.value"
                type="date"
                placeholder="选择日期"
                style="width: 130px">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-select v-model="queryForm.name" placeholder="请选择" clearable>
                <el-option label="已入库" value="1"></el-option>
                <el-option label="未入库" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getItemList()">
                <i class="fas fa-search" aria-hidden="true"></i> 查 询
              </el-button>
            </el-form-item>
          </el-form>
        </template>
        <el-table
          class="mar-t-xs"
          :highlight-current-row="true"
          fill
          border
          stripe
          :data="itemList"
          v-loading="loading"
          @row-click="onRowClick">
          <el-table-column align="center" width="50" label="序号" type="index"></el-table-column>
          <el-table-column label="操作" width="74" align="center">
            <template slot-scope="scope">
              <el-button type="primary" @click="onCheck(scope)"><i class="fas fa-eye"></i> 查 看</el-button>
            </template>
          </el-table-column>
          <el-table-column property="name" label="数采仪名称" show-overflow-tooltip></el-table-column>
          <el-table-column property="specification" label="主板型号" show-overflow-tooltip></el-table-column>
          <el-table-column property="grade" label="数采仪编号" show-overflow-tooltip></el-table-column>
          <el-table-column property="sum" label="生产批号" show-overflow-tooltip></el-table-column>
          <el-table-column property="sum" label="状态" show-overflow-tooltip></el-table-column>
        </el-table>
        <!-- <paging-query :pager="pager" @query="getItemList"/> -->
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import PagingQuery from '@/components/PagingQuery';

export default {
  name: 'StorageManagement',
  components: { PagingQuery },
  data() {
    return {
      loading: false,
      queryForm: {},
      itemList: [],
      pager: {
        page: 1,
        rows: 15,
        total: 0,
      },
    };
  },
  methods: {
    onAddItem() {},
    onDeleteItem() {},
    getItemList() {},
    onRowClick() {},
  },
};
</script>

<style>

</style>
