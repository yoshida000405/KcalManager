<template>
	<div class="result" v-show="!foodFormFlag && !detailFormFlag">
		<div class="text-place clearfix">
			<div class="col-md-12 mt-5 position-relative parent float-left">
				<round-graf></round-graf>
			</div>
		</div>
		<div class="mt-5 clearfix">
			<list @detailFormOpen="detailFormOpen"></list>
		</div>
		<div class="mt-5 clearfix">
			<component
				v-for="item of array"
				:key="item"
				:is="assignTemplate"
				@changeGram="changeGram"
				@changeFood="changeFood"
				@changeCategory="changeCategory"
				@foodFormOpen="foodFormOpen"
				@categoryValidation="categoryValidation"
				v-bind="{ index: item }"
			>
			</component>
		</div>
		<div class="mt-5 mb-5 text-right mr-5">
			<button class="btn btn-success btn-lg mr-5" @click="register">
				登録
			</button>
			<button class="btn btn-primary btn-lg mr-5" @click="addForm">追加</button>
			<button class="btn btn-secondary btn-lg mr-5" @click="removeForm">
				削除
			</button>
		</div>
	</div>
	<food-info
		v-show="foodFormFlag"
		@changeGram="changeGram"
		@foodFormChange="foodFormChange"
		@foodFormClose="foodFormClose"
		v-bind="{
			id: productData['id'],
			foodname: productData['foodname'],
			price: productData['price'],
			gram: Number(productData['gram']),
			kcal: productData['kcal'],
			prortein: productData['protein'],
			fat: productData['fat'],
			carbohydrate: productData['carbohydrate'],
			vitaminA: Number(productData['vitaminA']),
			vitaminB1: productData['vitaminB1'],
			vitaminB2: productData['vitaminB2'],
			vitaminB6: productData['vitaminB6'],
			vitaminB12: productData['vitaminB12'],
		}"
	></food-info>
	<detail-info
		v-show="detailFormFlag"
		@detailGramChange="detailGramChange"
		@detailFormChange="detailFormChange"
		@detailFormClose="detailFormClose"
	></detail-info>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import Foodstuff from "@/components/Foodstuff.vue";
	import RoundGraf from "@/components/RoundGraf.vue";
	import List from "@/components/List.vue";
	import jQuery from "jquery";
	import store from "../store/index";
	import FoodInfo from "@/components/FoodInfo.vue";
	import DetailInfo from "@/components/DetailInfo.vue";

	interface FoodInfo {
		[key: string]: number;
	}

	export default defineComponent({
		name: "Result",
		components: {
			Foodstuff,
			RoundGraf,
			List,
			FoodInfo,
			DetailInfo,
		},
		data(): {
			foodFormFlag: any;
			detailFormFlag: boolean;
			type: string;
			gramArray: number[];
			totalGram: number;
			totalKcal: number;
			totalProtein: number;
			totalFat: number;
			totalCarbohydrate: number;
			totalVitaminA: number;
			totalVitaminB1: number;
			totalVitaminB2: number;
			totalVitaminB6: number;
			totalVitaminB12: number;
			assignTemplate: String;
			foodArray: string[];
			array: number[];
			productData: {
				id: number;
				foodname: string;
				price: number;
				gram: number;
				kcal: number;
				protein: number;
				fat: number;
				carbohydrate: number;
				vitaminA: number;
				vitaminB1: number;
				vitaminB2: number;
				vitaminB6: number;
				vitaminB12: number;
			};
		} {
			return {
				foodFormFlag: false,
				detailFormFlag: false,
				type: "",
				gramArray: [0],
				totalGram: 0,
				totalKcal: 0,
				totalProtein: 0,
				totalFat: 0,
				totalCarbohydrate: 0,
				totalVitaminA: 0,
				totalVitaminB1: 0,
				totalVitaminB2: 0,
				totalVitaminB6: 0,
				totalVitaminB12: 0,
				assignTemplate: "foodstuff",
				foodArray: [""],
				array: store.state.formArray,
				productData: {
					id: 0,
					foodname: "",
					price: 0,
					gram: 0,
					kcal: 0,
					protein: 0,
					fat: 0,
					carbohydrate: 0,
					vitaminA: 0,
					vitaminB1: 0,
					vitaminB2: 0,
					vitaminB6: 0,
					vitaminB12: 0,
				},
			};
		},
		methods: {
			register() {
				var recipename = window.prompt("レシピ名を入力してください", "");
				if (recipename != "") {
					store.commit("register", { recipename });
				}
			},
			foodFormOpen(id: string) {
				if (store.state.foodArray[Number(id) - 1] != "") {
					store.commit("foodFormOpen", { id });
					this.productData["id"] = Number(id);
					store.commit("foodFormChange");
				} else {
					alert("食材を選択してください！");
				}
			},
			foodFormClose() {
				store.commit("foodFormChange");
			},
			foodFormChange(id: string) {
				store.commit("foodFormOpen", { id });
			},
			changeFood(food: string, id: string) {
				store.commit("changeFood", { food, id });
				store.commit("categoryValidation", { id });
				store.commit("listUpdate");
			},
			changeGram(gram: number, id: string) {
				store.commit("changeGram", { gram, id });
				store.commit("listUpdate");
			},
			changeCategory(category: number, id: string, type: string) {
				store.commit("changeCategory", { category, id, type });
				store.commit("listUpdate");
			},
			addForm() {
				store.commit("addForm");
			},
			removeForm() {
				store.commit("removeForm");
				store.commit("listUpdate");
			},
			detailFormOpen(type: string) {
				this.type = type;
				store.commit("detailFormOpen", { type });
				store.commit("detailFormChange");
			},
			detailFormClose() {
				store.commit("detailFormChange");
			},
			detailGramChange(gram: number, id: number) {
				store.commit("detailGramChange", { type: this.type, gram: gram, id: id });
				store.commit("changeGram", { gram, id });
				store.commit("listUpdate");
			},
			categoryValidation(id: number) {
				store.commit("categoryValidation", { id });
			},
		},
		mounted: function () {
			jQuery(function ($) {
				var biggestHeight: number | undefined = $("#doughnutChart").height();
				if (biggestHeight != undefined) {
					$(".parent").height(biggestHeight);
				}
			});
		},
		computed: {
			foodFlag() {
				return store.state.foodFormInfo["flag"];
			},
			detailFlag() {
				return store.state.detailFlag;
			},
		},
		watch: {
			foodFlag(val, old) {
				this.foodFormFlag = store.state.foodFormInfo["flag"];
			},
			detailFlag(val, old) {
				this.detailFormFlag = store.state.detailFlag;
			},
			$route: function (to, from) {
				if (to.path !== from.path) {
					store.commit("getDefaultState");
					console.log("route");
				}
			},
		},
	});
</script>
