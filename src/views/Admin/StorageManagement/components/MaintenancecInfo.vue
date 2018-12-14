<template>
    <el-table :data="itemList" border stripe>
      <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
      <el-table-column prop="repairDate" label="维修日期" show-overflow-tooltip></el-table-column>
      <el-table-column prop="operator" label="维修人" show-overflow-tooltip></el-table-column>
      <el-table-column prop="destroyCause" label="维修原因" show-overflow-tooltip></el-table-column>
      <el-table-column prop="result" label="维修结果" show-overflow-tooltip>
        <template slot-scope="{ row }">{{ $enum.destroyCause[row.result] }}</template>
      </el-table-column>
      <el-table-column prop="repairExplain" label="维修说明" show-overflow-tooltip></el-table-column>
    </el-table>
</template>

<script>
export default {
  name: 'DialogDetail',
  data() {
    return {
      itemList: [],
    };
  },
};
</script>

<style>

</style>
