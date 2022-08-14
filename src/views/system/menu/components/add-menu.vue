<template>
  <div>
    <el-dialog
      :visible.sync="dialogShow"
      title="添加"
      @close="close"
      :destroy-on-close="true"
    >
      <el-radio-group
        v-if="formData.pid !== 0"
        v-model="radio1"
        @change="changeHandler"
      >
        <el-radio-button :label="0">菜单</el-radio-button>
        <el-radio-button :label="1">按钮</el-radio-button>
      </el-radio-group>
      <el-row v-if="radio1 === 0" :gutter="15" style="margin-top: 20px">
        <el-form
          ref="elForm"
          :model="formData"
          :rules="rules"
          size="medium"
          label-width="100px"
        >
          <el-col :span="11">
            <el-row>
              <el-col :span="24">
                <el-form-item label="菜单名称" prop="title">
                  <el-input
                    v-model="formData.title"
                    placeholder="请输入菜单名称"
                    clearable
                    :style="{ width: '100%' }"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="11">
            <el-row>
              <el-col :span="24">
                <el-form-item label="菜单地址" prop="path">
                  <el-input
                    v-model="formData.path"
                    placeholder="请输入菜单地址"
                    clearable
                    :style="{ width: '100%' }"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="11">
            <el-row>
              <el-col :span="24">
                <el-form-item label="组件地址" prop="component">
                  <el-input
                    v-model="formData.component"
                    placeholder="请输入组件地址"
                    clearable
                    :style="{ width: '100%' }"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="11">
            <el-row>
              <el-col :span="24">
                <el-form-item label="权限标识" prop="mark">
                  <el-input
                    v-model="formData.mark"
                    placeholder="请输入权限标识"
                    clearable
                    :style="{ width: '100%' }"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="11">
            <el-row>
              <el-col :span="24">
                <el-form-item label="菜单图示" prop="icon">
                  <el-select
                    v-model="formData.icon"
                    placeholder="请选择菜单图示"
                    clearable
                    :style="{ width: '100%' }"
                  >
                    <el-option
                      v-for="(item, index) in iconOptions"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                      :disabled="item.disabled"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="11">
            <el-row>
              <el-col :span="24">
                <el-form-item label="重定向" prop="redirect">
                  <el-input
                    v-model="formData.redirect"
                    placeholder="请输入重定向"
                    clearable
                    :style="{ width: '100%' }"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="24">
                <el-form-item label="是否外链" prop="is_link">
                  <el-radio-group v-model="formData.is_link" size="medium">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="11">
            <el-row>
              <el-col :span="24">
                <el-form-item label="排序" prop="sort">
                  <el-input-number
                    v-model="formData.sort"
                    placeholder="排序"
                  ></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="24">
                <el-form-item label="是否显示" prop="is_show">
                  <el-radio-group v-model="formData.is_show" size="medium">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="11">
            <el-row>
              <el-col :span="24">
                <el-form-item label="是否缓存" prop="is_cache">
                  <el-radio-group v-model="formData.is_cache" size="medium">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-form>
      </el-row>
      <!-- 按钮内容 -->
      <el-form v-if="radio1 === 1" :model="formData" label-width="100px">
        <el-form-item label="按钮名称">
          <el-input
            v-model="formData.title"
            placeholder="请输入按钮的名称"
            style="width: 200px"
          ></el-input>
        </el-form-item>
        <el-form-item label="权限标识">
          <el-input
            v-model="formData.mark"
            placeholder="格式：controller@action "
            style="width: 200px"
          ></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input-number
            v-model="formData.sort"
            placeholder="排序"
            style="width: 200px"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { addMenuApi, editMenuApi } from "@/api/menu";
export default {
  name: "AddMenu",
  inheritAttrs: false,
  components: {},
  props: [],
  data() {
    return {
      radio1: 0,
      iconOptions: [],
      dialogShow: false,
      formData: {
        title: "",
        path: "",
        component: "",
        mark: "",
        icon: "",
        redirect: "",
        is_link: 0,
        sort: 0,
        is_show: 0,
        is_cache: 0,
        pid: "",
        type: "",
      },
      rules: {},
    };
  },
  mounted() {
    // console.log("ok");
    if (this.formData.pid && this.formData.pid === 0) {
      this.dialogShow = true;
    }
  },
  methods: {
    async handleConfirm() {
      if (this.formData.id) {
        await editMenuApi(this.formData);
        this.$message.success("修改成功！");
      } else {
        // 添加
        await addMenuApi(this.formData);
        this.$message.success("添加成功！");
      }

      this.dialogShow = false;
      this.$emit("updateList");
    },
    changeHandler(val) {
      this.radio1 = val;
      if (this.radio1 === 1) {
        this.formData.type = 2;
      } else {
        this.formData.type = 1;
      }
    },
    close() {
      this.formData = {
        title: "",
        path: "",
        component: "",
        mark: "",
        icon: "",
        redirect: "",
        is_link: 0,
        sort: 0,
        is_show: 0,
        is_cache: 0,
        pid: "",
        type: "",
      };
      this.dialogShow = false;
      this.$emit("updateList");
    },
  },
};
</script>
<style></style>
