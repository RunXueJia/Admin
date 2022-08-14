<template>
	<el-dialog @close="closeHandler" :title="data.id? '修改' :'新增'" :visible.sync="dialogFormVisible">
		<el-form
			v-if="dialogFormVisible"
			:inline="true"
			ref="addform"
			:rules="rules"
			:model="data"
			label-width="100px"
		>
			<el-form-item prop="username" label="用户名">
				<el-input style="width: 300px" v-model="data.username" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item prop="mobile" label="手机号">
				<el-input style="width: 300px" v-model="data.mobile" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item prop="username" label="密码">
				<el-input style="width: 300px" v-model="data.password" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="性别">
				<el-switch v-model="sex" @change="data.sex = $event ? 1:0" active-text="女" inactive-text="男"></el-switch>
			</el-form-item>
			<br />
			<el-form-item label="头像/选填">
				<UploadImg :pic.sync="data.icon" :fileList.sync="fileList" />
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="dialogFormVisible = false">取 消</el-button>
			<el-button type="primary" @click="adduser">确 定</el-button>
		</div>
	</el-dialog>
</template>

<script>
	import { addUserApi, editUserApi, upImageApi } from "@/api/USER";
	export default {
		name: "AdminAddroles",

		data() {
			return {
				dialogFormVisible: false,
				sex: false,
				rules: {
					username: [
						{ required: true, message: "请输入用户名", trigger: "blur" },
					],
					password: [
						{ required: true, message: "请输入手机号", trigger: "blur" },
					],
					mobile: [{ required: true, message: "请输入密码", trigger: "blur" }],
				},
				data: {
					username: "",
					mobile: "",
					sex: 0,
					password: "",
					icon: "",
				},
				fileList: [],
			};
		},

		mounted() {},
		created() {},
		methods: {
			//上传
			async handlePreview(file) {
				// console.log(file);
				try {
					const res = await upImageApi(file.raw);
					this.data.icon = res.savePath;
				} catch (error) {
					return;
				}
				this.$message.success("图片上传成功");
				// console.log(res);
			},
			//新增
			async adduser() {
				try {
					await this.$refs.addform.validate();
				} catch (error) {
					return;
				}
				try {
					if (this.data.id) {
						await editUserApi(this.data);
					} else {
						await addUserApi(this.data);
					}
				} catch (error) {
					return this.$message.error(this.data.id ? "修改成功" : "添加失败");
				}
				this.$message.success(this.data.id ? "修改成功" : "添加成功");

				this.$emit("updateList");
				this.dialogFormVisible = false;
			},
			closeHandler() {
				this.data = {
					username: "",
					mobile: "",
					sex: "",
					password: "",
					icon: "",
				};
			},
		},
	};
</script>

<style lang="scss" scoped>
</style>