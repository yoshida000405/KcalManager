<template>
	<div class="mt-5 clearfix">
		<div class="col-md-1 float-left"><h5>.</h5></div>
		<table class="col-md-5 float-left table table-bordered table-hover">
			<tbody>
				<tr v-for="(item, index) in $store.state.lists1" :key="index">
					<th scope="row" @click="detailFormOpen(index)">{{ index }}</th>
					<td>{{ item }}</td>
				</tr>
			</tbody>
		</table>
		<table class="col-md-5 float-left table table-bordered table-hover">
			<tbody>
				<tr v-for="(item, index) in $store.state.lists2" :key="index">
					<th scope="row" @click="detailFormOpen(index)">{{ index }}</th>
					<td>{{ item }}</td>
				</tr>
			</tbody>
		</table>
		<div class="col-md-1 float-left"></div>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import jQuery from "jquery";
	import store from "../store/index";

	export default defineComponent({
		name: "List",
		computed: {},
		emits: ["detail-form-open"],
		watch: {},
		methods: {
			detailFormOpen(index: string) {
				this.$emit("detail-form-open", index);
			},
		},
	});
</script>
