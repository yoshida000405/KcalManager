<template>
	<div class="mt-5 clearfix ml-5 mr-5">
		<table class="table table-bordered table-hover">
			<tbody>
				<tr v-for="index of $store.state.list.length" :key="index">
					<th
						scope="row"
						@click="detailFormOpen($store.state.genre[(index - 1) * 2])"
					>
						{{ $store.state.genre[(index - 1) * 2] }}
					</th>
					<td>{{ $store.state.list[index - 1][0] }}</td>
					<th
						scope="row"
						@click="detailFormOpen($store.state.genre[(index - 1) * 2 + 1])"
					>
						{{ $store.state.genre[(index - 1) * 2 + 1] }}
					</th>
					<td>
						{{ $store.state.list[index - 1][1] }}
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";

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
