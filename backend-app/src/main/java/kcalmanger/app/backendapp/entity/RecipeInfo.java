package kcalmanger.app.backendapp.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/**
 * レシピ情報のEntity
 *
 * @author yoshidakeisuke
 */
@AllArgsConstructor
@NoArgsConstructor
public class RecipeInfo {

	@Setter
	@Getter
	private
	Double servings_for_yield;

	@Setter
	@Getter
	private
	List<String> nameList;

	@Setter
	@Getter
	private
	List<String> quantityList;


}
