<template>
	<el-row align="middle" type="flex" style="height : 60px" justify="space-between">
		<el-row align="middle" span class="header-left" type="flex">
			<el-button
				@click="toggleCollapse"
				size="small"
				type
				:icon="isCollapse?'el-icon-s-fold' :'el-icon-s-unfold'"
			></el-button>
			<!-- <el-button size="small" type icon="el-icon-s-unfold"></el-button> -->

			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item v-for="(obj ,index) in loctionlist" :key="index">
					<router-link v-if="index < loctionlist.length-1" :to="obj.path">{{obj.title}}</router-link>
					<span v-else>{{obj.title}}</span>
				</el-breadcrumb-item>
				<!-- <el-breadcrumb-item>活动列表</el-breadcrumb-item> -->
			</el-breadcrumb>
		</el-row>
		<div class="header-right">
			<el-dropdown>
				<span class="el-dropdown-link">
					<el-avatar size="small" icon="el-icon-user-solid" style="vertical-align: middle"></el-avatar>
					{{name}}
					<i class="el-icon-arrow-down el-icon--right"></i>
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item>黄金糕</el-dropdown-item>
					<el-dropdown-item>狮子头</el-dropdown-item>
					<el-dropdown-item divided @click.native="quit">退出</el-dropdown-item>
					<!-- <el-dropdown-item disabled>双皮奶</el-dropdown-item>
					<el-dropdown-item divided>蚵仔煎</el-dropdown-item>-->
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</el-row>
</template>

<script>
	import { mapActions, mapGetters, mapMutations, mapState } from "vuex";

	export default {
		name: "Index",

		data() {
			return {};
		},

		mounted() {},
		computed: {
			...mapGetters("user", ["name"]),
			...mapState("setting", ["isCollapse"]),
			loctionlist() {
				return this.$route.matched.map((item) => ({
					title: item.meta.title,
					path: item.path,
				}));
			},
		},
		methods: {
			...mapActions("user", ["quitOut"]),
			...mapMutations("setting", ["toggleCollapse"]),
			async quit() {
				// this.quitOut();
				try {
					await this.$confirm("退出吗", "提示");
					await this.quitOut();
					this.$router.push("/login");
				} catch (error) {
					return;
				}
			},
		},
	};
</script>

<style lang="less" scoped>
</style>