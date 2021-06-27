<template>
	<div class="container">
		<div class="add-product">
			<div class="form">
				<div class="form--field">
					<label>{{ this.foodFormInfo["name"] }}</label>
				</div>
				<div class="form--container -inline">
					<div class="form--field -short">
						<label>価格</label>
						<input
							type="text"
							class="form--element"
							name="price"
							required=""
							v-model="this.foodFormInfo['price']"
							disabled
						/>
					</div>
					<div class="form--field -short">
						<label>カロリー</label>
						<input
							type="text"
							class="form--element"
							name="kcal"
							required=""
							v-model="this.foodFormInfo['kcal']"
							disabled
						/>
					</div>
					<div class="form--field -short">
						<label>使用料</label>
						<input
							type="number"
							class="form--element"
							name="gram"
							required=""
							v-model.lazy="inputGram"
						/>
					</div>
				</div>
				<div class="form--container -inline">
					<div class="form--field -short">
						<label>タンパク質</label>
						<input
							type="text"
							class="form--element"
							name="protein"
							required=""
							v-model="this.foodFormInfo['protein']"
							disabled
						/>
					</div>
					<div class="form--field -short">
						<label>脂質</label>
						<input
							type="text"
							class="form--element"
							name="fat"
							required=""
							v-model="this.foodFormInfo['fat']"
							disabled
						/>
					</div>
					<div class="form--field -short">
						<label>炭水化物</label>
						<input
							type="text"
							class="form--element"
							name="carbohydrate"
							required=""
							v-model="this.foodFormInfo['carbohydrate']"
							disabled
						/>
					</div>
				</div>
				<div class="form--container -inline">
					<div class="form--field -short">
						<label>ビタミンA</label>
						<input
							type="text"
							class="form--element"
							name="vitaminA"
							required=""
							v-model="this.foodFormInfo['vitaminA']"
							disabled
						/>
					</div>
					<div class="form--field -short">
						<label>ビタミンB1</label>
						<input
							type="text"
							class="form--element"
							name="vitaminB1"
							required=""
							v-model="this.foodFormInfo['vitaminB1']"
							disabled
						/>
					</div>
					<div class="form--field -short">
						<label>ビタミンB2</label>
						<input
							type="text"
							class="form--element"
							name="vitaminB2"
							required=""
							v-model="this.foodFormInfo['vitaminB2']"
							disabled
						/>
					</div>
				</div>
				<div class="form--container -inline">
					<div class="form--field -short">
						<label>ビタミンB6</label>
						<input
							type="text"
							class="form--element"
							name="vitaminB6"
							required=""
							v-model="this.foodFormInfo['vitaminB6']"
							disabled
						/>
					</div>
					<div class="form--field -short">
						<label>ビタミンB12</label>
						<input
							type="text"
							class="form--element"
							name="vitaminB12"
							required=""
							v-model="this.foodFormInfo['vitaminB12']"
							disabled
						/>
					</div>
					<div class="form--field -short">
						<label>ビタミンB2</label>
						<input
							type="text"
							class="form--element"
							name="vitaminB2"
							required=""
							v-model="this.foodFormInfo['vitaminB2']"
							disabled
						/>
					</div>
				</div>
				<button class="cancel-button" @click="cancel()">Cancel</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import jQuery from "jquery";
	import store from "../store/index";

	interface FoodFormInfo {
		[key: string]: number | boolean | string;
	}

	export default defineComponent({
		name: "FoodInfo",
		emits: ["food-form-change", "food-form-close", "change-gram"],
		props: {
			id: {
				type: Number,
				required: false,
				default: 0,
			},
		},
		data(): {
			oldGram: any;
			foodFormInfo: FoodFormInfo;
			firstFlag: number;
		} {
			return {
				oldGram: 0,
				foodFormInfo: store.state.foodFormInfo,
				firstFlag: 0,
			};
		},
		computed: {
			inputGram: {
				get() {
					if (this.firstFlag == 0) {
						this.foodFormInfo = store.state.foodFormInfo;
					}
					return store.state.foodFormInfo["gram"];
				},
				set(gram: number) {
					if (this.firstFlag == 0) {
						this.firstFlag = 1;
					}
					this.oldGram = store.state.foodFormInfo["gram"];
					this.change(gram);
				},
			},
			flag() {
				return store.state.foodFormInfo["flag"];
			},
			value() {
				var num: number = this.id;
				return store.state.foodFormInfo;
			},
		},
		methods: {
			cancel: function () {
				this.firstFlag = 0;
				this.$emit("food-form-close");
			},
			change: function (gram: number) {
				this.$emit("change-gram", gram, this.id);
				this.$emit("food-form-change", this.id);
			},
		},
		watch: {
			flag(val, old) {
				this.foodFormInfo = store.state.foodFormInfo;
			},
			value(val, old) {
				this.foodFormInfo = val;
			},
		},
	});
</script>

<style lang="scss">
	.container {
		display: flex;
		width: 100%;
		height: 100%;
		justify-content: center;
		align-items: center;
	}

	.add-product {
		background-color: #fafafa;
		padding: 18px 32px;
		border-radius: 5px;
		width: 80%;
		height: 100%;
		cursor: default;
		form {
			opacity: 1;
			transition: opacity 0.1s ease;
			transition-delay: 0.3s;
			height: auto;
		}
	}

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

	.featured-note {
		color: #949494;
		font-size: 12px;
		margin: 4px 0px;
		line-height: 18px;
		font-style: italic;
	}

	.form * {
		outline: none;
	}

	label {
		display: block;
		font-size: 14px;
		font-weight: bold;
		user-select: none;
		&.emoji {
			input {
				-webkit-appearance: none;
				-moz-appearance: none;
				appearance: none;
				height: 21px;
				margin: 0;
				display: none;
				& + span:after {
					content: "😶";
					font-size: 18px;
					top: 2px;
					left: 2px;
					position: relative;
					height: 18px;
					display: inline-block;
				}
				&:checked + span:after {
					content: "😀";
				}
			}
		}
	}

	.form--field {
		width: 420px;
		margin: 10px auto;
		&.-short {
			width: 120px;
		}
	}

	.form--price {
		position: absolute;
		line-height: 38px;
		width: 16px;
		color: #c7c7c7;
		text-align: center;
		margin: 0px auto;
		& + input {
			padding-left: 14px;
		}
	}

	.form--container {
		width: 420px;
		margin: 0px auto;
		&.-inline {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			margin-bottom: -12px;
		}
	}

	.form--element {
		background-color: #fff;
		border: 1px solid #ececec;
		border-radius: 3px;
		font-size: 14px;
		line-height: 28px;
		padding: 0 4px;
		color: #3d3d3d;
		width: 100%;
		margin: 4px auto;
		box-sizing: border-box;
		font-family: "Open Sans", sans-serif;
		&:focus {
			border: 1px solid #ffc145;
			border-radius: 2px;
		}
		&:not(.texteare) {
			height: 30px;
		}
		&.textarea {
			height: 80px;
			resize: none;
		}
	}
</style>