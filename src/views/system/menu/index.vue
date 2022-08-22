<template>
  <el-card>
    <el-button icon="el-icon-plus" type="primary" plain size="small" @click="addHandler(0, 1)" @updateList="initData"
      style="margin-bottom: 20px">新增</el-button>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" row-key="id" border>
      <el-table-column prop="title" label="菜单名称"> </el-table-column>
      <el-table-column prop="path" label="菜单地址"> </el-table-column>
      <el-table-column prop="mark" label="权限标识"> </el-table-column>
      <el-table-column prop="icon" label="图标">
        <!-- <template slot-scope="{ row }"> </template> -->
      </el-table-column>
      <el-table-column prop="component" label="组件路径"> </el-table-column>
      <el-table-column prop="type" label="类型">
        <template slot-scope="{ row }">
          <el-tag type="success" v-if="row.type === 1">菜单</el-tag>
          <el-tag type="warning" v-if="row.type === 2">按钮</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="is_show" label="是否显示">
        <template slot-scope="{ row }">
          <el-switch :value="row.is_show === 0 ? false : true"> </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操做 ">
        <template slot-scope="{ row }">
          <el-button size="mini" type="primary" icon="el-icon-edit" circle @click="editHandler(row.id)"></el-button>
          <el-button size="mini" type="warning" icon="el-icon-plus" circle @click="addHandler(row.id, 1)"
            v-if="row.type === 1"></el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="delHandler(row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹框 -->
    <addMenu ref="addMenu" @updateList="initData"> </addMenu>
  </el-card>
</template>
<script>
import { getMenuListApi, delMenuApi, getMenuInfoApi } from "@/api/menu";
import addMenu from "@/views/system/menu/components/add-menu";
export default {
  name: "Menu",
  components: {
    addMenu,
  },
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      const res = await getMenuListApi();
      // console.log(res);
      this.tableData = res;
    },
    addHandler(pid, type) {
      // console.log(pid);
      this.$refs.addMenu.dialogShow = true;
      this.$refs.addMenu.formData.pid = pid;
      this.$refs.addMenu.formData.type = type;
    },
    // 点击编辑
    async editHandler(id) {
      const res = await getMenuInfoApi({ id: id });
      console.log(res);
      this.$refs.addMenu.formData = res;
      this.$refs.addMenu.dialogShow = true;
    },
    async delHandler(id) {
      await this.$confirm("你确定要删除吗？");
      await delMenuApi({ id: id });
      this.$message.success("删除成功！");
      this.$store.dispatch('user/GetUserInfoFn')
      this.initData();
    },
  },
};
</script>
<style lang="less" scoped>
</style>
