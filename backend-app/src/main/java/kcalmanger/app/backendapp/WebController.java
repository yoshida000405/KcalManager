package kcalmanger.app.backendapp;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import kcalmanger.app.backendapp.entity.FoodCandidate;
import kcalmanger.app.backendapp.entity.FoodDetails;
import org.eclipse.collections.api.tuple.Pair;
import org.eclipse.collections.impl.tuple.Tuples;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class WebController {

	@Autowired
	WebService webService;

	@PostMapping(value = "/api/check")
	@ResponseBody
	@CrossOrigin(origins = { "http://localhost:8081" })
	public List<FoodCandidate> getRecipeInfo(@RequestParam("url") String url) {
		List<FoodDetails> value;
		List<FoodCandidate> returnValue = new ArrayList<>();
		try {
			Pair<List<String>, List<String>> recipeInfo = webService.getRecipe(url);
			Map<List<FoodDetails>, String> tempInfo = webService
					.searchFood(new ArrayList<>(webService.convertWord(recipeInfo.getOne())));
			if (tempInfo.keySet().stream().filter(e -> e.size() > 1 || e.get(0).getNameKana()==null).count() != 0) {
				for(Iterator<List<FoodDetails>> iterator = tempInfo.keySet().iterator(); iterator.hasNext(); ) {
					value = iterator.next();
					if(value.size()>1) {
						List<String> candidate = new ArrayList<>();
						value.stream().filter(e->e.getNameKana()!=null).forEach(e->candidate.add(e.getNameJapanese()));
						returnValue.add(new FoodCandidate(value.get(0).getNameJapanese(),candidate));
					}else if(value.get(0).getNameKana()==null) {
						List<String> candidate = new ArrayList<>();
						returnValue.add(new FoodCandidate(value.get(0).getNameJapanese(),candidate));
					}
				}
			}else {
				//TODO 全ての食材完全一致のケース
				returnValue = null;
			}

			return returnValue;
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	@PostMapping(value = "/api/calculation")
	@ResponseBody
	@CrossOrigin(origins = { "http://localhost:8081" })
	public List<FoodDetails> exportRecipeInfo(@RequestParam("url") String url, @RequestParam("complement") List<String> complement) {
		int indexComplement = 0;
		List<FoodDetails> value;
		List<FoodDetails> complementValue = new ArrayList<>();
		List<FoodDetails> returnValue = new ArrayList<>();
		try {
			Pair<List<String>, List<String>> recipeInfo = webService.getRecipe(url);
			Map<List<FoodDetails>, String> tempInfo = webService
					.searchFood(new ArrayList<>(webService.convertWord(recipeInfo.getOne())));
			Map<List<FoodDetails>, String> complementInfo = webService
					.searchFood(new ArrayList<>(webService.convertWord(complement)));
			if (tempInfo.keySet().stream().filter(e -> e.size() > 1 || e.get(0).getNameKana()==null).count() != 0) {
				for(Iterator<List<FoodDetails>> iterator = complementInfo.keySet().iterator(); iterator.hasNext(); ) {
					complementValue.add(iterator.next().get(0));
				}
				for(Iterator<List<FoodDetails>> iterator = tempInfo.keySet().iterator(); iterator.hasNext(); ) {
					value = iterator.next();
					if(value.size()>1 || value.get(0).getNameKana()==null) {
						returnValue.add(complementValue.get(indexComplement));
						indexComplement++;
					}else {
						returnValue.add(value.get(0));
					}
				}
			}else {
				for(Iterator<List<FoodDetails>> iterator = tempInfo.keySet().iterator(); iterator.hasNext(); ) {
					value = iterator.next();
					returnValue.add(value.get(0));
				}
			}
			List<Double> quantityList = webService.checkQuantity(Tuples.pair(recipeInfo.getTwo(),returnValue));
			for(int i=0; i<returnValue.size(); i++) {
				returnValue.get(i).setGram(quantityList.get(i));
			}
			return returnValue;
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

}
