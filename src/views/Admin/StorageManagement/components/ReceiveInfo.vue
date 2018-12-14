<template>
  <el-table :data="itemList" border stripe>
    <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
    <el-table-column prop="applyDate" label="领用日期" show-overflow-tooltip></el-table-column>
    <el-table-column prop="operator" label="领用人" show-overflow-tooltip></el-table-column>
    <el-table-column prop="applyPurpose" label="领用目的" show-overflow-tooltip>
      <template slot-scope="{ row }">{{ $enum.receivePurpose[row.applyPurpose] }}</template>
    </el-table-column>
    <el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>
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
