<template>
	<div>
		<el-form :rules="formRules" ref="SomeInfo" :model="formData" label-width="80px">
			<el-row type="flex" justify="center">
				<el-col :span="16">
					<el-form-item prop="title" size="small" label="标题">
						<div style="display : flex">
							<el-input v-model="formData.title"></el-input>
							<el-button plain>
								<i class="el-icon-search"></i> 查重
							</el-button>
						</div>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row type="flex" justify="center">
				<el-col :span="8">
					<el-form-item prop="author" size="small" label="作者">
						<el-input style="width:70%" v-model="formData.author"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item prop="cateid" label="分类">
						<el-select v-model="formData.cateid" placeholder="活动区域">
							<el-option v-for="cate in catelist" :key="cate.id" :label="cate.catename" :value="cate.id"></el-option>
							<!-- <el-option label="区域二" value="beijing"></el-option> -->
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row type="flex" justify="center">
				<el-col :span="8">
					<el-form-item prop="click" label="阅读次数">
						<el-input-number v-model="formData.click" :min="1" :max="10" label="描述文字"></el-input-number>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item prop="create_date" label="创建时间">
						<el-date-picker v-model="formData.create_date" type="date" placeholder="选择日期"></el-date-picker>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row type="flex" justify="center">
				<el-col :span="8">
					<el-form-item prop="ishot" label="是否推荐">
						<el-switch
							v-model="isHot"
							@change="formData.ishot =$event? 1 : 0"
							active-text="是"
							inactive-text="否"
						></el-switch>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item prop="istop" label="是否置顶">
						<el-switch
							v-model="isTop"
							@change="formData.istop =$event? 1 : 0"
							active-color="#13ce66"
							inactive-color="#ff4949"
							active-text="是"
							inactive-text="否"
						></el-switch>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row type="flex" justify="center">
				<el-col :span="16">
					<el-form-item prop="lovenum" label="收藏数量">
						<el-input style="width:50%" v-model="formData.lovenum"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row type="flex" justify="center">
				<el-col :span="16">
					<el-form-item label-width="100" prop="pic" label="文章缩略图">
						<!-- <el-upload
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
						</el-upload>-->
						<UploadImg :pic.sync="formData.pic" :fileList.sync="fileList" />
					</el-form-item>
				</el-col>
			</el-row>
			<el-row type="flex" justify="center">
				<el-col :span="16">
					<el-form-item prop="tags" label="标签">
						<el-checkbox-group v-model="formData.tags">
							<el-checkbox v-for="tag in tags" :label="tag.tagname" :key="tag.id">{{tag.tagname}}</el-checkbox>
						</el-checkbox-group>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
	</div>
</template>

<script>
	import { getCateListApi } from "@/api/cate";
	import { getTagListApi } from "@/api/Tag";
	export default {
		name: "AdminSomeinfo",
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
				isHot: false,
				isTop: false,
				checkedCities: "",
				tags: [],
				catelist: [],
				fileList: [],
			};
		},

		mounted() {},
		created() {
			this.getTagsList();
			this.getCateList();
		},
		methods: {
			//获取分类
			async getCateList() {
				const { data } = await getCateListApi(this.params);
				// console.log(data, count);
				this.catelist = data;
			},
			//获取标签
			async getTagsList() {
				const { data } = await getTagListApi(this.params);
				this.tags = data;
			},
		},
	};
</script>

<style lang="scss" scoped>
</style>