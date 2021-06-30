<template>
	<div class="search">
		<input v-show="!selectFlag" v-model.lazy="setText" />
		<div v-show="selectFlag">
			<div>
				<h4>特定できない食材情報を補足してください！</h4>
			</div>
			<div
				class="mt-5 clearfix"
				v-for="(item, index1) in nameList"
				:key="index1"
			>
				<div class="col-md-5 float-left">
					<h4>{{ item }}</h4>
				</div>
				<div class="col-md-7 float-left">
					<div class="col-md-4 float-left">
						.
						<div
							class="mt-1 clearfix"
							v-for="(item, index2) in candidateList[index1]"
							:key="index2"
						>
							<label>
								<input
									v-show="candidateList[index1].length != 0"
									type="radio"
									:value="item"
									v-model="valueList[index1]"
								/>
								{{ item }}
							</label>
						</div>
					</div>
					<div class="col-md-8 float-left">
						.
						<Select2
							v-model="valueList[index1]"
							:options="myOptions"
							:settings="{ settingOption: value, settingOption: value }"
						/>
					</div>
				</div>
			</div>
			<div class="mt-5 col-md-7 float-left">.</div>
			<div class="mt-5 col-md-5 float-left">
				<button class="btn btn-primary" @click="decision">決定</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import store from "../store/index";
	import axios from "axios";
	import RoundGraf from "@/components/RoundGraf.vue";

	interface responData {
		name: string;
		candidate: string[];
	}

	export default defineComponent({
		name: "Search",
		components: {
			RoundGraf,
		},
		data(): {
			array: any;
			url: string;
			selectFlag: boolean;
			info: responData[];
			nameList: string[];
			valueList: string[];
			candidateList: string[][];
			myOptions: string[];
		} {
			return {
				array: store.state.recipeArray,
				url: "",
				selectFlag: false,
				info: [{ name: "塩", candidate: ["梅塩", "塩麹"] }],
				nameList: ["合挽き肉", "塩"],
				valueList: ["その他", "その他"],
				candidateList: [["その他"], ["梅塩", "塩麹", "その他"]],
				myOptions: store.state.allFood,
			};
		},
		computed: {
			setText: {
				get(): string {
					return this.url;
				},
				set(url: string) {
					if (url != "") {
						var index = 0;
						let params = new URLSearchParams();
						params.append("url", url);
						axios.post("/api/check", params).then((res) => {
							this.info = res.data;
							if (this.info[0] != undefined) {
								this.nameList = [];
								this.candidateList = [];
								this.valueList = [];
								for (var elem of this.info) {
									this.nameList.push(elem["name"]);
									this.candidateList.push(elem["candidate"]);
									if (this.candidateList[index][0] == undefined) {
										this.valueList.push("きび");
									} else {
										this.valueList.push(this.candidateList[index][0]);
									}
									index++;
								}
								this.selectFlag = true;
								this.url = url;
							} else {
								alert("レシピが見つかりませんでした！");
							}
						});
					}
				},
			},
		},
		methods: {
			decision: function () {
				var result = window.confirm("決定してもよろしいでしょうか？");
				if (result) {
					console.log(this.url);
					let params = new URLSearchParams();
					params.append("url", this.url);
					for (var elem of this.valueList) {
						params.append("complement", elem);
					}
					axios.post("/api/calculation", params).then((res) => {
						this.info = res.data;
						store.commit("searchRecipe", { info: this.info });
						store.commit("listUpdate");
						this.selectFlag = false;
						this.$router.push("result");
					});
				}
			},
		},
		watch: {
			$route: function (to, from) {
				if (to.path !== from.path) {
					store.commit("listUpdate");
				}
			},
		},
	});
</script>
