<template>
	<el-card>
		<el-tabs v-model="activeName">
			<el-tab-pane label="新增" name="first">
				<SomeInfo ref="SomeInfo" :formRules="formRules" :formData="formData" />
			</el-tab-pane>
			<el-tab-pane label="SEO信息" name="second">
				<SeoSet ref="seo" :formRules="formRules" :formData="formData" />
			</el-tab-pane>
			<el-tab-pane :formRules="formRules" label="文章内容" name="third">
				<ArticleContent ref="content" :formRules="formRules" :formData="formData" />
			</el-tab-pane>
		</el-tabs>
		<el-row type="flex" justify="center">
			<el-button @click="submit" type="success">发布文章</el-button>
			<el-button @click="submit" type="info">保存草稿</el-button>
			<el-button @click="$router.push('/content_article')" type="warning">返回列表</el-button>
		</el-row>
	</el-card>
</template>

<script>
	import { ShowImg } from "@/utils/myFountion";

	import SomeInfo from "./someinfo.vue";
	import SeoSet from "./seo.vue";
	import ArticleContent from "./content.vue";
	import {
		addArticleApi,
		getArticleInfoApi,
		editArticleApi,
	} from "@/api/article";
	export default {
		name: "AdminAddArticle",
		components: { SomeInfo, SeoSet, ArticleContent },
		data() {
			return {
				activeName: "first",
				formData: {
					author: "",
					cateid: "",
					click: "",
					content: "",
					create_date: "",
					description: "",
					ishot: 0,
					istop: 0,
					keywords: "",
					lovenum: "",
					pic: "",
					status: "",
					tags: [],
					title: "",
				},
				formRules: {
					author: [{ required: true, message: "请输入", trigger: "blur" }],
					cateid: [{ required: true, message: "请输入", trigger: "blur" }],
					click: [{ required: true, message: "请输入", trigger: "blur" }],
					content: [{ required: true, message: "请输入", trigger: "blur" }],
					create_date: [{ required: true, message: "请输入", trigger: "blur" }],
					description: [
						{
							validator: (rules, val, cb) => {
								if (this.formData.description) return cb();
								cb("请输入");
							},
							trigger: "blur",
						},
					],
					ishot: [{ required: true, message: "请输入", trigger: "blur" }],
					istop: [{ required: true, message: "请输入", trigger: "blur" }],
					keywords: [
						{
							validator: (rules, val, cb) => {
								if (this.formData.keywords) return cb();
								cb("请输入");
							},
							trigger: "blur",
						},
					],
					lovenum: [{ required: true, message: "请输入", trigger: "blur" }],
					pic: [{ required: true, message: "请输入", trigger: "blur" }],
					status: [{ required: true, message: "请输入", trigger: "blur" }],
					tags: [{ required: true, message: "请输入", trigger: "blur" }],
					title: [{ required: true, message: "请输入", trigger: "blur" }],
				},
			};
		},

		mounted() {},
		created() {
			if (this.$route.params.id) {
				this.getArticleInfoFn(this.$route.params.id);
			}
		},
		methods: {
			//修改文章时填充数据
			async getArticleInfoFn(id) {
				const res = await getArticleInfoApi(id);
				// console.log(res);
				if (res.tags) {
					res.tags = res.tags.split(",");
				} else {
					res.tags = [];
				}
				this.$refs.SomeInfo.isHot = res.ishot ? true : false;
				this.$refs.SomeInfo.isTop = res.istop ? true : false;
				this.formData = res;
				this.$refs.SomeInfo.fileList.push({
					name: "pic",
					url: ShowImg(res.pic),
				});
			},
			//提交
			async submit(status) {
				try {
					await this.$refs.SomeInfo.$refs.SomeInfo.validate();
					await this.$refs.seo.$refs.seo.validate();
					await this.$refs.content.$refs.content.validate();
				} catch (error) {
					return;
				}
				const NewData = JSON.parse(JSON.stringify(this.formData));
				// console.log(NewData);
				NewData.create_date = +new Date(NewData.create_date);
				NewData.tags = NewData.tags.join(",");
				if (status) {
					// NewData.status = status;
				}
				// console.log(NewData);
				try {
					if (NewData.id) {
						await editArticleApi(NewData);
					} else {
						await addArticleApi(NewData);
					}
				} catch (error) {
					return;
				}
				this.$message.success("提交成功");
				this.formData = {
					author: "",
					cateid: "",
					click: "",
					content: "",
					create_date: "",
					description: "",
					ishot: 0,
					istop: 0,
					keywords: "",
					lovenum: "",
					pic: "",
					status: "",
					tags: [],
					title: "",
				};
				this.$router.push("/content_article");
			},
		},
	};
</script>

<style lang="scss" scoped>
</style>