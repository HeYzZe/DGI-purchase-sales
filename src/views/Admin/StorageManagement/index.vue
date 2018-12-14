<template>
  <el-row :gutter="10">
    <el-col :span="10">
      <el-card fill no-ops>
        <template slot="header">
          <el-form inline :model="queryForm">
            <el-form-item>
              <el-input
                v-model="queryForm.key"
                placeholder="数采仪名称、主板型号"
                clearable
                style="width:200px">
                <i slot="prefix" class="fas fa-search"></i>
              </el-input>
            </el-form-item>
            <el-form-item label="生产厂商：">
              <el-select
                v-model="queryForm.psName"
                @focus="onChangePsName"
                placeholder="请选择"
                clearable
                style="width:160px;">
                <el-option
                  v-for="(value, index) in psNames"
                  :key="index"
                  :label="value"
                  :value="value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getItemList">
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
          <el-table-column property="dgiName" label="数采仪名称" show-overflow-tooltip></el-table-column>
          <el-table-column property="mainBoardModel" label="主板型号" show-overflow-tooltip></el-table-column>
          <el-table-column property="psName" label="生产厂商" show-overflow-tooltip></el-table-column>
          <el-table-column property="inventory" label="库存" show-overflow-tooltip></el-table-column>
        </el-table>
        <paging-query :pager="pager" @query="getItemList"/>
      </el-card>
    </el-col>
    <el-col :span="14">
      <el-card fill no-ops>
        <template slot="header">
          <el-form inline :model="queryModel">
            <el-form-item>
              <el-input
                v-model="queryModel.key"
                placeholder="数采仪编号、生产批号"
                clearable
                style="width:200px">
                <i slot="prefix" class="fas fa-search"></i>
              </el-input>
            </el-form-item>
            <el-form-item label="入库日期：">
              <el-date-picker
                v-model="storagedDate"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd HH:mm"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                style="width:280px">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-select v-model="queryModel.status" placeholder="请选择状态" clearable>
                <el-option
                  v-for="(item, key) in status"
                  :key="key"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getDataList" :disabled="disabled">
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
          :data="dataList"
          v-loading="waiting">
          <el-table-column align="center" width="50" label="序号" type="index"></el-table-column>
          <el-table-column label="操作" width="74" align="center">
            <template slot-scope="{ row }">
              <el-button type="primary" @click="onCheck(row.rowGuid)"><i class="fas fa-eye"></i> 查 看</el-button>
            </template>
          </el-table-column>
          <el-table-column property="dgiName" label="数采仪名称" show-overflow-tooltip></el-table-column>
          <el-table-column property="mainBoardModel" label="主板型号" show-overflow-tooltip></el-table-column>
          <el-table-column property="dgiCode" label="数采仪编号" show-overflow-tooltip></el-table-column>
          <el-table-column property="productionBatchNumber" label="生产批号" show-overflow-tooltip></el-table-column>
          <el-table-column property="status" label="状态" show-overflow-tooltip>
            <template slot-scope="{ row }">{{$enum.status[row.status]}}</template>
          </el-table-column>
        </el-table>
          <el-dialog
            title="数采仪详单"
            :visible.sync="detailVisible"
            :close-on-click-modal="false"
            @close="closeDialog">
            <el-tabs @tab-click="onToggleTab" v-model="activeTab">
              <el-tab-pane label="基本信息" name="basicInfo">
                <basic-info ref="basicInfo"></basic-info>
              </el-tab-pane>
              <el-tab-pane label="领用信息" name="receiveInfo">
                <receive-info ref="receiveInfo"></receive-info>
              </el-tab-pane>
              <el-tab-pane label="测试信息" name="testInfo">
                <test-info ref="testInfo"></test-info>
              </el-tab-pane>
              <el-tab-pane label="出库信息" name="outStorageInfo">
                <out-storage-info ref="outStorageInfo"></out-storage-info>
              </el-tab-pane>
              <el-tab-pane label=" 维修信息" name="maintenancecInfo">
                <maintenancec-info ref="maintenancecInfo"></maintenancec-info>
              </el-tab-pane>
            </el-tabs>
          </el-dialog>
        <paging-query :pager="pagers" @query="getDataList"/>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import PagingQuery from '@/components/PagingQuery';
import BasicInfo from './components/BasicInfo';
import MaintenancecInfo from './components/MaintenancecInfo';
import OutStorageInfo from './components/OutStorageInfo';
import TestInfo from './components/TestInfo';
import ReceiveInfo from './components/ReceiveInfo';

