package com.mensal.compras.config;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.mensal.compras.entity.Category;
import com.mensal.compras.entity.EntraceExit;
import com.mensal.compras.entity.ItemPurchases;
import com.mensal.compras.entity.Market;
import com.mensal.compras.entity.Product;
import com.mensal.compras.entity.Purchases;
import com.mensal.compras.entity.Stock;
import com.mensal.compras.entity.User;
import com.mensal.compras.repositories.CategoryRepository;
import com.mensal.compras.repositories.ItemPurchasesRepository;
import com.mensal.compras.repositories.MarketRepository;
import com.mensal.compras.repositories.ProductRepository;
import com.mensal.compras.repositories.PurchasesRepository;
import com.mensal.compras.repositories.StockRepository;
import com.mensal.compras.repositories.UserRepository;

@Configuration
@Profile("prod")
public class ProdConfig implements CommandLineRunner {

	private static final Long Long = null;
	SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

	@Autowired
	private BCryptPasswordEncoder pe;

	@Autowired
	UserRepository userRepository;

	@Autowired
	MarketRepository marketRepository;

	@Autowired
	CategoryRepository categoryRepository;

	@Autowired
	ProductRepository productRepository;

	@Autowired
	StockRepository stockRepository;

	@Autowired
	PurchasesRepository purchasesRepository;

	@Autowired
	ItemPurchasesRepository itemPurchasesRepository;

