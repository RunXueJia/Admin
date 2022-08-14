<template>
  <div>
    <el-dialog title="添加" :visible.sync="showDialog" @close="close">
      <el-row ::gutter="15">
        <el-form
          ref="elForm"
          :model="formData"
          :rules="rules"
          size="medium"
          label-width="100px"
        >
          <el-col :span="12">
            <el-row :gutter="15">
              <el-col :span="24">
                <el-form-item label="管理员账号" prop="login_name">
                  <el-input
                    v-model="formData.login_name"
                    placeholder="请输入管理员账号"
                    clearable
                    :style="{ width: '100%' }"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row :gutter="15">
              <el-col :span="24">
                <el-form-item label="管理员姓名" prop="name">
                  <el-input
                    v-model="formData.name"
                    placeholder="请输入管理员姓名"
                    clearable
                    :style="{ width: '100%' }"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row :gutter="15">
              <el-col :span="24">
                <el-form-item label="管理员邮箱" prop="email">
                  <el-input
                    v-model="formData.email"
                    placeholder="请输入管理员邮箱"
                    clearable
                    :style="{ width: '100%' }"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row :gutter="15">
              <el-col :span="24">
                <el-form-item label="管理员手机" prop="phone">
                  <el-input
                    v-model="formData.phone"
                    placeholder="请输入管理员手机"
                    clearable
                    :style="{ width: '100%' }"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row :gutter="15">
              <el-col :span="24">
                <el-form-item label="管理员密码" prop="password">
                  <el-input
                    v-model="formData.password"
                    placeholder="请输入管理员密码"
                    clearable
                    :style="{ width: '100%' }"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row :gutter="15">
              <el-col :span="24">
                <el-form-item label="账号状态" prop="status">
                  <el-switch
                    v-model="formData.status"
                    :active-value="1"
                    :inactive-value="0"
                    active-text="启用"
                    inactive-text="禁用"
                  ></el-switch>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="24">
            <el-row :gutter="15">
              <el-col :span="24">
                <el-form-item label="角色">
                  <el-checkbox-group v-model="formData.role_id">
                    <el-checkbox
                      v-for="item in checkList"
                      :key="item.id"
                      :label="item.id"
                      >{{ item.name }}</el-checkbox
                    >
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-form>
      </el-row>
      <div slot="footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getRolesAllApi } from "@/api/roles";
import { addUserAdminApi, editUserAdminApi } from "@/api/user-admin";
export default {
  inheritAttrs: false,
  components: {},
  data() {
    return {
      showDialog: false,
      formData: {
        login_name: "",
        name: "",
        email: "",
        phone: "",
        password: "",
        status: 0,
        role_id: [],
        id: "",
      },
      checkList: [],
      rules: {
        login_name: [
          {
            required: true,
            message: "请输入管理员账号",
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: "请输入管理员姓名",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: "请输入管理员邮箱",
            trigger: "blur",
          },
        ],
        phone: [
          {
            required: true,
            message: "请输入管理员手机",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入管理员密码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      const res = await getRolesAllApi();
      this.checkList = res;
    },
    close() {
      this.formData = {
        login_name: "",
        name: "",
        email: "",
        phone: "",
        password: "",
        status: 0,
        role_id: [],
      };
      this.showDialog = false;
    },
    async handleConfirm() {
      try {
        await this.$refs.elForm.validate();
      } catch (error) {
        return console.log(error);
      }
      console.log("ppp");

      if (this.formData.id) {
        await editUserAdminApi(this.formData);
        this.$message.success("修改成功！");
      } else {
        await addUserAdminApi(this.formData);
        this.$message.success("添加成功！");
      }
      this.showDialog = false;
      this.$emit("updateList");
    },
  },
};
</script>
<style></style>
