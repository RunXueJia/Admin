<template>
	<el-container class="layout-container">
		<el-aside class="layout-aside" :width="isCollapse?'64px':'230px'">
			<div class="logo">
				<h3>优点达管理系统</h3>
			</div>
			<!-- 菜单 -->
			<SideBar></SideBar>
			<!-- /菜单 -->
		</el-aside>
		<el-container>
			<el-header class="layout-header">
				<NavBar></NavBar>
			</el-header>
			<tags-view />
			<el-main class="layout-main">
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	import NavBar from "./components/navbar";
	import SideBar from "./components/sidebao";
	import { mapActions, mapMutations, mapState } from "vuex";
	export default {
		name: "Layout",
		components: { SideBar, NavBar },
		data() {
			return {};
		},
		created() {
			// console.log(this.$route);
		},
		mounted() {},
		computed: {
			// ...mapState({
			// 	isCollapse: (state) => state.setting.isCollapse,
			// }),
			...mapState("setting", ["isCollapse"]),
		},
		methods: {},
	};
</script>

<style scoped lang="less">
	.layout-container {
		height: 100vh;
	}
	.layout-aside {
		background-color: #304156;
		.logo {
			height: 60px;
			line-height: 60px;
			background-color: #2b2f3a;
			h3 {
				text-align: center;
				color: #fff;
				font-weight: normal;
				font-size: 18px;
			}
		}
	}
	.layout-header {
		box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
		.el-dropdown-link {
			line-height: 60px;
		}
		.el-avatar {
			vertical-align: middle;
		}
	}
</style>