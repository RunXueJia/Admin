<template>
  <el-card>
    <!-- 筛选表单区域 -->
    <el-form label-width="200px;" :inline="true">
      <el-form-item label="角色名">
        <el-input
          size="small"
          v-model="queryData.name"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          size="small"
          type="primary"
          icon="el-icon-search"
          @click="initData"
          >搜索</el-button
        >
        <el-button size="small" icon="el-icon-refreseh" @click="refreseh"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
    <el-button
      style="margin-bottom: 10px"
      icon="el-icon-plus"
      type="primary"
      plain
      size="small"
      @click="addHandler"
      >新增</el-button
    >
    <!-- 表格 -->
    <el-table
      :data="tableData"
      style="width: 100%"
      row-key="id"
      border
      default-expand-all
    >
      <el-table-column type="index" label="#"> </el-table-column>
      <el-table-column prop="id" label="角色ID"> </el-table-column>
      <el-table-column prop="name" label="角色名称"> </el-table-column>
      <el-table-column prop="description" label="角色描述"> </el-table-column>
      <el-table-column prop="create_date" label="创建时间"> </el-table-column>
      <el-table-column prop="address" label="操做 ">
        <template slot-scope="{ row }">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="editHandler(row.id)"
            circle
          ></el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="delHandler(row.id)"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryData.page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="queryData.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="count"
    >
    </el-pagination>
    <!-- 弹框 -->
    <addRole ref="addRole" @updateList="initData" />
  </el-card>
</template>
<script>
import { getRolesListApi, delRolesApi, getRolesInfoApi } from "@/api/roles";
import addRole from "@/views/system/role/components/add-role";
import { tranListToTreeData } from "@/main";
export default {
  name: "role",
  components: {
    addRole,
  },
  data() {
    return {
      tableData: [],
      queryData: {
        name: "",
        page: 1,
        limit: 10,
      },
      count: 0,
    };
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      const { data, count } = await getRolesListApi(this.queryData);
      this.tableData = data;
      this.count = count;
    },
    handleSizeChange(val) {
      console.log(1, val);
      this.queryData.limit = val;
      this.initData();
    },
    handleCurrentChange(val) {
      console.log(2, val);
      this.queryData.page = val;
      this.initData();
    },
    // 重置
    refreseh() {
      this.queryData = {
        name: "",
        page: 1,
        limit: 10,
      };
      this.initData();
    },
    // 新增
    addHandler() {
      this.$refs.addRole.showDialog = true;
    },
    async delHandler(id) {
      await this.$confirm("你确定要删除吗？");
      await delRolesApi({ id: id });
      this.$message.success("删除成功！");
      this.initData();
    },
    // 编辑
    async editHandler(id) {
      const res = await getRolesInfoApi({ id: id });
      // console.log("res.authList", res.authList);
      let arr = [];
      res.authList.forEach((item) => {
        console.log(item);
        //  if (item.type ===1 && !item.children)  现在有的type 不等于1  只能用其他的
        if (item.type !== 2 && !item.children) {
          arr.push(item.id);
        }
      });
      this.treeToList(res.authList).forEach((item) => {
        // console.log(item);
        if (item.type === 2) {
          arr.push(item.id);
        }
      });
      console.log("arr", arr);
      // console.log(this.treeToList(res.authList));

      this.$refs.addRole.formData = res;
      this.$refs.addRole.menuids = arr;
      // 这里要遍历获取出id
      this.$refs.addRole.showDialog = true;
    },
    //转结构（list就是你要转的树状数据）
    treeToList(list) {
      let res = [];

      for (const item of list) {
        const { children, ...i } = item;
        if (children && children.length) {
          res = res.concat(this.treeToList(children));
        }
        res.push(i);
      }

      return res;
    },
  },
};
</script>
<style lang="less" scoped></style>
