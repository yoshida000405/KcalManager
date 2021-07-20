<template>
	<div class="list">
		<table class="table table-bordered table-hover">
			<thead>
				<tr>
					<th scope="col">#</th>
					<th scope="col">レシピ名</th>
					<th scope="col">カロリー</th>
					<th scope="col">グラム</th>
					<th scope="col">
						<select v-model="elem">
							<option
								v-for="n in $store.state.genre.length - 2"
								v-bind:value="$store.state.genreEnglish[n + 5]"
								:key="n + 1"
							>
								{{ $store.state.genre[n + 1] }}
							</option>
						</select>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="index of $store.state.recipeArray.length" :key="index">
					<th scope="row">
						{{ index }}
					</th>
					<td>{{ $store.state.recipeArray[index - 1]["nameJapanese"] }}</td>
					<td>{{ $store.state.recipeArray[index - 1]["kcal"] }}</td>
					<td>{{ $store.state.recipeArray[index - 1]["gram"] }}</td>
					<td>{{ $store.state.recipeArray[index - 1][this.elem] }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import store from "../store/index";

	export default defineComponent({
		name: "List",
		components: {},
		data(): {
			elem: string;
		} {
			return {
				elem: "protein",
			};
		},
		computed: {},
		methods: {
			window: (onload = function () {
				store.commit("initialize");
			}),
		},
		watch: {
			$route: function (to, from) {
				if (to.path !== from.path) {
					store.commit("getDefaultState");
					store.commit("listUpdate");
				}
			},
		},
	});
</script>
