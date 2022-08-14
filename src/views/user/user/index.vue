<template>
	<div id="Adminuser">
		<!-- 筛选表单 -->
		<el-form ref="searchform" :inline="true" :model="searchData" class="demo-form-inline">
			<el-form-item label="用户名">
				<el-input v-model="searchData.username" placeholder="请输入用户名称"></el-input>
			</el-form-item>
			<el-form-item label="手机号">
				<el-input v-model="searchData.mobile" placeholder="请输入手机号"></el-input>
			</el-form-item>
			<el-form-item label="性别">
				<el-select v-model="searchData.sex" placeholder="请选择">
					<el-option v-for="item in sexs" :key="item.value" :label="item.label" :value="item.value"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="searchFn">搜索</el-button>
				<el-button @click="reset">重置</el-button>
			</el-form-item>
		</el-form>
		<!--/ 筛选表单 -->
		<!-- 新增 -->
		<el-button @click="$refs.addRolesVue.dialogFormVisible =true" type="primary">新增</el-button>

		<!--/ 新增 -->
		<!-- 表格区域 -->
		<el-table :data="tableData" style="width: 100%">
			<el-table-column type="index"></el-table-column>
			<el-table-column min-width="150" prop="id" label="ID"></el-table-column>
			<el-table-column min-width="150" prop="username" label="用户名"></el-table-column>
			<el-table-column min-width="150" prop="mobile" label="手机号"></el-table-column>
			<el-table-column min-width="150" prop="icon" label="用户头像">
				<template slot-scope="scope">
					<img style="height:50px" fit="fill" :src="ShowImg(scope.row.icon)" />
				</template>
			</el-table-column>
			<el-table-column min-width="150" prop="sex" label="性别">
				<template slot-scope="scope">
					<el-tag
						:type="scope.row.sex ? 'primary' : 'success'"
						disable-transitions
					>{{scope.row.sex? '女':'男'}}</el-tag>
				</template>
			</el-table-column>

			<el-table-column min-width="300" prop="sort_num" label="出生年月"></el-table-column>

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
		<addRoles @updateList="initData" ref="addRolesVue" />
		<!--/ 弹框 -->
	</div>
</template>

<script>
	import { ShowImg } from "@/utils/myFountion";

	import addRoles from "./components/addroles.vue";
	import { getUserListApi, getUserInfoApi, delUserInfoApi } from "@/api/USER";
	export default {
		name: "Adminuser",
		components: { addRoles },
		data() {
			return {
				//sex
				sexs: [
					{
						value: 1,
						label: "女",
					},
					{
						value: 0,
						label: "男",
					},
				],

				count: 0,
				searchData: {
					username: "",
					mobile: "",
					sex: "",
				},
				tableData: [],
				params: {
					limit: 10,
					page: 1,
					username: "",
					mobile: "",
					sex: "",
				},
			};
		},

		mounted() {},
		created() {
			this.initData();
		},
		methods: {
			ShowImg(url) {
				return ShowImg(url);
			},
			//修改
			async handleEdit(val, obj) {
				const res = await getUserInfoApi(obj.id);
				// console.log(res);
				this.$refs.addRolesVue.data = res;
				this.$refs.addRolesVue.sex = res.sex ? true : false;
				this.$refs.addRolesVue.dialogFormVisible = true;
				this.$refs.addRolesVue.fileList.push({
					name: "pic",
					url: ShowImg(res.icon),
				});
			},
			//删除
			async handleDelete(val, obj) {
				try {
					await this.$confirm("确定删除吗");
				} catch (error) {
					return;
				}

				await delUserInfoApi(obj.id);
				this.$message.success("删除成功");
				this.initData();
			},
			//获取数据
			async initData() {
				const { data, count } = await getUserListApi(this.params);
				// console.log(data, count);
				this.tableData = data;
				this.count = count;
			},
			//搜索
			async searchFn() {
				await this.$refs.searchform.validate();
				this.params.username = this.searchData.username;
				this.params.mobile = this.searchData.mobile;
				this.params.sex = this.searchData.sex;
				this.initData();
			},
			reset() {
				this.params.username = "";
				this.searchData = {
					username: "",
					mobile: "",
					sex: "",
				};
				this.params = {
					limit: 10,
					page: 1,
					username: "",
					mobile: "",
					sex: "",
				};
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
		},
	};
</script>

<style lang="less" scoped>
	#Adminuser {
		.block {
			text-align: center;
			margin-top: 20px;
		}
	}
</style>