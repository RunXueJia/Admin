<template>
	<el-form :rules="formRules" ref="content" :model="formData" label-width="80px">
		<el-row type="flex" justify="center">
			<el-col :span="16">
				<el-form-item label="文章内容" prop="content" size="small">
					<VueEditor v-model="formData.content" useCustomImageHandler @image-added="handleImageAdded" />
				</el-form-item>
			</el-col>
		</el-row>
	</el-form>
</template>

<script>
	import { VueEditor } from "vue2-editor";
	import { upImageApi } from "@/api/USER";

	export default {
		name: "AdminContent",
		components: { VueEditor },
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
			return {};
		},

		mounted() {},

		methods: {
			async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
				// 一般情况下，我们都是提交json数据，但是现在要上传文件所以要使用FormData方式上传表单
				// console.log("ok");
				// 发请求
				let res = await upImageApi(file);
				// 把图片放在光标所在的位置
				Editor.insertEmbed(
					cursorLocation,
					"image",
					process.env.VUE_APP_ApiUrl + "/" + res.savePath
				);
				// console.log(process.env.VUE_APP_ApiUrl + "/" + res.savePath);
				resetUploader();
			},
		},
	};
</script>

<style lang="less" scoped>
	/deep/ img {
		height: 100px !important;
	}
</style>