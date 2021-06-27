package kcalmanger.app.backendapp;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Stream;

import javax.net.ssl.HttpsURLConnection;

import kcalmanger.app.backendapp.dao.jpa.FoodDetailsJpaRepository;
import kcalmanger.app.backendapp.entity.FoodDetails;
import org.eclipse.collections.api.tuple.Pair;
import org.eclipse.collections.impl.tuple.Tuples;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ibm.icu.text.Transliterator;

@Service
public class WebService {

	@Autowired
	FoodDetailsJpaRepository foodDetailsJpaRepository;

	private static Pattern PATTERN_FRACTION = Pattern.compile("[0-9０-９]+[/／]{1}[0-9０-９]+");
	private static Pattern PATTERN_G = Pattern.compile("[0-9０-９]+\\.?[0-9０-９]+[g]+|[0-9０-９]+[g]+");
	private static Pattern PATTERN_MG = Pattern.compile("[0-9０-９]+\\.?[0-9０-９]+[m]+[g]+|[0-9０-９]+[m]+[g]+");
	private static Pattern PATTERN_CC = Pattern.compile("[0-9０-９]+\\.?[0-9０-９]+[c]+|[0-9０-９]+[c]+");
	private static Pattern PATTERN_L = Pattern.compile("[0-9０-９]+\\.?[0-9０-９]+[L]+|[0-9０-９]+[L]+");
	private static Pattern PATTERN_ML = Pattern.compile("[0-9０-９]+\\.?[0-9０-９]+[m]+[l]+|[0-9０-９]+[m]+[l]+");
	private static Pattern PATTERN_TBSP = Pattern.compile("大さじ[0-9０-９]+\\.?[0-9０-９]+|大さじ[0-9０-９]+");
	private static Pattern PATTERN_TEESP = Pattern.compile("小さじ[0-9０-９]+\\.?[0-9０-９]+|小さじ[0-9０-９]+");
	private static Pattern PATTERN_CUP = Pattern.compile("[0-9０-９]+\\.?[0-9０-９]+カップ|[0-9０-９]+カップ");
	private static Pattern PATTERN_PIECE = Pattern.compile("[0-9０-９]+\\.?[0-9０-９]+個|[0-9０-９]+個");
	private static Pattern PATTERN_CONVERT = Pattern.compile("converted\": \"[^\"]*\"");

	private static Transliterator transliterator = Transliterator.getInstance("Fullwidth-Halfwidth");

	public List<String> convertWord(List<String> wordList) throws IOException {

		HttpURLConnection con = null;
		StringBuffer result = new StringBuffer();
		String url = "https://labs.goo.ne.jp/api/hiragana";
		URL obj = new URL(url);
		String JSON;
		String convert;
		Matcher matcher;
		List<String> returnList = new ArrayList<>();
		for (String word : wordList) {
			try {
				JSON = "{\"app_id\":\"63ef3b28e2fce43d9b4345faba4dd5f655bc0832470ac8eef81442dbf0f469d6\",\"sentence\":\""
						+ word + "\",\"output_type\":\"hiragana\"}";
				con = (HttpURLConnection) obj.openConnection();
				// HTTPリクエストコード
				con.setDoOutput(true);
				con.setRequestMethod("POST");
				con.setRequestProperty("Content-Type", "application/json");
				// リクエストのbodyにJSON文字列を書き込む
				OutputStreamWriter out = new OutputStreamWriter(con.getOutputStream());
				out.write(JSON);
				out.flush();
				con.connect();

				// HTTPレスポンスコード
				final int status = con.getResponseCode();
				String message = con.getResponseMessage();
				if (status == HttpsURLConnection.HTTP_OK) {
					// 通信に成功した
					// テキストを取得する
					final InputStream in = con.getInputStream();
					String encoding = con.getContentEncoding();
					if (null == encoding) {
						encoding = "UTF-8";
					}
					final InputStreamReader inReader = new InputStreamReader(in, encoding);
					final BufferedReader bufReader = new BufferedReader(inReader);
					String line = null;
					// 1行ずつテキストを読み込む
					while ((line = bufReader.readLine()) != null) {
						result.append(line);
					}
					bufReader.close();
					inReader.close();
					in.close();
				} else {
					// 通信が失敗した場合のレスポンスコードを表示
					System.out.println(message);
				}

			} catch (Exception e1) {
				e1.printStackTrace();
			} finally {
				if (con != null) {
					// コネクションを切断
					con.disconnect();
				}
			}
			convert = result.toString();
			matcher = PATTERN_CONVERT.matcher(convert);
			while (matcher.find()) {
				convert = matcher.group().replaceAll("converted\": \"", "");
				convert = convert.replaceAll("\"", "");
			}
			returnList.add(convert);
		}
		return returnList;
	}

