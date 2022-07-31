<template>
	<el-form :rules="formRules" ref="seo" :model="form" label-width="100px">
		<el-row type="flex" justify="center">
			<el-col :span="16">
				<el-form-item prop="keywords" size="small" label="SEO关键字">
					<el-input :rows="3" type="textarea" v-model="formData.keywords"></el-input>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row type="flex" justify="center">
			<el-col :span="16">
				<el-form-item prop="description" size="small" label-width="100px" label="SEO描述">
					<el-input :rows="3" type="textarea" v-model="formData.description"></el-input>
				</el-form-item>
			</el-col>
		</el-row>
	</el-form>
</template>

<script>
	export default {
		name: "AdminSeo",
		props: {
			formData: {
				type: Object,
				required: true,
			},
			formRules: {
				type: Object,
				required: true,
			},
		},
		data() {
			return {
				form: {},
			};
		},

		mounted() {},

		methods: {},
	};
</script>

<style lang="scss" scoped>
</style>