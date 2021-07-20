import { createStore } from 'vuex';
import categoryInfoJson from '../assets/categoryInfo.json';
import foodInfoJson from '../assets/foodInfo.json';

interface StringKeyAnyObject {
    [key: string]: any;
}

interface StringKeyNumberObject {
		[key: string]: number;
}
  
interface StringKeyMultiObject {
    [key: string]: number|boolean|string,
}

interface StringKey_StringKeyNumber_Object {
    [key: string]: StringKeyNumberObject;
}

interface StringKeyStringObject {
		[key: string]: string;
}

interface MealInfo {
		[key: string]: StringKeyAnyObject[];
}

const genreEnglish: string[] = [
  "gram",
  "gramPerPiece",
  "nameKana",
  "nameJapanese",
  "price",
  "kcal",
  "protein",
  "carbohydrate",
  "fat",
  "vitaminA",
  "vitaminE",
  "vitaminK",
  "vitaminB1",
  "vitaminB2",
  "vitaminB6",
  "vitaminB12",
  "vitaminC",
  "niacin",
  "pantothenicAcid",
  "folicAcid",
  "sodium",
  "calcium",
  "biotin",
  "potassium",
  "magnesium",
  "manganese",
  "iron",
  "copper",
  "rin",
  "zinc",
  "iodine",
  "chromium",
  "selenium",
  "molybdenum",
  "saltEquivalent",
  "dietaryFiber",
];

const genre: string[] = [
  "材料費",
  "カロリー",
	"タンパク質",
	"炭水化物",
  "脂質",
	"ビタミンA",
  "ビタミンE",
	"ビタミンK",
  "ビタミンB1",
	"ビタミンB2",
  "ビタミンB6",
	"ビタミンB12",
  "ビタミンC",
	"ナイアシン",
  "パントテン酸",
	"葉酸",
  "ナトリウム",
	"カルシウム",
  "ビオチン",
	"カリウム",
  "マグネシウム",
	"マンガン",
  "鉄",
	"銅",
  "リン",
	"亜鉛",
  "ヨウ素",
	"クロム",
  "セレン",
	"モリブデン",
  "食塩相当量",
  "食物繊維 総量",
];

var allInfo: StringKeyNumberObject = {
}
genreEnglish.forEach(
		(elem) => (allInfo[elem] = 0)
);
var foodFormInfo:StringKeyMultiObject = {
      "flag": false,
      "name": "",
      "gram": 0,
    }
genreEnglish.forEach(
		(elem) => (foodFormInfo[elem] = 0)
	);

var recipeinfo: StringKeyMultiObject = {
}
var mealInfo: MealInfo = {
  "2021-07-02-1.朝食": [recipeinfo]
}
const category:
string[] = ["穀類", "野菜", "果物", "いも・でん粉", "砂糖・甘味", "豆・種実", "きのこ", "海藻", "魚介類", "肉", "乳製品・卵", "調味料・香辛料・油", "飲料・酒","主食","おかず・加工食品","おやつ・おつまみ・お菓子"];
const categoryInfo: StringKeyAnyObject = categoryInfoJson;
const foodInfo: StringKey_StringKeyNumber_Object = foodInfoJson;
const allFood = result();
function result() {
  var result = [""];
  for (var i = 0; i < category.length; i++){
    result = result.concat(categoryInfo[i+2]);
  }
  return result
}

var list:string[][] = [[]]

