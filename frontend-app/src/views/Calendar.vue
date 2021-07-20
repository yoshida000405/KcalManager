<template>
	<div
		class="mr-4 ml-4 mb-4"
		v-if="
			!$store.state.dayMealFlag &&
			!$store.state.registerFlag &&
			!$store.state.recipeInfoFlag
		"
	>
		<FullCalendar :options="calendarOptions" />
	</div>
	<div v-if="$store.state.dayMealFlag">
		<h4>{{ this.day }}</h4>
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
				<tr v-for="index of $store.state.mealArray[day].length" :key="index">
					<th scope="row">
						{{ index }}
					</th>
					<td>{{ $store.state.mealArray[day][index - 1]["nameJapanese"] }}</td>
					<td>{{ $store.state.mealArray[day][index - 1]["kcal"] }}</td>
					<td>{{ $store.state.mealArray[day][index - 1]["gram"] }}</td>
					<td>{{ $store.state.mealArray[day][index - 1][this.elem] }}</td>
				</tr>
			</tbody>
		</table>
		<button class="cancel-button" @click="cancelMealInfo()">Cancel</button>
	</div>
	<div v-show="$store.state.registerFlag">
		<div class="mt-5 clearfix">
			<div class="col-md-4 float-left">
				<h5>登録日</h5>
			</div>
			<div class="col-md-2 float-left">
				<datepicker :language="ja" v-model="registerDay" />
			</div>
			<div class="col-md-4 float-left">
				<h5>種別</h5>
			</div>
			<div class="col-md-2 float-left">
				<select v-model="type">
					<option value="1.朝食">朝食</option>
					<option value="2.昼食">昼食</option>
					<option value="3.夕食">夕食</option>
				</select>
			</div>
		</div>
		<div class="mt-5 clearfix">
			<component
				v-for="(item, i) of $store.state.registerArray"
				:key="item"
				:is="assignTemplate"
				v-bind="{ num: i + 1 }"
				@selectRecipe="selectRecipe"
				@recipeInfoOpen="recipeInfoOpen"
				@registerFormClose="registerFormClose"
			>
			</component>
		</div>
		<div class="mt-5 clearfix">
			<div class="col-md-12 mt-5 mb-5 text-center float-left">
				<button class="btn btn-success btn-lg mr-5 ml-5" @click="register">
					登録
				</button>
				<button class="btn btn-primary btn-lg mr-5 ml-5" @click="addForm">
					追加
				</button>
				<button class="btn btn-secondary btn-lg mr-5 ml-5" @click="removeForm">
					削除
				</button>
			</div>
		</div>
		<button class="cancel-button" @click="cancelRegisterForm()">Cancel</button>
	</div>
	<div v-show="$store.state.recipeInfoFlag">
		<div class="text-place clearfix">
			<div
				id="round-graf"
				class="col-md-12 mt-5 position-relative parent float-left"
			>
				<round-graf></round-graf>
			</div>
		</div>
		<div class="mt-5 clearfix">
			<list @detailFormOpen="detailFormOpen"></list>
		</div>
		<button class="cancel-button mt-5" @click="recipeInfoClose">Cancel</button>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import store from "../store/index";
	import RegisterForm from "@/components/RegisterForm.vue";
	import "@fullcalendar/core/vdom"; // solves problem with Vite
	import FullCalendar from "@fullcalendar/vue3";
	import dayGridPlugin from "@fullcalendar/daygrid";
	import interactionPlugin from "@fullcalendar/interaction";
	import Datepicker from "../../node_modules/vue3-datepicker/src/datepicker/Datepicker.vue";
	import RoundGraf from "@/components/RoundGraf.vue";
	import List from "@/components/List.vue";
	import jQuery from "jquery";

	export default defineComponent({
		name: "Calendar",
		components: {
			FullCalendar,
			Datepicker,
			RegisterForm,
			RoundGraf,
			List,
		},
		data(): {
			elem: string;
			calendarOptions: {};
			day: string;
			registerDay: any;
			type: string;
			assignTemplate: String;
			list: number[];
		} {
			return {
				elem: "protein",
				calendarOptions: {
					plugins: [dayGridPlugin, interactionPlugin],
					initialView: "dayGridMonth",
					dateClick: this.handleDateClick,
					eventClick: this.handleEventClick,
					events: store.state.events,
				},
				day: "",
				registerDay: new Date(),
				type: "1.朝食",
				assignTemplate: "register-form",
				list: [],
			};
		},
		computed: {},
		methods: {
			window: (onload = function () {
				store.commit("initialize");
			}),
			handleDateClick: function (arg: any) {
				this.registerDay = new Date(arg.dateStr + "T00:00:00");
				store.commit("registerFormChange");
			},
			cancelRegisterForm: function () {
				store.commit("registerFormChange");
			},
			handleEventClick: function (arg: any) {
				this.day = arg.event.startStr + "-" + arg.event.title;
				store.commit("dayMealInfoFormChange");
			},
			cancelMealInfo: function () {
				store.commit("dayMealInfoFormChange");
			},
			register() {
				if (this.registerDay != "") {
					if (store.state.registerArray[0]["nameJapanese"] != undefined) {
						const words = String(this.registerDay).split(" ");
						var month;
						switch (words[1]) {
							case "Jan":
								month = "01";
								break;
							case "Feb":
								month = "02";
								break;
							case "Mar":
								month = "03";
								break;
							case "Apr":
								month = "04";
								break;
							case "May":
								month = "05";
								break;
							case "Jun":
								month = "06";
								break;
							case "Jul":
								month = "07";
								break;
							case "Aug":
								month = "08";
								break;
							case "Sep":
								month = "09";
								break;
							case "Oct":
								month = "10";
								break;
							case "Nov":
								month = "11";
								break;
							case "Dec":
								month = "12";
								break;
						}
						this.day = words[3] + "-" + month + "-" + words[2];
						store.commit("registerMeal", { day: this.day, type: this.type });
						store.commit("registerFormChange");
					} else {
						alert("献立を追加してください！");
					}
				} else {
					alert("日付を入力してください！");
				}
			},
			addForm() {
				store.commit("addRegisterForm");
			},
			removeForm() {
				store.commit("removeRegisterForm");
			},
			selectRecipe: function (id: number, recipe: number, gram: number) {
				store.commit("selectRecipe", { id, recipe, gram });
				store.commit("listUpdate");
			},
			recipeInfoOpen: function (recipe: number, gram: number) {
				store.commit("recipeInfoOpen", { recipe, gram });
				store.commit("registerFormChange");
				store.commit("listUpdate");
			},
			recipeInfoClose: function () {
				store.commit("recipeInfoClose");
				store.commit("registerFormChange");
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


<style lang="scss">
	.cancel-button {
		display: block;
		background-color: #41494e;
		height: 40px;
		border-radius: 20px;
		line-height: 36px;
		text-align: center;
		color: #fff;
		text-transform: uppercase;
		font-size: 0.875em;
		border: none;
		font-weight: 700;
		padding: 0 34px;
		margin: 30px auto;
		img {
			position: relative;
			top: 3px;
			right: 6px;
		}
		&:hover {
			background-color: darken(#3498db, 10%);
			cursor: pointer;
		}
	}
</style>