	@Override
	public void run(String... args) throws Exception {
		Set<Integer> permissionList = new HashSet<Integer>();
		permissionList.add(1);
		User test = new User(null, "Teste", "teste@teste.com.br", pe.encode("12345678"), permissionList);

		Market market = Market.builder().name("Mercado barato dmais").blocked(false).id(1L).build();
		Market market1 = Market.builder().name("Mercado o maior do bairro").blocked(false).id(2L).build();
		Market market2 = Market.builder().name("Mercado tem dtudo").blocked(false).id(3L).build();

		Category category = Category.builder().name("Produtos de Limpeza").id(1L).build();
		Category category1 = Category.builder().name("Bebidas").id(2L).build();
		Category category2 = Category.builder().name("Alimentação").id(3L).build();
		Category category3 = Category.builder().name("Hortifruti").id(4L).build();
		Category category4 = Category.builder().name("Carnes e Frios").id(5L).build();

		//Produtos de limpeza
		Product product = Product.builder().category(category).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Sabão em pó").build();
		Product product1 = Product.builder().category(category).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Amaciante").build();
		Product product2 = Product.builder().category(category).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Detergente").build();
		Product product3 = Product.builder().category(category).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Água sanitária").build();
		Product product4 = Product.builder().category(category).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Esponja de aço").build();
		Product product5 = Product.builder().category(category).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Buchinha de pia").build();
		Product product6 = Product.builder().category(category).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Sabão em pedra").build();
		Product product7 = Product.builder().category(category).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Sabonete").build();
		Product product8 = Product.builder().category(category).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Shampo").build();
		Product product9 = Product.builder().category(category).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Condicionador").build();
		Product product10 = Product.builder().category(category).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Desinfetante").build();
		Product product11 = Product.builder().category(category).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Lustra móveis").build();
		Product product12 = Product.builder().category(category).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Tira manchas").build();
		Product product13 = Product.builder().category(category).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Limpa vidros").build();
		Product product14 = Product.builder().category(category).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Alcool").build();
		Product product15 = Product.builder().category(category).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Saco de lixo 30l").build();
		Product product16 = Product.builder().category(category).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Saco de lixo 50l").build();

		//Bebidas
		Product product17 = Product.builder().category(category1).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Suco garrafa 1l").build();
		Product product18 = Product.builder().category(category1).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Suco caixinha 500ml").build();
		Product product19 = Product.builder().category(category1).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Suco sachê").build();
		Product product20 = Product.builder().category(category1).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Leite integral litro").build();
		Product product21 = Product.builder().category(category1).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Leite desnatado litro").build();
		Product product22 = Product.builder().category(category1).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Refrigerante 2l").build();

		//Alimentação
		Product product23 = Product.builder().category(category2).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Arroz 5kg").build();
		Product product24 = Product.builder().category(category2).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Feijão 2kg").build();
		Product product25 = Product.builder().category(category2).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Macarrão").build();
		Product product26 = Product.builder().category(category2).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Extrato de tomate").build();
		Product product27 = Product.builder().category(category2).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Molho de tomate").build();
		Product product28 = Product.builder().category(category2).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Sal").build();
		Product product29 = Product.builder().category(category2).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Açucar").build();
		Product product30 = Product.builder().category(category2).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Achocolatado").build();
		Product product31 = Product.builder().category(category2).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Bolacha").build();
		Product product32 = Product.builder().category(category2).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Café").build();
		Product product33 = Product.builder().category(category2).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Farofa pronta").build();
		Product product34 = Product.builder().category(category2).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Fubá").build();
		Product product35 = Product.builder().category(category2).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Farinha de trigo").build();
		Product product36 = Product.builder().category(category2).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Farinha de milho").build();
		Product product37 = Product.builder().category(category2).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Farinha de mandioca").build();
		Product product38 = Product.builder().category(category2).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Sardinha").build();
		Product product39 = Product.builder().category(category2).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Atum").build();
		Product product40 = Product.builder().category(category2).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Maionese").build();
		Product product41 = Product.builder().category(category2).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Molho de pimenta").build();
		Product product42 = Product.builder().category(category2).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Ervilha").build();
		Product product43 = Product.builder().category(category2).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Milho verde").build();
		Product product44 = Product.builder().category(category2).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Seleta ").build();
		Product product45 = Product.builder().category(category2).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Doce de leite").build();
		Product product46 = Product.builder().category(category2).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Goiabada").build();
		Product product47 = Product.builder().category(category2).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Milho de pipoca").build();
		Product product48 = Product.builder().category(category2).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Óleo de cozinha").build();
		Product product49 = Product.builder().category(category2).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Leite em pó").build();
		Product product50 = Product.builder().category(category2).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Creme de leite").build();
		Product product51 = Product.builder().category(category2).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Leite condensado").build();
		Product product52 = Product.builder().category(category2).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Pão de forma").build();

		//Hortifruti
		Product product53 = Product.builder().category(category3).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Alface").build();
		Product product54 = Product.builder().category(category3).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Couve").build();
		Product product55 = Product.builder().category(category3).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Batata").build();
		Product product56 = Product.builder().category(category3).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Tomate").build();
		Product product57 = Product.builder().category(category3).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Cenoura").build();
		Product product58 = Product.builder().category(category3).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Beterraba").build();
		Product product59 = Product.builder().category(category3).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Chicória").build();
		Product product60 = Product.builder().category(category3).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Mandioca").build();
		Product product61 = Product.builder().category(category3).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Chuchu").build();
		Product product62 = Product.builder().category(category3).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Espinafre").build();
		Product product63 = Product.builder().category(category3).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Banana").build();
		Product product64 = Product.builder().category(category3).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Ovos").build();
		Product product65 = Product.builder().category(category3).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Uva").build();
		Product product66 = Product.builder().category(category3).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Abacate").build();
		Product product67 = Product.builder().category(category3).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Mamão").build();
		Product product68 = Product.builder().category(category3).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Melancia").build();
		Product product69 = Product.builder().category(category3).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Melão").build();
		Product product70 = Product.builder().category(category3).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Jiló").build();
		Product product71 = Product.builder().category(category3).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Quiabo").build();
		Product product72 = Product.builder().category(category3).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Salsa").build();
		Product product73 = Product.builder().category(category3).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Cheiro verde").build();
		Product product74 = Product.builder().category(category3).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Cebola").build();

		//Carnes e Frios
		Product product75 = Product.builder().category(category4).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Queijo Minas").build();
		Product product76 = Product.builder().category(category4).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Queijo Mussarela").build();
		Product product77 = Product.builder().category(category4).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Queijo outros").build();
		Product product78 = Product.builder().category(category4).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Manteiga").build();
		Product product79 = Product.builder().category(category4).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Margarina").build();
		Product product80 = Product.builder().category(category4).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Iogurte").build();
		Product product81 = Product.builder().category(category4).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Presunto").build();
		Product product82 = Product.builder().category(category4).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Peixe").build();
		Product product83 = Product.builder().category(category4).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Frango").build();
		Product product84 = Product.builder().category(category4).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Carne vermelha").build();
		Product product85 = Product.builder().category(category4).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Carne seca").build();
		Product product86 = Product.builder().category(category4).quantMin(BigDecimal.valueOf(1)).blocked(false)
				.name("Salsicha").build();

		List<Product> productList = new ArrayList<Product>();
		productList.add(product);
		productList.add(product1);
		productList.add(product2);
		productList.add(product3);
		productList.add(product4);
		productList.add(product5);
		productList.add(product6);
		productList.add(product7);
		productList.add(product8);
		productList.add(product9);
		productList.add(product10);
		productList.add(product11);
		productList.add(product12);
		productList.add(product13);
		productList.add(product14);
		productList.add(product15);
		productList.add(product16);
		productList.add(product17);
		productList.add(product18);
		productList.add(product19);
		productList.add(product20);
		productList.add(product21);
		productList.add(product22);
		productList.add(product23);
		productList.add(product24);
		productList.add(product25);
		productList.add(product26);
		productList.add(product27);
		productList.add(product28);
		productList.add(product29);
		productList.add(product30);
		productList.add(product31);
		productList.add(product32);
		productList.add(product33);
		productList.add(product34);
		productList.add(product35);
		productList.add(product36);
		productList.add(product37);
		productList.add(product38);
		productList.add(product39);
		productList.add(product40);
		productList.add(product41);
		productList.add(product42);
		productList.add(product43);
		productList.add(product44);
		productList.add(product45);
		productList.add(product46);
		productList.add(product47);
		productList.add(product48);
		productList.add(product49);
		productList.add(product50);
		productList.add(product51);
		productList.add(product52);
		productList.add(product53);
		productList.add(product54);
		productList.add(product55);
		productList.add(product56);
		productList.add(product57);
		productList.add(product58);
		productList.add(product59);
		productList.add(product60);
		productList.add(product61);
		productList.add(product62);
		productList.add(product63);
		productList.add(product64);
		productList.add(product65);
		productList.add(product66);
		productList.add(product67);
		productList.add(product68);
		productList.add(product69);
		productList.add(product70);
		productList.add(product71);
		productList.add(product72);
		productList.add(product73);
		productList.add(product74);
		productList.add(product75);
		productList.add(product76);
		productList.add(product77);
		productList.add(product78);
		productList.add(product79);
		productList.add(product80);
		productList.add(product81);
		productList.add(product82);
		productList.add(product83);
		productList.add(product84);
		productList.add(product85);
		productList.add(product86);

		userRepository.save(test);
		marketRepository.saveAll(Arrays.asList(market, market1, market2));
		categoryRepository.saveAll(Arrays.asList(category, category1, category2, category3, category4));
		productRepository.saveAll(productList);

		List<Product> newListProducts = productRepository.findAll();
		newListProducts.forEach(item -> {
			Stock stock = Stock.builder().product(item).quantity(BigDecimal.ZERO).build();
			stockRepository.save(stock);
		});

		for (int i = 1; i <= 12; i++) {
			Date date = format.parse("2021-" + String.valueOf(i) + "-05");

			List<ItemPurchases> itemPurchasesList = new ArrayList<ItemPurchases>();
			List<Stock> stockList = new ArrayList<Stock>();

			for (int j = 0; j < randomInteger(20, 50); j++) {
				ItemPurchases itemPurchases = ItemPurchases.builder().price(BigDecimal.valueOf(randomDouble(1.0, 15.0)))
						.quantity(BigDecimal.valueOf(randomInteger(1, 5))).validaty(randomValidaty())
						.stock(randomStock()).build();
				itemPurchases.getStock().addStock(itemPurchases.getQuantity());				
				itemPurchasesList.add(itemPurchases);
				stockList.add(itemPurchases.getStock());
			}

			Purchases purchase = Purchases.builder().date(date).market(randomMarket()).status(2)
					.itemPurchaseList(itemPurchasesList).build();
			Purchases purchaseSave = purchasesRepository.save(purchase);			
			

			itemPurchasesList.forEach(item -> {
				item.setPurchase(purchaseSave);
			});
			itemPurchasesRepository.saveAll(itemPurchasesList);
			stockRepository.saveAll(stockList);

		}		

	}

