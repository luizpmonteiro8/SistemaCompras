package com.mensal.compras.controlleres;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mensal.compras.entity.Stock;
import com.mensal.compras.repositories.projections.PurchasesFromMonth;
import com.mensal.compras.services.DashboardService;

@RestController
@RequestMapping(value = "/dashboard")
public class DashboardController {
	
	@Autowired
	private DashboardService dashboardService;

	@PreAuthorize("hasAnyRole('ADMIN','READ_DASHBOARD')")
	@RequestMapping(value="/count",method = RequestMethod.GET)
	public ResponseEntity<Map<String, Long>> getDashboard() {		
		
		
		return ResponseEntity.ok().body(dashboardService.countObj());
	}
	
	@PreAuthorize("hasAnyRole('ADMIN','READ_DASHBOARD')")
	@RequestMapping(value="/sumpurchases",method = RequestMethod.GET)
	public ResponseEntity<List<PurchasesFromMonth>> getSumPurchasesFromMonth(
			@RequestParam(value = "year", defaultValue = "2022") Integer year) {		
		List<PurchasesFromMonth> obj = dashboardService.getSumPurchasesFromMonth(year);
		
		return ResponseEntity.ok().body(obj);
	}
	
	@PreAuthorize("hasAnyRole('ADMIN','READ_DASHBOARD')")
	@RequestMapping(value="/topquantitystock",method = RequestMethod.GET)
	public ResponseEntity<List<Stock>> getTop10StockQuantity() {		
		List<Stock> obj = dashboardService.getTopStockQuantity();
		
		return ResponseEntity.ok().body(obj);
	}

	
}
