<template>
	<div>
		<el-upload
			action="#"
			class="upload-demo"
			:http-request="UploadImg"
			:file-list="fileList"
			list-type="picture"
			:on-change="changeImg"
			:on-remove="onremove"
			:limit="1"
		>
			<el-button size="small" type="primary">点击上传</el-button>
		</el-upload>
	</div>
</template>

<script>
	import { upImageApi } from "@/api/USER";

	export default {
		name: "UploadImg",
		props: {
			fileList: {
				type: Array,
			},
			pic: {
				type: String,
			},
		},
		data() {
			return {};
		},

		mounted() {},

		methods: {
			async UploadImg({ file }) {
				try {
					let fd = new FormData();
					fd.append("file", file);
					const res = await upImageApi(fd);
					this.$emit("update:pic", res.savePath);
				} catch (error) {
					return;
				}
				this.$message.success("图片上传成功");
				// console.log(res);
			},
			//
			changeImg(file, fileList) {
				this.$emit(
					"update:fileList",
					fileList.map((item) => item)
				);
			},
			onremove(file, fileList) {
				this.$emit(
					"update:fileList",
					this.fileList.filter((item) => item.uid !== file.uid)
				);
			},
		},
	};
</script>

<style lang="scss" scoped>
</style>
