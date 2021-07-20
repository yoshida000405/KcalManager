package kcalmanger.app.backendapp.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;


/**
 * 食材情報のEntity
 *
 * @author yoshidakeisuke
 */
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class FoodDetails implements Cloneable{

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

	@Setter
	@Getter
	private
	Double gram;

	@Setter
	@Getter
	@Column(name = "name_kana")
	private
	String nameKana;

	@Setter
	@Getter
	@Column(name = "name_japanese")
	private
	String nameJapanese;

	@Setter
	@Getter
	@Column(name = "price")
	private
	String price;

	@Setter
	@Getter
	@Column(name = "kcal")
	private
	String kcal;

	@Setter
	@Getter
	@Column(name = "gram_per_piece")
	private
	Integer gramPerPiece;

	@Setter
	@Getter
	@Column(name = "protein")
	private
	String protein;

	@Setter
	@Getter
	@Column(name = "carbohydrate")
	private
	String carbohydrate;

	@Setter
	@Getter
	@Column(name = "fat")
	private
	String fat;

	@Setter
	@Getter
	@Column(name = "vitamin_a")
	private
	String vitaminA;

	@Setter
	@Getter
	@Column(name = "vitamin_e")
	private
	String vitaminE;

	@Setter
	@Getter
	@Column(name = "vitamin_k")
	private
	String vitaminK;

	@Setter
	@Getter
	@Column(name = "vitamin_b1")
	private
	String vitaminB1;

	@Setter
	@Getter
	@Column(name = "vitamin_b2")
	private
	String vitaminB2;

	@Setter
	@Getter
	@Column(name = "vitamin_b6")
	private
	String vitaminB6;

	@Setter
	@Getter
	@Column(name = "vitamin_b12")
	private
	String vitaminB12;

	@Setter
	@Getter
	@Column(name = "vitamin_c")
	private
	String vitaminC;

	@Setter
	@Getter
	@Column(name = "niacin")
	private
	String niacin;

	@Setter
	@Getter
	@Column(name = "pantothenic_acid")
	private
	String pantothenicAcid;

	@Setter
	@Getter
	@Column(name = "folic_acid")
	private
	String folicAcid;

	@Setter
	@Getter
	@Column(name = "sodium")
	private
	String sodium;

	@Setter
	@Getter
	@Column(name = "calcium")
	private
	String calcium;

	@Setter
	@Getter
	@Column(name = "biotin")
	private
	String biotin;

	@Setter
	@Getter
	@Column(name = "potassium")
	private
	String potassium;

	@Setter
	@Getter
	@Column(name = "magnesium")
	private
	String magnesium;

	@Setter
	@Getter
	@Column(name = "manganese")
	private
	String manganese;

	@Setter
	@Getter
	@Column(name = "iron")
	private
	String iron;

	@Setter
	@Getter
	@Column(name = "copper")
	private
	String copper;

	@Setter
	@Getter
	@Column(name = "rin")
	private
	String rin;

	@Setter
	@Getter
	@Column(name = "zinc")
	private
	String zinc;

	@Setter
	@Getter
	@Column(name = "iodine")
	private
	String iodine;

	@Setter
	@Getter
	@Column(name = "chromium")
	private
	String chromium;

	@Setter
	@Getter
	@Column(name = "selenium")
	private
	String selenium;

	@Setter
	@Getter
	@Column(name = "molybdenum")
	private
	String molybdenum;

	@Setter
	@Getter
	@Column(name = "salt_equivalent")
	private
	String saltEquivalent;

	@Setter
	@Getter
	@Column(name = "dietary_fiber")
	private
	String dietaryFiber;

	@Override
	public FoodDetails clone() throws CloneNotSupportedException {
		FoodDetails clone = (FoodDetails) super.clone();
		return clone;
	}

}