<template>
	<div class="mt-5 clearfix">
		<div class="float-left colum1">
			<select v-model="category" @change="selectCategory">
				<option value="1">全選択</option>
				<option
					v-for="(value, index) in $store.state.category"
					:key="index + 2"
					:value="index + 2"
				>
					{{ value }}
				</option>
			</select>
		</div>
		<div class="float-left colum2">
			<Select2
				v-model="selectFood"
				:options="myOptions"
				:settings="{ settingOption: value, settingOption: value }"
			/>
		</div>
		<div class="float-left colum3">
			<input type="number" v-model.lazy="inputValue" />
		</div>
		<div class="float-left colum4">
			<button class="btn btn-primary" @click="foodFormOpen">詳細</button>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import store from "../store/index";
	import Select2 from "vue3-select2-component";
	import FoodInfo from "./FoodInfo.vue";

	export default defineComponent({
		name: "Foodstuff",
		components: { Select2, FoodInfo },
		emits: [
			"change-food",
			"change-gram",
			"change-category",
			"food-form-open",
			"category-validation",
		],
		methods: {
			foodFormOpen() {
				this.$emit("food-form-open", this.id.replace("foodstuff", ""));
			},
			setCategory(type: string) {
				var categoryInfo = store.state.categoryInfo[this.category];
				if (type == "manual") {
					this.$emit(
						"change-category",
						this.category,
						this.id.replace("foodstuff", ""),
						type
					);
				}
				if (this.category == "1") {
					this.myOptions = store.state.allFood;
				} else {
					if (this.myOptions.length > 2000) {
						this.myOptions = this.myOptions.filter((elem) =>
							categoryInfo.includes(elem)
						);
					} else {
						this.myOptions = [];
						for (var key in categoryInfo) {
							this.myOptions.push(categoryInfo[key]);
						}
					}
				}
				this.food = "";
			},
			selectCategory() {
				this.setCategory("manual");
			},
		},
		data(): {
			gram: Number;
			category: string;
			food: string;
			myOptions: string[];
		} {
			return {
				gram: store.state.gramArray[this.index - 1],
				category: store.state.categoryArray[this.index - 1],
				food: store.state.foodArray[this.index - 1],
				myOptions: store.state.allFood,
			};
		},
		props: {
			index: {
				type: Number,
				required: false,
				default: 0,
			},
		},
		computed: {
			nowGram() {
				var str: string = this.id.replace("foodstuff", "");
				return store.state.gramArray[Number(str) - 1];
			},
			nowCategory() {
				var str: string = this.id.replace("foodstuff", "");
				return store.state.categoryArray[Number(str) - 1];
			},
			inputValue: {
				get(): Number {
					return this.gram;
				},
				set(gram: Number) {
					this.gram = gram;
					this.$emit("change-gram", gram, this.id.replace("foodstuff", ""));
				},
			},
			id: {
				get(): String {
					return "foodstuff" + this.index;
				},
				set(id: String) {},
			},
			selectFood: {
				get(): string {
					return this.food;
				},
				set(food: string) {
					this.$emit("change-food", food, this.id.replace("foodstuff", ""));
					this.category =
						store.state.categoryArray[
							Number(this.id.replace("foodstuff", "")) - 1
						];
					this.setCategory("auto");
					this.food = food;
				},
			},
		},
		watch: {
			nowGram(val, old) {
				this.gram = val;
			},
			nowCategory(val, old) {
				this.category = val;
			},
			$route: function (to, from) {
				if (to.path !== from.path) {
					this.$emit("category-validation", this.id.replace("foodstuff", ""));
				}
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