export default createStore({
  state: {
    price: 0,
    gram: 0,
    allInfo: allInfo,
    list: list,
    genre: genre,
    genreEnglish:genreEnglish,
    category: category,
    categoryInfo: categoryInfo,
    foodInfo: foodInfo,
    registerArray: [recipeinfo],
    mealArray: mealInfo,
    recipeArray: [recipeinfo],
    foodArray: [""],
    categoryArray: ["1"],
    gramArray: [0],
    typeArray: [10],
    typeTotal: 0,
    type: "",
    foodFormInfo: foodFormInfo,
    detailFlag: false,
    allFood: allFood,
    responseData: [],
    portion: 1,
    mobile: false,
    dayMealFlag: false,
    registerFlag: false,
    recipeInfoFlag: false,
    events: [
						{ title: "1.朝食", date: "2021-07-02" },
					],
  },
  getters: {
  },
  mutations: {
    initialize: function (state) {
      state.events = [];
      state.mealArray = {};
      state.registerArray = [];
    },
    handleResize: function (state) {
      if (window.innerWidth <= 757) {
				state.mobile = true;
      } else {
        state.mobile = false;
      }
    },
    getDefaultState: function(state) {
      state.price=0;
      state.foodArray=[""];
      state.categoryArray=["1"];
      state.gramArray=[0];
      state.typeArray=[0];
      state.typeTotal=0;
      state.type="";
      state.detailFlag=false;
      state.responseData = [];
      genreEnglish.forEach(
          (elem) => (state.allInfo[elem] = 0)
      );
      console.log(state.allInfo)
    },
    listUpdate: function (state) {
      for (var i = 0; i < state.genre.length; i++) {
        var elemEnglish = state.genreEnglish[i+4];
        if (i % 2 == 0) {
          state.list[Math.floor(i/2)] = []
        }
        if (elemEnglish == "price") {
         state.list[Math.floor(i/2)][i%2]  = state.allInfo[elemEnglish] + "円";
        } else if (elemEnglish == "kcal") {
          state.list[Math.floor(i/2)][i%2] = state.allInfo[elemEnglish] + "kcal";
        } else {
          state.list[Math.floor(i/2)][i%2] = state.allInfo[elemEnglish] + "g";
        }
      }
    },
    setPortion: function (state, payload) {
      var coefficient = payload.portion/state.portion
      state.portion = payload.portion
      state.allInfo["gram"] = Number((state.allInfo["gram"] * coefficient).toFixed(2));
      genreEnglish.forEach(
          (elem) => (allInfo[elem] = 0)
      );
      for (var j = 0; j < state.gramArray.length; j++) {
        state.gramArray[j] = Number((state.gramArray[j]*coefficient).toFixed(2));
        var food = state.foodArray[j];
        var foodInfo = state.foodInfo[food]
        for (var i = 0; i < state.genre.length; i++) {
          if (foodInfo[state.genre[i]] != undefined) {
            state.allInfo[state.genreEnglish[i + 4]] += ((state.gramArray[j] / 100) * foodInfo[state.genre[i]]);
          }
          state.allInfo[state.genreEnglish[i+4]] = Number(state.allInfo[state.genreEnglish[i+4]].toFixed(2));
        }
      }
    },
    searchRecipe: function (state, payload) {
      state.responseData = payload.info["food"];
      state.portion = payload.info["servings_for_yield"];
      state.foodArray = [];
      state.gramArray = [];
      state.categoryArray = [];

      for (var i = 0; i<state.responseData.length; i++) {
        var elem: StringKeyStringObject = state.responseData[i];
        if (elem != undefined) {
          if (elem["gram"] != undefined) {
            state.gramArray.push(Number(elem["gram"]));
            state.allInfo["gram"] += state.gramArray[i];
          } else {
            state.gramArray.push(0);
          }
          if (elem["nameJapanese"] != undefined) {
            state.foodArray.push(elem["nameJapanese"]);
            for (const genre of state.genreEnglish) {
              if (elem[genre] != undefined) {
                state.allInfo[genre] += (state.gramArray[i] / 100) * Number(elem[genre]);
                state.allInfo[genre] = Number(Number(state.allInfo[genre]).toFixed(2));
              }
            }
          } else {
            state.foodArray.push("");
          }
        } else {
          state.foodArray.push("");
          state.gramArray.push(0);
        }
        for (var j = 0; j < category.length; j++){
          if (state.categoryInfo[j+2].includes(state.foodArray[i])) {
            state.categoryArray[i] = String(j+2)
          }
        }
      }
      state.allInfo["gram"] = Number(state.allInfo["gram"].toFixed(2));
    },
    registerMeal: function (state, payload) {
      var index = payload.day+"-"+payload.type
      if (state.mealArray[index] == undefined) {
        state.mealArray[index] = [];
      }
      for (var i = 0; i < state.registerArray.length; i++){
        state.mealArray[index][i] = {}
        Object.assign(state.mealArray[index][i], state.registerArray[i]);
      }
      if (!state.events.includes({ title: payload.type, date: payload.day })) {
        state.events.push({title:payload.type,date:payload.day})
      }
      state.registerArray = [];
    },
    registerRecipe: function (state, payload) {
      var flag = true
      for (const elem of state.foodArray) {
        if (elem == "") {
          flag = false
        }
      }
      if (flag) {
        var gram = state.allInfo["gram"];
        if (state.recipeArray[0]["nameJapanese"] == undefined) {
          genreEnglish.forEach(
            (elem) => (state.recipeArray[0][elem] = Number((state.allInfo[elem]/gram*100).toFixed(2)))
            );
          state.recipeArray[0]["nameJapanese"] = payload.recipename;
        } else {
            state.recipeArray.push({})
            genreEnglish.forEach(
              (elem) => (state.recipeArray[state.recipeArray.length - 1][elem] = Number((state.allInfo[elem]/gram*100).toFixed(2)))
            );
            state.recipeArray[state.recipeArray.length - 1]["nameJapanese"] = payload.recipename;
        }
      } else {
        alert("未選択の欄があります！");
      }
    },
     addRegisterForm: function (state) {
       var flag = true
       for (const elem of state.registerArray) {
        if (elem["nameJapanese"] == undefined) {
          flag = false
        }
       }
       if (flag) {
        state.registerArray.push({});
      } else {
        alert("未選択の欄があります！");
      }
    },
    removeRegisterForm: function (state) {
      if (state.registerArray.length > 1) {
        var formNumber = state.registerArray.length-1
        state.registerArray.splice(formNumber, 1)
      }
    },
    selectRecipe: function (state, payload) {
      Object.assign(state.registerArray[payload.id - 1], state.recipeArray[payload.recipe]);
      genreEnglish.forEach(
        (elem) => {
          if (elem != "nameJapanese") {
            state.registerArray[payload.id - 1][elem] = Number(Number(state.recipeArray[payload.recipe][elem]) / 100 * payload.gram).toFixed(2)
          }
        }
      );
    },
    addFoodForm: function (state) {
      var flag = true
      for (const elem of state.foodArray) {
        if (elem == "") {
          flag = false
        }
      }
      if (flag) {
        state.foodArray.push("");
        state.gramArray.push(0);
        state.categoryArray.push("1");
      } else {
        alert("未選択の欄があります！");
      }
    },
    removeFoodForm: function (state) {
      if (state.foodArray.length > 1) {
        var formNumber = state.foodArray.length-1
        if (state.foodArray[formNumber] != "") {
          var foodInfo =
            state.foodInfo[state.foodArray[formNumber]];
          state.allInfo["gram"] -= state.gramArray[formNumber] * 1;
          for (var i = 0; i < state.genre.length; i++) {
            if (foodInfo[state.genre[i]] != undefined) {
              state.allInfo[state.genreEnglish[i+4]] -=
                (state.gramArray[formNumber] / 100) *
                foodInfo[state.genre[i]];
            }
            state.allInfo[state.genreEnglish[i+4]] = Number(state.allInfo[state.genreEnglish[i+4]].toFixed(2));
          }
          state.allInfo["gram"] = Number(state.allInfo["gram"].toFixed(2));
        }
        state.foodArray.splice(formNumber, 1)
        state.categoryArray.splice(formNumber, 1)
        state.gramArray.splice(formNumber, 1)
      }
    },
    changeFood: function (state, payload) {
      var gram = state.gramArray[Number(payload.id) - 1];
      var oldFood = state.foodArray[Number(payload.id) - 1];
      state.foodArray[Number(payload.id) - 1] = payload.food;
      var foodInfo = state.foodInfo[payload.food]
      if (oldFood != "") {
        var oldFoodInfo = state.foodInfo[oldFood]
        for (var i = 0; i < state.genre.length; i++) {
          if (oldFoodInfo[state.genre[i]] != undefined) {
            state.allInfo[state.genreEnglish[i+4]] -= (gram / 100) * oldFoodInfo[state.genre[i]];
          }
          if (foodInfo[state.genre[i]] != undefined) {
            state.allInfo[state.genreEnglish[i+4]] += (gram / 100) * foodInfo[state.genre[i]];
          }
          state.allInfo[state.genreEnglish[i+4]] = Number(state.allInfo[state.genreEnglish[i+4]].toFixed(2));
        }
        state.allInfo["gram"] = Number(state.allInfo["gram"].toFixed(2));
      } else {
        for (var i = 0; i < state.genre.length; i++) {
          if (foodInfo[state.genre[i]] != undefined) {
            state.allInfo[state.genreEnglish[i+4]] += (gram / 100) * foodInfo[state.genre[i]];
          }
          state.allInfo[state.genreEnglish[i+4]] = Number(state.allInfo[state.genreEnglish[i+4]].toFixed(2));
        }
      }
    },
    changeGram: function (state, payload) {
      var oldGram = state.gramArray[Number(payload.id) - 1];
      state.gramArray[Number(payload.id) - 1] = payload.gram;
      var food = state.foodArray[Number(payload.id) - 1];
      var foodInfo = state.foodInfo[food]
      if (food != "") {
        for (var i = 0; i < state.genre.length; i++) {
          if (foodInfo[state.genre[i]] != undefined) {
            state.allInfo[state.genreEnglish[i+4]] -= (oldGram / 100) * foodInfo[state.genre[i]];
            state.allInfo[state.genreEnglish[i+4]] += (payload.gram / 100) * foodInfo[state.genre[i]];
          }
          state.allInfo[state.genreEnglish[i+4]] = Number(state.allInfo[state.genreEnglish[i+4]].toFixed(2));
        }
      }
      state.allInfo["gram"] -= oldGram;
      state.allInfo["gram"] += Number(payload.gram);
      state.allInfo["gram"] = Number((state.allInfo["gram"]).toFixed(2));
    },
    changeCategory: function (state, payload) {
      var oldGram = state.gramArray[Number(payload.id) - 1];
      state.gramArray[Number(payload.id) - 1] = 0;
      var food = state.foodArray[Number(payload.id) - 1];
      var foodInfo = state.foodInfo[food]
      if (food != "") {
        for (var i = 0; i < state.genre.length; i++) {
          if (foodInfo[state.genre[i]] != undefined) {
            state.allInfo[state.genreEnglish[i+4]] -= (oldGram / 100) * foodInfo[state.genre[i]];
          }
          state.allInfo[state.genreEnglish[i+4]] = Number(state.allInfo[state.genreEnglish[i+4]].toFixed(2));
        }
      }
      state.allInfo["gram"] -= oldGram;
      state.allInfo["gram"] = Number((state.allInfo["gram"]).toFixed(2));
      state.categoryArray[Number(payload.id) - 1] = payload.category
      state.foodArray[Number(payload.id) - 1] = ""
    },
    foodFormOpen: function (state, payload) {
      var id = Number(payload.id)
      if (state.foodArray[id - 1] != "") {
        state.foodFormInfo["name"] = state.foodArray[id - 1]
        var foodInfo = state.foodInfo[state.foodArray[id - 1]]
        state.foodFormInfo["gram"] = state.gramArray[id - 1];
        for (var i = 0; i < state.genre.length; i++) {
          if (foodInfo[state.genre[i]] != undefined) {
            state.foodFormInfo[state.genreEnglish[i+4]] = Number((foodInfo[state.genre[i]] * (state.gramArray[id - 1] / 100)).toFixed(2));
          } else {
            state.foodFormInfo[state.genreEnglish[i+4]] = 0;
          }
        }
      }
    },
    foodFormChange: function (state) {
      state.foodFormInfo["flag"] = !state.foodFormInfo["flag"]
    },
    detailFormOpen: function (state, payload) {
      state.typeArray = [];
      state.typeTotal = 0
      state.type = payload.type;
      for (let i = 0; i < state.foodArray.length; ++i) {
        var foodInfo = state.foodInfo[state.foodArray[i]]
        if (foodInfo != undefined) {
          if (foodInfo[payload.type] != undefined) {
            state.typeArray.push(Number((foodInfo[payload.type] * (state.gramArray[i] / 100)).toFixed(2)))
            state.typeTotal += state.typeArray[i]
          } else {
            state.typeArray.push(0)
          }
        } else {
          state.typeArray.push(0)
        }
      }
      state.typeTotal = Number((state.typeTotal).toFixed(2));
    },
    detailFormChange: function (state) {
      state.detailFlag = !state.detailFlag
    },
    detailGramChange: function (state, payload) {
      var id = payload.id - 1
      var foodInfo = state.foodInfo[state.foodArray[id]]
      state.typeTotal -= state.typeArray[id]
      state.typeArray[id] = (Number((foodInfo[state.type] * (payload.gram / 100)).toFixed(2)))
      state.typeTotal += state.typeArray[id]
      state.typeTotal = Number((state.typeTotal).toFixed(2));
    },
    categoryValidation: function (state, payload) {
      if (state.categoryArray[payload.id - 1] == "1") {
        for (var i = 0; i < category.length; i++){
          if (state.categoryInfo[i+2].includes(state.foodArray[payload.id - 1])) {
            state.categoryArray[payload.id - 1] = String(i+2)
          }
        }
      }
    },
    dayMealInfoFormChange: function (state, payload) {
      state.dayMealFlag = !state.dayMealFlag;
    },
    registerFormChange: function (state, payload) {
      state.registerFlag = !state.registerFlag;
    },
    recipeInfoOpen: function (state, payload) {
      var recipe = state.recipeArray[payload.recipe-1];
      genreEnglish.forEach(
        (elem) => (
          state.allInfo[elem] = Number((Number(recipe[elem])/100*payload.gram).toFixed(2)))
            );
      state.recipeInfoFlag = !state.recipeInfoFlag;
    },
    recipeInfoClose: function (state, payload) {
      state.recipeInfoFlag = !state.recipeInfoFlag;
    },
  },
  actions: {
  },
  modules: {
  },
});
