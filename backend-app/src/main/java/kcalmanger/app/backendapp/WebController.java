package kcalmanger.app.backendapp;

import kcalmanger.app.backendapp.entity.FoodCandidate;
import kcalmanger.app.backendapp.entity.FoodDetails;
import kcalmanger.app.backendapp.entity.RecipeInfo;
import org.eclipse.collections.api.tuple.Pair;
import org.eclipse.collections.impl.tuple.Tuples;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;


@RestController
public class WebController {

	@Autowired
	WebService webService;

	@PostMapping(value = "/api/check")
	@ResponseBody
	@CrossOrigin(origins = {"http://localhost:8081"})
	public List<FoodCandidate> getRecipeInfo(@RequestParam("url") String url) {
		List<FoodCandidate> returnValue = new ArrayList<>();
		try {
			RecipeInfo recipeInfo = webService.getRecipe(url);
			List<Pair<List<FoodDetails>, String>> tempInfo = webService
					.searchFood(new ArrayList<>(webService.convertWord(recipeInfo.getNameList())));
			if (tempInfo.stream().filter(e -> e.getOne().size() > 1 || e.getOne().get(0).getNameKana() == null).count() != 0) {
				for (Pair<List<FoodDetails>, String> value : tempInfo) {
					if (value.getOne().size() > 1) {
						List<String> candidate = new ArrayList<>();
						value.getOne().stream().filter(e -> e.getNameKana() != null).forEach(e -> candidate.add(e.getNameJapanese()));
						returnValue.add(new FoodCandidate(value.getOne().get(0).getNameJapanese(), candidate));
					} else if (value.getOne().get(0).getNameKana() == null) {
						List<String> candidate = new ArrayList<>();
						returnValue.add(new FoodCandidate(value.getOne().get(0).getNameJapanese(), candidate));
					}
				}
			} else {
				//TODO 全ての食材完全一致のケース
				returnValue = null;
			}
			return returnValue;
		} catch (IOException | IllegalArgumentException e) {
			e.printStackTrace();
			return null;
		}
	}

	@PostMapping(value = "/api/calculation")
	@ResponseBody
	@CrossOrigin(origins = {"http://localhost:8081"})
	public Map<String, Object> exportRecipeInfo(@RequestParam("url") String url, @RequestParam("complement") List<String> complement) {
		int indexComplement = 0;
		List<FoodDetails> complementValue = new ArrayList<>();
		List<FoodDetails> foodDatailsList = new ArrayList<>();
		Map<String, Object> returnValue= new LinkedHashMap<>();
		try {
			RecipeInfo recipeInfo = webService.getRecipe(url);
			List<Pair<List<FoodDetails>, String>> tempInfo = webService
					.searchFood(new ArrayList<>(webService.convertWord(recipeInfo.getNameList())));
			List<Pair<List<FoodDetails>, String>> complementInfo = webService
					.searchFood(new ArrayList<>(webService.convertWord(complement)));
			if (tempInfo.stream().filter(e -> e.getOne().size() > 1 || e.getOne().get(0).getNameKana() == null).count() != 0) {
				for (Pair<List<FoodDetails>, String> value : complementInfo) {
					complementValue.add(value.getOne().get(0));
				}
				for (Pair<List<FoodDetails>, String> value : tempInfo) {
					if (value.getOne().size() > 1 || value.getOne().get(0).getNameKana() == null) {
						foodDatailsList.add(complementValue.get(indexComplement));indexComplement++;
					} else {
						foodDatailsList.add(value.getOne().get(0));
					}
				}
			} else {
				for (Pair<List<FoodDetails>, String> value : tempInfo) {
					foodDatailsList.add(value.getOne().get(0));
				}
			}
			List<Double> quantityList = webService.checkQuantity(Tuples.pair(recipeInfo.getQuantityList(), foodDatailsList));
			for (int i = 0; i < foodDatailsList.size(); i++) {
				foodDatailsList.get(i).setGram(quantityList.get(i));
			}
			returnValue.put("food",foodDatailsList);
			returnValue.put("servings_for_yield",recipeInfo.getServings_for_yield());
			return returnValue;
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

}
