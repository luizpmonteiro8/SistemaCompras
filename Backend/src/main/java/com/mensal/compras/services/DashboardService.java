package com.mensal.compras.services;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mensal.compras.entity.Stock;
import com.mensal.compras.repositories.ProductRepository;
import com.mensal.compras.repositories.PurchasesRepository;
import com.mensal.compras.repositories.StockRepository;
import com.mensal.compras.repositories.projections.PurchasesFromMonth;

@Service
public class DashboardService {

	@Autowired
	private ProductRepository productRepo;

	@Autowired
	private PurchasesRepository purchasesRepo;

	@Autowired
	private StockRepository stockRepo;

	public Map<String, Long> countObj() {
		long productCount = productRepo.count();
		long purchasesCount = purchasesRepo.count();

		Map<String, Long> countObj = new HashMap<>();
		countObj.put("productCount", productCount);
		countObj.put("purchasesCount", purchasesCount);
		return countObj;
	}

	public List<PurchasesFromMonth> getSumPurchasesFromMonth(Integer year) {
		List<PurchasesFromMonth> obj = purchasesRepo.getSumPurchasesFromMonth(year);

		if (obj.isEmpty()) {
			return obj;
		}

		Integer monthMax = 12;//obj.stream().mapToInt(PurchasesFromMonth::getMonth).max().getAsInt();

		List<Integer> listMonth = IntStream.rangeClosed(1, monthMax).boxed().collect(Collectors.toList());

		List<Integer> monthAdd = obj.stream().map(PurchasesFromMonth::getMonth).collect(Collectors.toList());

		listMonth.stream().forEach(month -> {
			if (!monthAdd.contains(month)) {
				PurchasesFromMonth purchasesFromMonth = new PurchasesFromMonth() {

					@Override
					public Integer getMonth() {
						return month;
					}

					@Override
					public BigDecimal getTotal() {
						return BigDecimal.ZERO;
					}
				};

				obj.add(purchasesFromMonth);
			}
		});

		obj.sort(Comparator.comparing(PurchasesFromMonth::getMonth));

		return obj;
	}

	public List<Stock> getTopStockQuantity() {
		List<Stock> obj = stockRepo.findTop5ByOrderByQuantityDesc();

		return obj;

	}

}
