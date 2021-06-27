package kcalmanger.app.backendapp.entity;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


/**
 * 食材候補情報のEntity
 *
 * @author yoshidakeisuke
 */
@AllArgsConstructor
@NoArgsConstructor
public class FoodCandidate {


	@Setter
	@Getter
	private
	String name;

	@Setter
	@Getter
	private
	List<String> candidate;
}