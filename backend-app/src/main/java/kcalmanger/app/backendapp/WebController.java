package kcalmanger.app.backendapp;

import kcalmanger.app.backendapp.entity.FoodCandidate;
import kcalmanger.app.backendapp.entity.FoodDetails;
import org.eclipse.collections.api.tuple.Pair;
import org.eclipse.collections.impl.tuple.Tuples;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


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
			Pair<List<String>, List<String>> recipeInfo = webService.getRecipe(url);
			List<Pair<List<FoodDetails>, String>> tempInfo = webService
					.searchFood(new ArrayList<>(webService.convertWord(recipeInfo.getOne())));
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
	public List<FoodDetails> exportRecipeInfo(@RequestParam("url") String url, @RequestParam("complement") List<String> complement) {
		int indexComplement = 0;
		List<FoodDetails> complementValue = new ArrayList<>();
		List<FoodDetails> returnValue = new ArrayList<>();
		try {
			Pair<List<String>, List<String>> recipeInfo = webService.getRecipe(url);
			List<Pair<List<FoodDetails>, String>> tempInfo = webService
					.searchFood(new ArrayList<>(webService.convertWord(recipeInfo.getOne())));
			List<Pair<List<FoodDetails>, String>> complementInfo = webService
					.searchFood(new ArrayList<>(webService.convertWord(complement)));
			if (tempInfo.stream().filter(e -> e.getOne().size() > 1 || e.getOne().get(0).getNameKana() == null).count() != 0) {
				for (Pair<List<FoodDetails>, String> value : complementInfo) {
					complementValue.add(value.getOne().get(0));
				}
				for (Pair<List<FoodDetails>, String> value : tempInfo) {
					if (value.getOne().size() > 1 || value.getOne().get(0).getNameKana() == null) {
						returnValue.add(complementValue.get(indexComplement));
						indexComplement++;
					} else {
						returnValue.add(value.getOne().get(0));
					}
				}
			} else {
				for (Pair<List<FoodDetails>, String> value : tempInfo) {
					returnValue.add(value.getOne().get(0));
				}
			}
			List<Double> quantityList = webService.checkQuantity(Tuples.pair(recipeInfo.getTwo(), returnValue));
			for (int i = 0; i < returnValue.size(); i++) {
				returnValue.get(i).setGram(quantityList.get(i));
			}
			return returnValue;
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

}
