<template>
	<div class="mt-5 clearfix">
		<div class="col-md-3 float-left">
			<select v-model="category" @change="selectCategory">
				<option value="1">全選択</option>
				<option
					v-for="(value, index) in categoryName"
					:key="index + 2"
					:value="index + 2"
				>
					{{ value }}
				</option>
			</select>
		</div>
		<div class="col-md-3 float-left">
			<Select2
				v-model="selectFood"
				:options="myOptions"
				:settings="{ settingOption: value, settingOption: value }"
			/>
		</div>
		<div class="col-md-2 float-left">
			<select>
				<option>g</option>
				<option>ml</option>
				<option>カップ</option>
				<option>大さじ</option>
				<option>小さじ</option>
			</select>
		</div>
		<div class="col-md-2 float-left">
			<input type="number" v-model.lazy="inputValue" />
		</div>
		<div class="col-md-2 float-left">
			<button class="btn btn-primary" @click="foodFormOpen">詳細</button>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import jQuery from "jquery";
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
				this.categoryInfo = store.state.categoryInfo[this.category];
				if (
					(this.myOptions.length > 1000 && type == "auto") ||
					type == "manual"
				) {
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
					if (this.myOptions.length > 1000) {
						this.myOptions = this.myOptions.filter((elem) =>
							this.categoryInfo.includes(elem)
						);
					} else {
						this.myOptions = [];
						for (var key in this.categoryInfo) {
							this.myOptions.push(this.categoryInfo[key]);
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
			oldGram: Number;
			gram: Number;
			category: string;
			oldfood: string;
			food: string;
			categoryName: string[];
			categoryInfo: string[];
			foodInfo: {};
			myOptions: string[];
		} {
			return {
				oldGram: 0,
				gram: store.state.gramArray[this.index - 1],
				category: store.state.categoryArray[this.index - 1],
				oldfood: "",
				food: store.state.foodArray[this.index - 1],
				categoryName: store.state.category,
				categoryInfo: [],
				foodInfo: {
					kcal: 0,
					protein: 0,
					fat: 0,
					carbohydrate: 0,
				},
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
			validation: function () {
				jQuery(function ($) {
					$(function () {});
				});
			},
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
					this.oldGram = this.gram;
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
					this.$emit("category-validation", this.id.replace("foodstuff", ""));
					this.foodInfo = store.state.foodInfo[this.food];
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