	private long randomLong(long leftLimit, long rightLimit) {
		long generatedLong = leftLimit + (long) (Math.random() * (rightLimit - leftLimit));
		return generatedLong;
	}

	private int randomInteger(int leftLimit, int rightLimit) {
		int generatedInteger = leftLimit + (int) (new Random().nextFloat() * (rightLimit - leftLimit));
		return generatedInteger;
	}

	private double randomDouble(double leftLimit, double rightLimit) {
		double generatedDouble = leftLimit + new Random().nextDouble() * (rightLimit - leftLimit);
		return generatedDouble;
	}

	@SuppressWarnings("deprecation")
	private Date randomValidaty() throws ParseException {
		String month = String.valueOf(randomInteger(1, 12));
		String year = String.valueOf(randomInteger(2021, 2023));
		Date date = format.parse(year + "-" + month + "-05");
		date.setDate(randomInteger(1, 30));
		return date;
	}

	private Stock randomStock() {
		Stock stock = stockRepository.findById(randomLong(1L, 86L)).get();
		while (stock.getId() == null) {
			stock = stockRepository.findById(randomLong(1, 86)).get();
		}
		return stock;
	}

	private Market randomMarket() {
		Market market = marketRepository.findById(randomLong(1L, 3L)).get();
		while (market.getId() == null) {
			market = marketRepository.findById(randomLong(1L, 3L)).get();
		}
		return market;
	}

}