export default {
  name: 'StorageManagement',
  components: {
    PagingQuery,
    BasicInfo,
    MaintenancecInfo,
    OutStorageInfo,
    TestInfo,
    ReceiveInfo,
  },
  data() {
    return {
      disabled: true,
      loading: false,
      waiting: false,
      detailVisible: false,
      activeTab: 'basicInfo',
      queryForm: {
        key: '',
        psName: '',
      },
      rowGuid: '',
      psNames: [],
      queryModel: {
        key: '',
        fromDate: '',
        toDate: '',
        status: '',
        mainBoardModel: '',
        dgiName: '',
        psId: '',
      },
      itemList: [],
      dataList: [],
      pager: {
        page: 1,
        rows: 15,
        total: 0,
      },
      pagers: {     // 分页
        page: 1,
        rows: 15,
        total: 0,
      },
      status: [    // 状态
        { label: '已入库', value: 1 },
        { label: '测试中', value: 2 },
        { label: '测试不通过', value: 3 },
        { label: '测试通过', value: 4 },
        { label: '维修中', value: 5 },
        { label: '维修完成', value: 6 },
        { label: '已出库', value: 7 },
        { label: '已报废', value: 8 },
      ],
    };
  },
  computed: {
    storagedDate: {
      get() {
        return (!this.queryModel.fromDate && !this.queryModel.toDate)
          ? ''
          : [this.queryModel.fromDate, this.queryModel.toDate];
      },
      set(val) {
        [this.queryModel.fromDate, this.queryModel.toDate] = val || ['', ''];
      },
    },
  },
  created() {
    this.getItemList();
  },
  methods: {
    getItemList() {
      this.loading = true;
      const { page, rows } = this.pager;
      this.$http.get('dgi/dgiInfo', {
        params: { page, rows, ...this.queryForm },
      }).then((response) => {
        if (response.status === 200) {
          this.itemList = response.data.rows;
          this.pager.total = response.data.total;
        }  else {
          this.$message({
            showClose: true,
            message: response.data.msg,
            type: 'error',
          });
        }
      }, ({ response }) => {
        this.$hp.resp(response);
      }).finally(() => {
        this.loading = false;
      });
    },
    getDataList() {
      this.disabled = false;
      this.waiting = true;
      const { page, rows } = this.pagers;
      this.$http.get('dgi/dgiInStorage', {
        params: {
          page, rows, ...this.queryModel,
        },
      }).then((response) => {
        if (response.status === 200) {
          this.dataList = response.data.rows;
          this.pagers.total = response.data.total;
        } else {
          this.$message({
            showClose: true,
            message: response.data.msg,
            type: 'error',
          });
        }
      }, ({ response }) => {
        this.$hp.resp(response);
      }).finally(() => {
        this.waiting = false;
      });
    },
    onToggleTab(tab) {
      if (tab.name === 'receiveInfo') {
        this.getReceiveInfo();
      } else if (tab.name === 'basicInfo') {
        this.getBasicInfo();
      } else if (tab.name === 'testInfo') {
        this.getTestInfo();
      } else if (tab.name === 'maintenancecInfo') {
        this.getMaintenancecInfo();
      } else {
        this.getOutStorageInfo();
      }
    },
    onCheck(rowGuid) {
      this.rowGuid = rowGuid;
      this.getBasicInfo();
      this.detailVisible = true;
    },
    onRowClick(row) {
      this.queryModel = this.getEmptyForm();
      this.queryModel.mainBoardModel = row.mainBoardModel;
      this.queryModel.dgiName = row.dgiName;
      this.queryModel.psId = row.psId;
      this.getDataList();
    },
    // 获取生产厂商
    onChangePsName() {
      this.$http.get('dgi/dgiInfo/name').then((response) => {
        if (response.status === 200) {
          this.psNames = response.data;
        } else {
          this.$message({
            showClose: true,
            message: response.data.msg,
            type: 'error',
          });
        }
      }, ({ response }) => {
        this.$hp.resp(response);
      }).finally(() => {
        this.loading = false;
      });
    },
    // 获取基本信息
    getBasicInfo() {
      this.$http.get(`dgi/dgiInStorage/${this.rowGuid}`).then((response) => {
        if (response.status === 200) {
          this.$refs.basicInfo.formModel = response.data || {};
        } else {
          this.$message({
            showClose: true,
            message: response.data.msg,
            type: 'error',
          });
        }
      }, ({ response }) => {
        this.$hp.resp(response);
      });
    },
    // 获取出库信息
    getOutStorageInfo() {
      this.$http.get(`dgi/dgiSaleDetail/${this.rowGuid}`).then((response) => {
        if (response.status === 200) {
          this.$refs.outStorageInfo.formModel = response.data || {};
        } else {
          this.$message({
            showClose: true,
            message: response.data.msg,
            type: 'error',
          });
        }
      }, ({ response }) => {
        this.$hp.resp(response);
      });
    },
    // 获取维修信息
    getMaintenancecInfo() {
      this.$http.get(`dgi/dgiRepair/${this.rowGuid}`).then((response) => {
        if (response.status === 200) {
          this.$refs.maintenancecInfo.itemList = response.data || [];
        } else {
          this.$message({
            showClose: true,
            message: response.data.msg,
            type: 'error',
          });
        }
      }, ({ response }) => {
        this.$hp.resp(response);
      });
    },
    // 获取测试信息
    getTestInfo() {
      this.$http.get(`dgi/dgiTest/${this.rowGuid}`).then((response) => {
        if (response.status === 200) {
          this.$refs.testInfo.itemList = response.data || [];
        } else {
          this.$message({
            showClose: true,
            message: response.data.msg,
            type: 'error',
          });
        }
      }, ({ response }) => {
        this.$hp.resp(response);
      });
    },
    // 获取领用信息
    getReceiveInfo() {
      this.$http.get(`dgi/dgiApply/${this.rowGuid}`).then((response) => {
        if (response.status === 200) {
          this.$refs.receiveInfo.itemList = response.data || [];
        } else {
          this.$message({
            showClose: true,
            message: response.data.msg,
            type: 'error',
          });
        }
      }, ({ response }) => {
        this.$hp.resp(response);
      });
    },
    // 关闭dialog
    closeDialog() {
      this.activeTab = 'basicInfo';
    },
    getEmptyForm() {
      return {
        key: '',
        fromDate: '',
        toDate: '',
        status: '',
        mainBoardModel: '',
        dgiName: '',
        psId: '',
      };
    },
  },
};
</script>

<style>

</style>
