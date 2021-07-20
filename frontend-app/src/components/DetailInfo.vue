<template>
	<div class="container">
		<div class="add-product">
			<div class="form">
				<h5>{{ $store.state.type }}</h5>
				<table class="table table-bordered table-hover">
					<tbody>
						<tr v-for="(item, index) in $store.state.foodArray" :key="index">
							<th scope="row">{{ item }}</th>
							<td v-if="$store.state.type == 'カロリー'">
								{{ $store.state.typeArray[index] }} kcal
							</td>
							<td v-else-if="$store.state.type == '材料費'">
								{{ $store.state.typeArray[index] }} 円
							</td>
							<td v-else>{{ $store.state.typeArray[index] }} g</td>
							<td>
								<input
									type="number"
									name="gram"
									required=""
									:value="$store.state.gramArray[index]"
									@change="change(index, $event.target.value)"
								/>
							</td>
						</tr>
						<tr>
							<th scope="row">合計</th>
							<td v-if="$store.state.type == 'カロリー'">
								{{ $store.state.typeTotal }} kcal
							</td>
							<td v-else-if="$store.state.type == '材料費'">
								{{ $store.state.typeTotal }} 円
							</td>
							<td v-else>{{ $store.state.typeTotal }} g</td>
							<td>{{ $store.state.allInfo["gram"] }} g</td>
						</tr>
					</tbody>
				</table>
				<button class="cancel-button" @click="cancel()">Cancel</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";

	export default defineComponent({
		name: "DetailInfo",
		emits: ["detail-form-change", "detail-form-close", "detail-gram-change"],
		computed: {},
		methods: {
			cancel: function () {
				this.$emit("detail-form-close");
			},
			change(id: number, gram: string) {
				this.$emit("detail-gram-change", gram, id + 1);
			},
		},
		watch: {},
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