	public Pair<List<String>, List<String>> getRecipe(String url) throws IOException {
		List<String> nameList = new ArrayList<String>();
		List<String> quantityList = new ArrayList<String>();
		Document doc = Jsoup.connect(url).get();
		Elements nameElement = doc.select("#ingredients_list .ingredient_name .name");
		for (Element headline : nameElement) {
			nameList.add(headline.ownText());
		}
		nameElement = doc.select("#ingredients_list .ingredient_name .name .cookdict_ingredient_link");
		for (Element headline : nameElement) {
			nameList.set(nameList.indexOf(""), headline.ownText());
		}
		Elements quantityElement = doc.select("#ingredients_list .ingredient_quantity");
		for (Element headline : quantityElement) {
			quantityList.add(headline.ownText());
		}
		return Tuples.pair(nameList, quantityList);
	}

	public Map<List<FoodDetails>, String> searchFood(List<String> foodList) throws IOException {
		Map<List<FoodDetails>, String> foodCandidate = new LinkedHashMap<List<FoodDetails>, String>();
		foodList.stream().forEach((food) -> {
			FoodDetails foodDetails = foodDetailsJpaRepository.findByNameKana(food);
			List<FoodDetails> list;
			if (foodDetails == null) {
				list = foodDetailsJpaRepository.findByNameKanaLike("%" + food + "%");
				if (list.size() == 0) {
					list = new ArrayList<>(Arrays.asList(new FoodDetails()));
					list.get(0).setNameJapanese(food);
					foodCandidate.put(list, food);
				} else {
					foodCandidate.put(list, food);
					if (list.size() > 1) {
						list.add(0, new FoodDetails());
						list.get(0).setNameJapanese(food);
					}
				}
			} else {
				foodCandidate.put(new ArrayList<>(Arrays.asList(foodDetails)), food);
			}
		});
		return foodCandidate;
	}

	public List<Double> checkQuantity(Pair<List<String>, List<FoodDetails>> list) throws IOException {
		List<String> tempList = list.getOne();
		List<FoodDetails> foodList = list.getTwo();
		List<Double> quantityList = new ArrayList<Double>();
		boolean flag = false;
		for (int i = 0; i < tempList.size(); i++) {
			End: while (!flag) {
				Matcher matcher = PATTERN_FRACTION.matcher(tempList.get(i));
				while (matcher.find()) {
					tempList.set(i, tempList.get(i).replaceAll(matcher.group(), "" + Arrays
							.stream(Stream.of(matcher.group().split("/", 0)).mapToDouble(Double::parseDouble).toArray())
							.reduce(1, (result, element) -> {
								return result / element;
							})));
				}
				matcher = PATTERN_G.matcher(tempList.get(i));
				while (matcher.find()) {
					quantityList
							.add(Math.floor(Double.parseDouble(transliterator.transliterate(matcher.group().replaceAll("g", ""))) * 10)/ 10);
					flag = true;
					break End;
				}
				matcher = PATTERN_MG.matcher(tempList.get(i));
				while (matcher.find()) {
					quantityList.add(Math.floor(Double.parseDouble(transliterator.transliterate(matcher.group().replaceAll("mg", ""))) * 10)/ 10000);
					flag = true;
					break End;
				}
				matcher = PATTERN_CC.matcher(tempList.get(i));
				while (matcher.find()) {
					quantityList.add(Math.floor(Double.parseDouble(transliterator.transliterate(matcher.group().replaceAll("cc", "")))* 10)/ 10);
					flag = true;
					break End;
				}
				matcher = PATTERN_L.matcher(tempList.get(i));
				while (matcher.find()) {
					quantityList
							.add(Math.floor(Double.parseDouble(transliterator.transliterate(matcher.group().replaceAll("L", ""))) * 10)* 100);
					flag = true;
					break End;
				}
				matcher = PATTERN_ML.matcher(tempList.get(i));
				while (matcher.find()) {
					quantityList.add(Math.floor(Double.parseDouble(transliterator.transliterate(matcher.group().replaceAll("ml", "")))* 10)/ 10);
					flag = true;
					break End;
				}
				matcher = PATTERN_CUP.matcher(tempList.get(i));
				while (matcher.find()) {
					quantityList.add(Math.floor(Double.parseDouble(transliterator.transliterate(matcher.group().replaceAll("カップ", ""))) * 10)* 20);
					flag = true;
					break End;
				}
				matcher = PATTERN_PIECE.matcher(tempList.get(i));
				while (matcher.find()) {
					quantityList.add(Math.floor(Double.parseDouble(transliterator.transliterate(matcher.group().replaceAll("個", "")))* 10 * foodList.get(i).getGramPerPiece())/ 10);
					flag = true;
					break End;
				}
				matcher = PATTERN_TEESP.matcher(tempList.get(i));
				while (matcher.find()) {
					quantityList.add(Math.floor(Double.parseDouble(transliterator.transliterate(matcher.group().replaceAll("小さじ", ""))) * 10)* 0.5);
					flag = true;
					break End;
				}
				matcher = PATTERN_TBSP.matcher(tempList.get(i));
				while (matcher.find()) {
					quantityList.add(Math
							.floor(Double.parseDouble(transliterator.transliterate(matcher.group().replaceAll("大さじ", ""))) * 10)* 1.5);
					flag = true;
					break End;
				}
				quantityList.add(0.0);
				flag = true;
			}
			flag = false;
		}
		return quantityList;
	}

}
