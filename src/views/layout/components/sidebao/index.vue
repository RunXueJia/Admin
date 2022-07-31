<template>
	<el-menu
		style="border:none"
		:collapse="$store.state.setting.isCollapse"
		:collapse-transition="false"
		:default-active="$route.path"
		router
		background-color="#304156"
		text-color="#fff"
	>
		<el-menu-item index="/dashboard">
			<i class="el-icon-menu"></i>
			<span>后台主页</span>
		</el-menu-item>

		<el-submenu index="/system">
			<template #title>
				<i class="el-icon-menu"></i>
				<span>系统设置</span>
			</template>
			<el-menu-item index="/system_menu">
				<i class="el-icon-location"></i>
				<span>菜单管理</span>
			</el-menu-item>
			<el-menu-item index="/system_role">
				<i class="el-icon-location"></i>
				<span>角色管理</span>
			</el-menu-item>
			<el-menu-item index="/system_user">
				<i class="el-icon-location"></i>
				<span>用户管理</span>
			</el-menu-item>
			<el-menu-item index="2-4">
				<i class="el-icon-location"></i>
				<span>AllMenu.66</span>
			</el-menu-item>
			<el-menu-item index="2-5">
				<i class="el-icon-location"></i>
				<span>系统配置</span>
			</el-menu-item>
		</el-submenu>
		<el-submenu index="/user">
			<template #title>
				<i class="el-icon-menu"></i>
				<span>会员管理</span>
			</template>
			<el-menu-item index="/user_user">
				<i class="el-icon-location"></i>
				<span>用户管理</span>
			</el-menu-item>
		</el-submenu>
		<el-submenu index="4">
			<template #title>
				<i class="el-icon-menu"></i>
				<span>广告管理</span>
			</template>

			<el-menu-item index="4-1">
				<i class="el-icon-location"></i>
				<span>友情链接管理</span>
			</el-menu-item>
			<el-menu-item index="4-2">
				<i class="el-icon-location"></i>
				<span>广告图管理</span>
			</el-menu-item>
			<el-menu-item index="4-3">
				<i class="el-icon-location"></i>
				<span>广告位管理</span>
			</el-menu-item>
		</el-submenu>
		<el-submenu index="/content">
			<template #title>
				<i class="el-icon-menu"></i>
				<span>内容管理</span>
			</template>

			<el-menu-item index="/content_cate">
				<i class="el-icon-location"></i>
				<span>分类管理</span>
			</el-menu-item>
			<el-menu-item index="/content_article">
				<i class="el-icon-location"></i>
				<span>文章管理</span>
			</el-menu-item>
			<el-menu-item index="/content_tag">
				<i class="el-icon-location"></i>
				<span>标签管理</span>
			</el-menu-item>
		</el-submenu>
	</el-menu>
</template>

<script>
	import { mapActions, mapMutations, mapState } from "vuex";

	export default {
		name: "Index",
		computed: {
			// ...mapState(["isCollapse"]),
		},
		data() {
			return {};
		},

		mounted() {},

		methods: {},
	};
</script>

<style lang="less" scoped>
</style>