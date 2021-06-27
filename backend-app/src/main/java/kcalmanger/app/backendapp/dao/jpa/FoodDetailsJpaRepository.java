package kcalmanger.app.backendapp.dao.jpa;

import java.util.List;

import kcalmanger.app.backendapp.entity.FoodDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface FoodDetailsJpaRepository extends JpaRepository<FoodDetails, Integer> {

	/**
	 * 日本語名を条件に食材情報を完全一致検索で取得
	 *
	 * @return FoodDetails
	 */
	FoodDetails findByNameKana(String food);

	/**
	 * 日本語名を条件に食材情報を前方後方一致検索で取得
	 *
	 * @return FoodDetails
	 */
	List<FoodDetails> findByNameKanaLike(String food);
}