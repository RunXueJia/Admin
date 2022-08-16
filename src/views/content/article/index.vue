<template>
	<el-card>
		<!-- 搜索表单 -->
		<el-form :inline="true" :model="searchForm" class="demo-form-inline">
			<el-form-item label="标题">
				<el-input size="mini" v-model="searchForm.title" placeholder="标题"></el-input>
			</el-form-item>
			<el-form-item label="分类">
				<el-select size="mini" v-model="searchForm.cateid" placeholder="分类">
					<el-option v-for="obj in cateList" :key="obj.id" :label="obj.catename" :value="obj.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="日期">
				<div class="block">
					<el-date-picker
						style="width : 220px"
						size="mini"
						type="daterange"
						range-separator="至"
						start-placeholder="开始"
						end-placeholder="结束"
						v-model="WhatTime"
					></el-date-picker>
				</div>
			</el-form-item>
			<el-form-item>
				<el-button size="mini" type="primary" @click="search">查询</el-button>
				<el-button size="mini" @click="reset">重置</el-button>
			</el-form-item>
		</el-form>
		<!--/ 搜索表单 -->
		<!-- 新增按钮 -->
		<div>
			<el-button @click="$router.push('/content_article/add')" type="primary" plain>+新增</el-button>
		</div>
		<br />
		<!-- /新增按钮 -->
		<!-- 表格 -->
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column prop="id" label="ID" width="180"></el-table-column>
			<el-table-column prop="title" label="标题" width="180"></el-table-column>
			<el-table-column prop="catename" label="分类" width="180"></el-table-column>
			<el-table-column prop="name" label="图片" width="180">
				<template slot-scope="{row}">
					<el-image style="width: 100px; height: 100px" :src="ShowImg(row.pic)" fit="contain"></el-image>
				</template>
			</el-table-column>
			<el-table-column label="创建时间" width="180">
				<template slot-scope="{row}">{{TimeToStr(row.create_date)}}</template>
			</el-table-column>
			<el-table-column prop="name" label="是否推荐" width="180">
				<template slot-scope="{row}">
					<el-switch :value="row.ishot ? true : false" active-text="否" inactive-text="是"></el-switch>
				</template>
			</el-table-column>
			<el-table-column prop="name" label="是否置顶" width="180">
				<template slot-scope="{row}">
					<el-switch :value="row.istop ? true : false" active-text="否" inactive-text="是"></el-switch>
				</template>
			</el-table-column>
			<el-table-column prop="name" label="文章状态" width="180">
				<template slot-scope="{row}">
					<el-tag
						:type="row.status ?   'primary':'success'"
						disable-transitions
					>{{row.status ? '待审核':'已发布'}}</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="address" label="操作" align="center">
				<template slot-scope="{row}">
					<el-button size="mini" type="primary" icon="el-icon-edit" circle @click="handleEdit(row)"></el-button>
					<el-button type="danger" icon="el-icon-delete" circle size="mini" @click="handleDelete(row)"></el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--/ 表格 -->
		<br />
		<!-- 分页 -->
		<div class="block">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="pageData.page"
				:page-sizes="[10, 12, 24 ,36]"
				:page-size="10"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total"
			></el-pagination>
		</div>
		<!-- /分页 -->
	</el-card>
</template>

<script>
	import { getCateListApi } from "@/api/cate";
	import { ShowImg, TimeToStr } from "@/utils/myFountion";
	import { getArticleListApi, delArticleInfoApi } from "@/api/article";
	export default {
		name: "Article",

		data() {
			return {
				cateList: [],
				pageData: {
					page: 1,
					limit: 10,
					start_time: "",
					end_time: "",
					title: "",
					cateid: "",
				},
				total: 0,
				searchForm: {
					start_time: "",
					end_time: "",
					title: "",
					cateid: "",
				},
				WhatTime: [],
				tableData: [],
			};
		},

		mounted() {},
		created() {
			this.initData();
			this.getCateList();
		},
		methods: {
			//获取分类列表
			async getCateList() {
				const { data } = await getCateListApi();
				// console.log(res);
				this.cateList = data;
			},
			ShowImg(url) {
				return ShowImg(url);
			},
			TimeToStr(time) {
				return TimeToStr(time);
			},
			//获取数据
			async initData() {
				const { data, count } = await getArticleListApi(this.pageData);
				// console.log(data);
				this.tableData = data;
				this.total = count;
			},
			//修改
			handleEdit(row) {
				this.$router.push({
					path: `/content_article/edit/${row.id}`,
					// query: {
					// 	id: row.id,
					// },
				});
			},
			//删除
			async handleDelete(row) {
				try {
					await this.$confirm("确定删除吗");
				} catch (error) {
					return;
				}
				try {
					await delArticleInfoApi(row.id);
				} catch (error) {
					return;
				}
				this.$message.success("删除成功");
				if (this.pageData.page > 1 && this.tableData.length === 1) {
					this.pageData.page--;
				}
				this.initData();
			},
			//搜索
			search() {
				this.searchForm.start_time = +new Date(this.WhatTime[0]) || "";
				this.searchForm.end_time = +new Date(this.WhatTime[1]) || "";
				Object.keys(this.searchForm).forEach((key) => {
					this.pageData[key] = this.searchForm[key];
				});
				this.initData();
				try {
				} catch (error) {}
			},
			//分页
			handleSizeChange(val) {
				// console.log(`每页 ${val} 条`);
				this.pageData.limit = val;
				this.initData();
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.pageData.page = val;
				this.initData();
			},
			//重置
			reset() {
				this.pageData = {
					page: 1,
					limit: 10,
					start_time: "",
					end_time: "",
					title: "",
					cateid: "",
				};
				this.searchForm = {
					start_time: "",
					end_time: "",
					title: "",
					cateid: "",
				};
				this.WhatTime = [];
				this.initData();
			},
		},
	};
</script>

<style lang="less" scoped>
</style>