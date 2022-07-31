<template>
	<div id="Admincate">
		<!-- 筛选表单 -->
		<el-form
			ref="searchform"
			:inline="true"
			:rules="rules"
			:model="searchData"
			class="demo-form-inline"
		>
			<el-form-item prop="catename" label="分类名称">
				<el-input v-model="searchData.catename" placeholder="请输入分类名称"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="searchFn">搜索</el-button>
				<el-button @click="reset">重置</el-button>
			</el-form-item>
		</el-form>
		<!--/ 筛选表单 -->
		<!-- 新增 -->
		<el-button @click="dialogFormVisible =true" type="primary">新增</el-button>

		<!--/ 新增 -->
		<!-- 表格区域 -->
		<el-table :data="tableData" style="width: 100%">
			<el-table-column type="index"></el-table-column>
			<el-table-column min-width="200" prop="id" label="ID"></el-table-column>
			<el-table-column min-width="200" prop="catename" label="分类名称"></el-table-column>
			<el-table-column min-width="200" prop="icon" label="图标class">
				<template slot-scope="scope">
					<p>
						{{ scope.row.icon }}
						<i class="fa" :class="scope.row.icon"></i>
					</p>
				</template>
			</el-table-column>
			<el-table-column min-width="300" prop="sort_num" label="权重"></el-table-column>

			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button
						type="primary"
						icon="el-icon-edit"
						circle
						@click="handleEdit(scope.$index, scope.row)"
					></el-button>
					<el-button
						type="danger"
						icon="el-icon-delete"
						circle
						@click="handleDelete(scope.$index, scope.row)"
					></el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--/ 表格区域 -->
		<!-- 分页区域 -->
		<div class="block">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="params.page"
				:page-sizes="[10, 8, 4 ]"
				:page-size="params.limit"
				layout="total, sizes, prev, pager, next, jumper"
				:total="count"
			></el-pagination>
		</div>
		<!-- /分页区域 -->
		<!-- 弹框 -->
		<el-dialog @close="closeHandler" :title="data.id? '修改' :'新增'" :visible.sync="dialogFormVisible">
			<el-form ref="addform" :rules="rules" :model="data" label-width="100px">
				<el-form-item prop="catename" label="分类名称">
					<el-input v-model="data.catename" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item prop="icon" label="图标class">
					<el-input v-model="data.icon" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item prop="catename" label="分类名称">
					<el-input-number v-model="data.sort_num" :min="1" :max="100" label="权重"></el-input-number>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="addcate">确 定</el-button>
			</div>
		</el-dialog>
		<!--/ 弹框 -->
	</div>
</template>

<script>
	import {
		getCateListApi,
		getCateInfoApi,
		addCateApi,
		editCateApi,
		delCateInfoApi,
	} from "@/api/cate";
	export default {
		name: "Admincate",

		data() {
			return {
				dialogFormVisible: false,
				count: 0,
				searchData: {
					catename: "",
				},
				rules: {
					catename: [
						{ required: true, message: "请输入分类名称", trigger: "blur" },
					],
					icon: [{ required: true, message: "请输入分类名称", trigger: "blur" }],
				},

				tableData: [],
				params: {
					limit: 10,
					page: 1,
					catename: "",
				},
				data: {
					catename: "",
					sort_num: 10,
				},
			};
		},

		mounted() {},
		created() {
			this.initData();
		},
		methods: {
			//修改
			async handleEdit(val, obj) {
				const res = await getCateInfoApi(obj.id);
				// console.log(res);
				this.data = res;
				this.dialogFormVisible = true;
			},
			//删除
			async handleDelete(val, obj) {
				await this.$confirm("确定删除吗");
				await delCateInfoApi(obj.id);
				this.$message.success("删除成功");
				this.initData();
			},
			//获取数据
			async initData() {
				const { data, count } = await getCateListApi(this.params);
				// console.log(data, count);
				this.tableData = data;
				this.count = count;
			},
			//搜索
			async searchFn() {
				await this.$refs.searchform.validate();
				this.params.catename = this.searchData.catename;
				this.initData();
			},
			reset() {
				this.params.catename = "";
				this.searchData.catename = "";
				this.params.page = 1;
				this.initData();
			},
			//
			handleSizeChange(val) {
				this.params.limit = val;
				this.initData();
			},
			handleCurrentChange(val) {
				this.params.page = val;
				this.initData();
			},
			closeHandler() {
				this.data = {
					catename: "",
					sort_num: 10,
				};
			},
			//新增
			async addcate() {
				try {
					await this.$refs.addform.validate();
				} catch (error) {
					return;
				}
				try {
					if (this.data.id) {
						await editCateApi(this.data);
					} else {
						await addCateApi(this.data);
					}
				} catch (error) {
					return this.$message.error(this.data.id ? "修改成功" : "添加失败");
				}
				this.$message.success(this.data.id ? "修改成功" : "添加成功");

				this.initData();
				this.dialogFormVisible = false;
			},
		},
	};
</script>

<style lang="less" scoped>
	#Admincate {
		.block {
			text-align: center;
			margin-top: 20px;
		}
	}
</style>