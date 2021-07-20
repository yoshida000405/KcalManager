<template>
	<div class="mt-5 clearfix">
		<div class="float-left colum1">
			{{ this.num }}
		</div>
		<div class="float-left colum2">
			<select v-model="this.recipe">
				<option disabled value="0">選択してください</option>
				<option
					v-for="(value, index) in $store.state.recipeArray"
					:key="index + 1"
					:value="index + 1"
				>
					{{ value["nameJapanese"] }}
				</option>
			</select>
		</div>
		<div class="float-left colum3">
			<input type="number" v-model.lazy="inputValue" />
		</div>
		<div class="float-left colum4">
			<button class="btn btn-primary" @click="recipeInfoOpen">詳細</button>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import store from "../store/index";

	export default defineComponent({
		name: "RegisterForm",
		components: {},
		emits: ["selectRecipe", "recipeInfoOpen"],
		methods: {
			recipeInfoOpen: function () {
				if (this.recipe != "0") {
					this.$emit("recipeInfoOpen", this.recipe, this.gram);
				} else {
					alert("選択してください!");
				}
			},
		},
		data(): {
			gram: Number;
			recipe: string;
		} {
			return {
				gram: 100,
				recipe: "0",
			};
		},
		props: {
			num: {
				type: Number,
				required: false,
				default: 0,
			},
		},
		computed: {
			selectRecipe() {
				return this.recipes;
			},
			inputValue: {
				get(): Number {
					return this.gram;
				},
				set(gram: Number) {
					this.gram = gram;
					this.$emit("selectRecipe", this.id, Number(this.recipe) - 1, this.gram);
				},
			},
			id: {
				get(): String {
					return "" + this.num;
				},
				set(id: String) {},
			},
			recipes: {
				get(): String {
					return this.recipe;
				},
				set(recipe: String) {},
			},
		},
		watch: {
			selectRecipe(val, old) {
				this.$emit("selectRecipe", this.id, Number(this.recipe) - 1, this.gram);
			},
		},
	});
</script>

<style lang="scss">
	@media screen and (max-width: 2300px) {
		.colum1 {
			width: 25% !important;
			padding-left: 3rem;
		}
		.colum2 {
			width: 25% !important;
			text-align: center;
		}
		.colum3 {
			width: 25% !important;
			padding-right: 3rem;
			text-align: right;
		}
		.colum4 {
			width: 25% !important;
			padding-right: 3rem;
			text-align: right;
		}
	}

	@media screen and (max-width: 1430px) {
		.colum1 {
			width: 40% !important;
			margin: 5% 0 0 0;
		}
		.colum2 {
			width: 40% !important;
			margin: 5% 0 0 5%;
		}
		.colum3 {
			width: 40% !important;
			margin: 5% 0 0 5%;
			text-align: center;
		}
		.colum4 {
			width: 40% !important;
			margin: 5% 0 0 5%;
		}
	}

	@media screen and (max-width: 967px) {
		.colum1 {
			width: 100% !important;
			margin: 5% 0 0 0;
			text-align: left;
		}
		.colum2 {
			width: 100% !important;
			margin: 5% 0 0 7%;
			text-align: left;
		}
		.colum3 {
			width: 40% !important;
			margin: 5% 0 0 7%;
			text-align: left;
		}
		.colum4 {
			width: 40% !important;
			margin: 5% 0 0 5%;
		}
	}

	@media screen and (max-width: 564px) {
		.colum1 {
			width: 100% !important;
			margin: 5% 0 0 0;
			text-align: left;
		}
		.colum2 {
			width: 100% !important;
			margin: 5% 0 0 7%;
			text-align: left;
		}
		.colum3 {
			width: 40% !important;
			margin: 5% 0 0 7%;
			text-align: left;
		}
		.colum4 {
			width: 40% !important;
			margin: 5% 0 0 5%;
		}
	}
</style>