<template>
  <el-card fill>
    <!-- 查询表单 -->
    <div slot="header">
      <el-form inline :model="queryForm">
        <el-form-item label="企业名称：">
          <el-input v-model="queryForm.psName" placeholder="请输入企业名称" clearable style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="企业类别：">
          <el-select v-model="queryForm.psType" clearable>
            <el-option label="生产厂商" value="1"></el-option>
            <el-option label="客户" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getItemList">
            <i class="fas fa-search" aria-hidden="true"></i> 查 询
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-button type="primary" @click="onClickAdd" class="mar-t-xs">
      <i class="fas fa-plus" aria-hidden="true"></i> 新 增
    </el-button>
    <el-button :disabled="selectIds.length === 0" type="danger" @click="onDeleteItem" class="mar-t-xs">
      <i class="fas fa-trash-alt" aria-hidden="true"></i> 删 除
    </el-button>
    <el-table
      fill
      class="mar-t-xs"
      v-loading="loading"
      border
      stripe
      :data="itemList"
      @selection-change="onSelectedItem">
      <el-table-column align="center" type="selection" width="50"></el-table-column>
      <el-table-column align="center" label="序号" type="index" width="50"></el-table-column>
      <el-table-column align="center" label="操作" width="100">
        <template slot-scope="{ row }">
          <el-button type="primary" size="small" title="编辑" @click="onClickEdit(row.rowGuid)">
            <i class="fas fa-pencil-alt" aria-hidden="true"></i> 编 辑
          </el-button>
        </template>
      </el-table-column>
      <el-table-column property="psName" label="企业名称" show-overflow-tooltip></el-table-column>
      <el-table-column property="contactMan" label="联系人"></el-table-column>
      <el-table-column property="contactTelPhone" label="联系方式"></el-table-column>
      <el-table-column property="psRegion" label="所在地区"></el-table-column>
      <el-table-column property="psAddress" label="详细地址"></el-table-column>
    </el-table>
  <!-- 分页 -->
    <paging-query :pager="pager" @query="getItemList"/>
  <!-- 公共弹框 -->
    <management-detail ref="dialog" :dialogData="dialogData" @getData="getItemList"/>
  </el-card>
</template>

<script>
import ManagementDetail from './components/ManagementDetail';
import PagingQuery from '@/components/PagingQuery';

export default {
  name: 'BusinessManagement',
  components: { ManagementDetail, PagingQuery },
  data() {
    return {
      loading: false,  // 表格数据加载状态
      queryForm: {     // 查询表单
        psName: '',
        psType: '',
      },
      selectIds: [],  // 表格选中的id集合
      itemList: [],   // 数据列表
      pager: {        //  分页
        page: 1,
        rows: 15,
        total: 0,
      },
      dialogData: {   // 传给子组件的数据
        rowGuid: '',
        title: '',
      },
    };
  },
  created() {
    this.$store.dispatch('GET_TOKEN', {
      userId: '',
      psId: 'psId',
      depIds: [],
    }).then(() => {
      // console.log(response);
      this.$nextTick(() => {
        this.getItemList();
      });
    }, ({ response }) => {
      this.$hp.resp(response);
    });
  },
  methods: {
    // 新增企业
    onClickAdd() {
      this.dialogData.title = '新增企业';
      this.$refs.dialog.detailVisible = true;
    },
    // 编辑企业
    onClickEdit(rowGuid) {
      this.dialogData.rowGuid = rowGuid;
      this.dialogData.title = '编辑企业';
      this.$http.get(`dgi/psBaseInfo/${rowGuid}`).then((response) => {
        if (response.status === 200) {
          this.$refs.dialog.entiseInfation = response.data;
        } else {
          this.$message({
            showClose: true,
            message: response.data.msg,
            type: 'error',
          });
        }
      }, (({ response }) => {
        this.$hp.resp(response);
      })).finally(() => {
        this.$refs.dialog.detailVisible = true;
      });
    },
    // 选择列
    onSelectedItem(row) {
      this.selectIds = row.map(e => e.rowGuid);
    },
    // 删除企业
    onDeleteItem() {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$http.delete('dgi/psBaseInfo', { data: this.selectIds }).then((response) => {
          if (response.status === 200) {
            this.$message({
              showClose: true,
              message: '恭喜你，操作成功',
              type: 'success',
            });
            this.getItemList();
          } else {
            this.$message({
              showClose: true,
              message: response.data.msg,
              type: 'error',
            });
          }
        });
      });
    },
    // 获取数据列表
    getItemList() {
      this.loading = true;
      const { page, rows } = this.pager;
      this.$http.get('dgi/psBaseInfo', {
        params: { ...this.queryForm, page, rows },
      }).then((response) => {
        if (response.status === 200) {
          this.itemList = response.data.rows;
          this.pager.total = response.data.total;
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
  },
};
</script>

<style>

</style>
