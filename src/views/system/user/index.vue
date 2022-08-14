<template>
  <el-card>
    <el-form label-width="200px;" :inline="true">
      <el-form-item label="账号">
        <el-input
          size="small"
          placeholder="请输入账号"
          v-model="queryData.login_name"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机">
        <el-input
          size="small"
          placeholder="请输入手机"
          v-model="queryData.phone"
        ></el-input>
      </el-form-item>
      <el-form-item label="账号状态">
        <el-select size="small" v-model="queryData.status" placeholder="请选择">
          <el-option label="全部" value=""> </el-option>
          <el-option label="启用" :value="1"> </el-option>
          <el-option label="冻结" :value="0"> </el-option>
        </el-select>
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
    <el-row>
      <el-button
        type="primary"
        style="margin-bottom: 10px"
        icon="el-icon-plus"
        size="small"
        @click="$refs.addAdmin.showDialog = true"
        >新增</el-button
      >
    </el-row>

    <!-- 列表 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" label="#"> </el-table-column>
      <el-table-column prop="login_name" label="账号"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="email" label="邮箱"> </el-table-column>
      <el-table-column prop="phone" label="手机号"> </el-table-column>
      <el-table-column prop="rolename" label="角色">
        <template slot-scope="{ row }">
          <el-tag type="success">{{ row.rolename[0] }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="create_date" label="创建时间"> </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="{ row }">
          <el-switch
            v-model="row.status"
            :active-value="1"
            :inactive-value="0"
            active-text="启用"
            inactive-text="冻结"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{ row }">
          <el-button
            size="small"
            type="primary"
            icon="el-icon-edit"
            circle
            @click="editHandler(row.id)"
          ></el-button>
          <el-button
            size="small"
            type="danger"
            icon="el-icon-delete"
            circle
            @click="delHandler(row.id)"
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
    <!-- 添加弹框 -->
    <addAdmin ref="addAdmin" @updateList="initData" />
  </el-card>
</template>
<script>
import addAdmin from "@/views/system/user/components/add-admin";
import {
  getUserAdminListApi,
  getUserAdminInfoApi,
  delUserAdminInfoApi,
} from "@/api/user-admin";
export default {
  name: "user",
  components: { addAdmin },
  data() {
    return {
      queryData: {
        login_name: "",
        status: "",
        phone: "",
        page: 1,
        limit: 10,
      },
      options: [],
      tableData: [],
      count: 0,
    };
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      const { count, data } = await getUserAdminListApi(this.queryData);
      this.tableData = data;
      this.count = count;
    },
    handleCurrentChange(val) {
      this.queryData.page = val;
      this.initData();
    },
    handleSizeChange(val) {
      this.queryData.limit = val;
      this.initData();
    },
    // 重置
    refreseh() {
      this.queryData = {
        login_name: "",
        status: "",
        phone: "",
        page: 1,
        limit: 10,
      };
      this.initData();
    },
    async editHandler(id) {
      const res = await getUserAdminInfoApi({ id: id });
      console.log(res);
      this.$refs.addAdmin.formData = res;
      this.$refs.addAdmin.showDialog = true;
      this.$refs.addAdmin.formData.id = id;
    },
    // 删除
    async delHandler(id) {
      await this.$confirm("你确定要删除吗？");
      await delUserAdminInfoApi({ id: id });
      this.$message.success("删除成功！");
      this.initData();
    },
  },
};
</script>
<style lang="less" scoped></style>
