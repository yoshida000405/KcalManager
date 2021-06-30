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

const category:
string[] = ["穀類", "野菜", "果物", "いも・でん粉", "砂糖・甘味", "豆・種実", "きのこ", "海藻", "魚介類", "肉", "乳製品・卵", "調味料・香辛料・油", "飲料・酒"];
const categoryInfo: StringKeyAnyObject = categoryInfoJson;
const foodInfo: StringKey_StringKeyNumber_Object = foodInfoJson;
const allFood = result();
function result() {
  var result = [""];
  for (var i = 2; i < 15; i++){
    result = result.concat(categoryInfo[i]);
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
    formNumber: 1,
    formArray: [1],
    recipeArray: [""],
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
  },
  getters: {
  },
  mutations: {
    getDefaultState: function(state) {
        state.price=0;
        state.gram=0;
        state.formNumber=1;
        state.formArray=[1];
        state.recipeArray=[""];
        state.foodArray=[""];
        state.categoryArray=["1"];
        state.gramArray=[0];
        state.typeArray=[0];
        state.typeTotal=0;
        state.type="";
        state.detailFlag=false;
        state.responseData = [];
        genreEnglish.forEach(
            (elem) => (allInfo[elem] = 0)
        );
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
      var coefficient = state.portion/payload.portion
      state.portion = payload.portion
      state.gram = Number((state.gram * coefficient).toFixed(2));
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
      state.responseData = payload.info;
      state.foodArray = [];
      state.gramArray = [];
      state.categoryArray = [];
      state.formArray = [];
      state.formNumber = 0;
      for (var i = 0; i<state.responseData.length; i++) {
        var elem: StringKeyStringObject = state.responseData[i];
        state.formNumber++;
        state.formArray.push(state.formNumber)
        if (elem != undefined) {
          if (elem["gram"] != undefined) {
            state.gramArray.push(Number(elem["gram"]));
            state.gram += state.gramArray[i];
          } else {
            state.gramArray.push(0);
          }
          if (elem["nameJapanese"] != undefined) {
            state.foodArray.push(elem["nameJapanese"]);
            var foodInfo = state.foodInfo[state.foodArray[i]]
            for (const genre of state.genreEnglish) {
              if (elem[genre] != undefined) {
                state.allInfo[genre] += (state.gramArray[i] / 100) * Number(elem[genre]);
                state.allInfo[genre] = Number(Number(state.allInfo[genre]).toFixed(2));
              } else {
                state.allInfo[genre] += 0;
              }
            }
          } else {
            state.foodArray.push("");
            for (const genre of state.genreEnglish) {
              state.allInfo[genre] += 0;
            }
          }
        } else {
          state.foodArray.push("");
          state.gramArray.push(0);
          for (const genre of state.genreEnglish) {
            state.allInfo[genre] += 0;
          }
        }
        for (var j = 2; j < 15; j++){
          if (state.categoryInfo[j].includes(state.foodArray[i])) {
            state.categoryArray[i] = String(j)
          }
        }
      }
      state.gram = Number(state.gram.toFixed(2));
    },
    register: function (state, payload) {
      if (state.recipeArray[0] == "") {
        state.recipeArray[0] = payload.recipename
      } else {
        state.recipeArray.push(payload.recipename)
      }
    },
    addForm: function (state) {
      var flag = true
      for (const elem of state.foodArray) {
        if (elem == "") {
          flag = false
        }
      }
      if (flag) {
        state.foodArray.push("");
        state.gramArray.push(0);
        state.formNumber++;
        state.formArray.push(state.formNumber)
      } else {
        alert("未選択の欄があります！");
      }
    },
    removeForm: function (state) {
      if (state.formNumber > 1) {
        state.formNumber--;
        if (state.foodArray[state.formNumber] != "") {
          var foodInfo =
            state.foodInfo[state.foodArray[state.formNumber]];
          state.gram -= state.gramArray[state.formNumber] * 1;
          for (var i = 0; i < state.genre.length; i++) {
            if (foodInfo[state.genre[i]] != undefined) {
              state.allInfo[state.genreEnglish[i+4]] -=
                (state.gramArray[state.formNumber] / 100) *
                foodInfo[state.genre[i]];
            }
            state.allInfo[state.genreEnglish[i+4]] = Number(state.allInfo[state.genreEnglish[i+4]].toFixed(2));
          }
          state.gram = Number(state.gram.toFixed(2));
        }
        state.formArray.splice(state.formNumber, 1)
        state.foodArray.splice(state.formNumber, 1)
        state.categoryArray.splice(state.formNumber, 1)
        state.gramArray.splice(state.formNumber, 1)
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
        state.gram = Number(state.gram.toFixed(2));
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
      state.gram -= oldGram;
      state.gram += Number(payload.gram);
      state.gram = Number((state.gram).toFixed(2));
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
      state.gram -= oldGram;
      state.gram = Number((state.gram).toFixed(2));
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
        for (var i = 2; i < 15; i++){
          if (state.categoryInfo[i].includes(state.foodArray[payload.id - 1])) {
            state.categoryArray[payload.id - 1] = String(i)
          }
        }
      }
    },
  },
  actions: {
  },
  modules: {
  },
});
