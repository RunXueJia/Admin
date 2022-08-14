<template>
  <el-dialog
    v-if="showDialog"
    title="添加"
    :visible.sync="showDialog"
    @close="close"
  >
    <el-form :model="formData" ref="form" label-width="100px">
      <el-form-item label="角色名称">
        <el-input v-model="formData.name" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="角色描述">
        <el-input
          v-model="formData.description"
          placeholder="请输入内容"
        ></el-input>
      </el-form-item>
      <el-form-item label="角色权限">
        <el-tree
          v-if="showDialog"
          ref="tree"
          :data="AllRole"
          :default-checked-keys="menuids"
          show-checkbox
          :check-strictly="false"
          node-key="id"
          :props="{ label: 'title' }"
        ></el-tree>
      </el-form-item>
      <el-row type="flex" justify="center">
        <el-button @click="showDialog = false">取消</el-button>
        <el-button type="primary" @click="btnOk">确定</el-button>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
import { getMenuListApi } from "@/api/menu";
import { addRolesApi, editRolesApi } from "@/api/roles";
export default {
  name: "AddRole",
  data() {
    return {
      showDialog: false,
      AllRole: [],
      formData: {
        name: "",
        description: "",
      },
      menuids: [],
    };
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      const data = await getMenuListApi();
      this.AllRole = data;
    },
    async btnOk() {
      const permIds = this.$refs.tree.getCheckedKeys();
      const permIds2 = this.$refs.tree.getHalfCheckedKeys();
      this.menuids = [...permIds, ...permIds2];
      const cloneForm = JSON.parse(JSON.stringify(this.formData));
      cloneForm.menuids = [...permIds, ...permIds2];

      //校验
      if (this.formData.id) {
        // 添加
        await editRolesApi(cloneForm);
        this.$message.success("修改成功！");
      } else {
        // 添加
        await addRolesApi(cloneForm);
        this.$message.success("添加成功！");
      }

      this.showDialog = false;
      this.$emit("updateList");
    },
    close() {
      this.formData = {
        name: "",
        description: "",
        menuids: [],
      };
      this.showDialog = false;
      this.$emit("updateList");
    },
  },
};
</script>

<style></style>
