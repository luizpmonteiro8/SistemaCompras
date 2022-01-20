package com.mensal.compras.repositories;

import static org.assertj.core.api.Assertions.assertThat;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.mensal.compras.entity.Category;
import com.mensal.compras.entity.ItemPurchases;
import com.mensal.compras.entity.Market;
import com.mensal.compras.entity.Product;
import com.mensal.compras.entity.Purchases;
import com.mensal.compras.entity.Stock;



@ExtendWith(SpringExtension.class)
@ActiveProfiles("test")
@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
public class PurchasesRepositoryTest {
	
	@Autowired
	PurchasesRepository repository;
	
	@Autowired
	TestEntityManager entityManager;	
	

	
	@Test
	public void shouldSaveAPurchases() {
		//scenario
		Purchases purchases = createPurchases();
		
		//action
		purchases = repository.save(purchases);
		
		//verification
		assertThat(purchases.getId()).isNotNull();
	}
	
	@Test
	public void shouldDeleteAPurchases() {
		Purchases purchases = createandPersistPurchases();
		
		purchases = entityManager.find(Purchases.class, purchases.getId());
		
		repository.delete(purchases);
		
		Purchases purchasesNonExist = entityManager.find(Purchases.class, purchases.getId());
		assertThat(purchasesNonExist).isNull();
	}
	
	@Test
	public void shouldUpdateAPurchases() {
		Purchases purchases = createandPersistPurchases();
		
		SimpleDateFormat formatt = new SimpleDateFormat("dd/MM/yyyy"); 
		Date date = new Date();
		try {
			 date = formatt.parse("11/01/2022");
		} catch (ParseException e) {			
			e.printStackTrace();
		}
		Market market = Market.builder().name("Hiper Market").cnpj(30352888000192L).blocked(false).build();
		
		purchases.setDate(date);
		purchases.setMarket(market);
		
		repository.save(purchases);
		
		Purchases purchasesUpdate = entityManager.find(Purchases.class, purchases.getId());
		
		assertThat(purchasesUpdate.getDate()).isEqualTo(date);
		assertThat(purchasesUpdate.getMarket()).isEqualTo(market);
		
	}
	
	@Test
	public void shouldFindPurchasesById() {
		Purchases purchases = createandPersistPurchases();
		
		Optional<Purchases> purchasesFind = repository.findById(purchases.getId());
		
		assertThat(purchasesFind.isPresent()).isTrue();
	}
	
	
	private Purchases createandPersistPurchases() {
		Purchases purchases = createPurchases();
		entityManager.persist(purchases);
		return purchases;
	}
	

	public static Purchases createPurchases(){
		Market market = Market.builder().name("Carrefour").cnpj(39927761000129L).blocked(false).build();
		
		Category category1 = Category.builder().name("Cereais").build();
		Product product1 = Product.builder().category(category1).name("Arroz 1 kg").quantMin(BigDecimal.valueOf(2)).blocked(false).build();
		Product product2 = Product.builder().category(category1).name("Feijão 1 kg").quantMin(BigDecimal.valueOf(2)).blocked(false).build();
		Stock stock1 = Stock.builder().product(product1).quantity(BigDecimal.valueOf(4)).build();
		Stock stock2 = Stock.builder().product(product2).quantity(BigDecimal.valueOf(3)).build();
		
		ItemPurchases item1 = ItemPurchases.builder().price(BigDecimal.valueOf(3.5)).quantity(BigDecimal.valueOf(5)).stock(stock1).build();
		ItemPurchases item2 = ItemPurchases.builder().price(BigDecimal.valueOf(4.5)).quantity(BigDecimal.valueOf(5)).stock(stock2).build();
		
		List<ItemPurchases> itemPurchasesList =  new ArrayList<ItemPurchases>();
		itemPurchasesList.add(item1);
		itemPurchasesList.add(item2);
		
		SimpleDateFormat formatt = new SimpleDateFormat("dd/MM/yyyy"); 
		Date date = new Date();
		try {
			 date = formatt.parse("12/01/2022");
		} catch (ParseException e) {			
			e.printStackTrace();
		}
		
		return Purchases.builder().date(date).market(market).itemPurchaseList(itemPurchasesList).status(2).build();
	}
}
