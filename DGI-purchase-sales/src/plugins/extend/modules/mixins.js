// 列表查询
export const queryList = {
  data() {
    return {
      // API 接口地址（必填）
      url: '',
      // 数据列表加载状态
      loading: false,
      // 查询表单对象
      queryForm: {},
      // 数据列表
      itemList: [],
      // 已选择的数据 id 数组
      selectedIds: [],
      // 分页
      pager: { page: 1, rows: 5, total: 0 },
    };
  },
  created() {
    if (this.url) {
      this.getItemList();
    }
  },
  methods: {
    changeSelected(option) {
      this.selectedIds = option.map(val => val.id);
    },
    onQueryList() {
      this.pager.page = 1;
      this.getItemList();
    },
    getItemList() {
      this.loading = true;
      const { page, rows } = this.pager;
      this.$http.get(this.url, {
        params: { page, rows, ...this.queryForm },
      }).then((response) => {
        if (response.status === 200) {
          this.itemList = response.data.rows;
          this.pager.total = response.data.total;
        } else {
          this.$message.warning({
            message: response.body.message,
            duration: 1500,
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

// 删除数据
export const deleteItem = {
  methods: {
    // 删除记录
    onDeleteItem() {
      if (this.selectedIds.length === 0) {
        this.$message('请选择需要删除的数据');
        return;
      }
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => (
        this.$http.delete(`${this.url}/0`, { data: this.selectedIds })
      )).then((response) => {
        if (response.status === 200) {
          this.$message.success({
            message: '删除成功',
            duration: 1500,
            showClose: true,
          });
          this.getItemList();
        } else {
          this.$message.warning({
            message: response.data.message,
            duration: 1500,
          });
        }
      }, ({ response }) => {
        this.$hp.resp(response);
      });
    },
  },
};

export default {};
