<template>
	<el-row class="login-container" type="flex" justify="center" align="middle">
		<el-col class="login-box" :span="6">
			<h3>优点达资讯系统</h3>
			<el-form ref="form" :model="formData" :rules="formRules">
				<el-form-item label-width="60px" label="账号" prop="login_name">
					<el-input v-model="formData.login_name" clearable prefix-icon="el-icon-user"></el-input>
				</el-form-item>
				<el-form-item label-width="60px" label="密码" prop="password">
					<el-input v-model="formData.password" show-password clearable prefix-icon="el-icon-lock"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button :loading="isLoading" @click="BtnSub" class="login-bth" type="primary">立即登录</el-button>
				</el-form-item>
			</el-form>
		</el-col>
	</el-row>
</template>

<script>
	export default {
		name: "Login",

		data() {
			return {
				formData: {
					login_name: "admin",
					password: "111111",
				},
				isLoading: false,
				formRules: {
					login_name: [
						{
							required: true,
							message: "请输入账号",
							trigger: blur,
						},
						{
							min: 2,
							max: 20,
							message: "长度2-20",
							trigger: blur,
						},
					],
					password: [
						{
							required: true,
							message: "请输入密码",
							trigger: blur,
						},
					],
				},
			};
		},

		mounted() {},

		methods: {
			async BtnSub() {
				this.isLoading = true;
				// console.log(this.formData);
				//
				try {
					this.$refs.form.validate();
				} catch (error) {
					return console.log(error);
				}

				try {
					await this.$store.dispatch("user/loginFn", this.formData);
					this.$router.push("/");
					this.isLoading = false;
				} catch (error) {}
			},
		},
	};
</script>

<style lang="less" scoped>
	.login-container {
		background-image: url(http://124.223.14.236:8060/static/admin/image/loginbg.png);
		min-height: 100vh;

		background-size: cover;
		.login-box {
			background-color: #fff;
			min-height: 300px;
			min-width: 400px;
			box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
			padding: 10px 30px;
			h3 {
				text-align: center;
				color: orange;
				font-weight: normal;
				font-size: 22px;
				border-bottom: 1px solid #ccc;
				line-height: 60px;
				margin-bottom: 25px;
			}
			.login-bth {
				display: block;
				width: 100%;
			}
		}
	}
</style>