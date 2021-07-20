<template>
	<div class="containers">
		<div class="add-products">
			<div class="form">
				<div class="form--field -short">
					<label>{{ $store.state.foodFormInfo["name"] }}</label>
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
				<div v-if="$store.state.mobile == false">
					<div
						v-for="index of Math.floor($store.state.genre.length / 3)"
						:key="index"
						class="form--container -inline mt-3"
					>
						<div class="form--field -short">
							<label>{{ $store.state.genre[(index - 1) * 3] }}</label>
							{{
								$store.state.foodFormInfo[
									$store.state.genreEnglish[4 + (index - 1) * 3]
								]
							}}
						</div>
						<div class="form--field -short">
							<label>{{ $store.state.genre[(index - 1) * 3 + 1] }}</label>
							{{
								$store.state.foodFormInfo[
									$store.state.genreEnglish[5 + (index - 1) * 3]
								]
							}}
						</div>
						<div class="form--field -short">
							<label>{{ $store.state.genre[(index - 1) * 3 + 2] }}</label>
							{{
								$store.state.foodFormInfo[
									$store.state.genreEnglish[6 + (index - 1) * 3]
								]
							}}
						</div>
					</div>
				</div>
				<div v-if="$store.state.mobile == true">
					<div
						v-for="index of Math.floor($store.state.genre.length / 2)"
						:key="index"
						class="form--containers -inline mt-3"
					>
						<div class="form--field -shorts">
							<label>{{ $store.state.genre[(index - 1) * 2] }}</label>
							{{
								$store.state.foodFormInfo[
									$store.state.genreEnglish[4 + (index - 1) * 2]
								]
							}}
						</div>
						<div class="form--field -shorts">
							<label>{{ $store.state.genre[(index - 1) * 2 + 1] }}</label>
							{{
								$store.state.foodFormInfo[
									$store.state.genreEnglish[5 + (index - 1) * 2]
								]
							}}
						</div>
					</div>
				</div>
				<button class="cancel-button" @click="cancel()">Cancel</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import store from "../store/index";

	export default defineComponent({
		name: "FoodInfo",
		emits: [
			"food-form-change",
			"food-form-close",
			"change-gram",
			"handle-resize",
		],
		props: {
			id: {
				type: Number,
				required: false,
				default: 0,
			},
		},
		data(): {
			gram: any;
			genre: string;
			mobile: boolean;
		} {
			return {
				gram: store.state.foodFormInfo["gram"],
				genre: "protein",
				mobile: false,
			};
		},
		computed: {
			inputGram: {
				get() {
					return store.state.foodFormInfo["gram"];
				},
				set(gram: number) {
					this.change(gram);
				},
			},
		},
		methods: {
			cancel: function () {
				this.$emit("food-form-close");
			},
			change: function (gram: number) {
				this.$emit("change-gram", gram, this.id);
				this.$emit("food-form-change", this.id);
			},
			handleResize: function () {
				this.$emit("handle-resize");
			},
		},
		mounted: function () {
			window.addEventListener("resize", this.handleResize);
		},
		beforeDestroy: function () {
			window.removeEventListener("resize", this.handleResize);
		},
	});
</script>

<style lang="scss">
	.containers {
		display: flex;
		width: 100%;
		height: 100%;
		justify-content: center;
		align-items: center;
	}

	.add-products {
		background-color: #fafafa;
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
		font-size: 14px;
		font-weight: bold;
		user-select: none;
		text-align: center;
	}

	.form--field {
		width: 420px;
		margin: 10px auto;
		&.-short {
			width: 120px;
		}
		&.-shorts {
			width: 45%;
			margin: 0;
			padding: 0;
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

	.form--containers {
		width: 420px;
		margin: 0px auto;
		&.-inline {
			display: flex;
			flex-direction: row;
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