<template>
	<div id="nav">
		<router-link to="/search">Search</router-link> |
		<router-link to="/result">Result</router-link> |
		<router-link to="/list">List</router-link> |
		<router-link to="/calendar">Calendar</router-link>
	</div>
	<router-view />
</template>

<style>
	body {
		background: #fff !important;
	}
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}

	#nav {
		padding: 30px;
	}

	#nav a {
		font-weight: bold;
		color: #2c3e50;
	}

	#nav a.router-link-exact-active {
		color: #42b983;
	}
</style>

<script lang="ts">
	import { defineComponent } from "vue";
	import store from "./store/index";

	export default defineComponent({
		name: "Calendar",
		methods: {
			window: (onload = function () {
				store.commit("initialize");
			}),
		},
	});
</script>