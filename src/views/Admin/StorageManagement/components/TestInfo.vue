<template>
  <el-table :data="itemList" border stripe>
    <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
    <el-table-column prop="testDate" label="测试日期" show-overflow-tooltip></el-table-column>
    <el-table-column prop="operator" label="测试人" show-overflow-tooltip></el-table-column>
    <el-table-column prop="result" label="测试结果" show-overflow-tooltip>
      <template slot-scope="{ row }">{{ $enum.testResult[row.result] }}</template>
    </el-table-column>
    <el-table-column prop="testExplain" label="测试说明" show-overflow-tooltip></el-table-column>
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
