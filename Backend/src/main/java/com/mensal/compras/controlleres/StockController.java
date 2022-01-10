package com.mensal.compras.controlleres;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mensal.compras.entity.Stock;
import com.mensal.compras.services.StockService;

@RestController
@RequestMapping(value = "/stocks")
public class StockController {

	@Autowired
	private StockService service;

	@PreAuthorize("hasAnyRole('ADMIN','READ_STOCK')")
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<List<Stock>> findAll() {
		List<Stock> list = service.findAll();					
		return ResponseEntity.ok().body(list);
	}

	
	@PreAuthorize("hasAnyRole('ADMIN','WRITE_STOCK')")
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<Stock> findById(@PathVariable Long id) {
		Stock obj = service.findById(id);
		return ResponseEntity.ok().body(obj);
	}

	@PreAuthorize("hasAnyRole('ADMIN','READ_STOCK')")
	@RequestMapping(value = "/page", method = RequestMethod.GET)
	public ResponseEntity<Page<Stock>> findPage(
			@RequestParam(value = "page", defaultValue = "0") Integer page,
			@RequestParam(value = "linesPerPage", defaultValue = "24") Integer linesPerPage,
			@RequestParam(value = "orderBy", defaultValue = "unit") String orderBy,
			@RequestParam(value = "direction", defaultValue = "ASC") String direction) {
		Page<Stock> list = service.findPage(page, linesPerPage, orderBy, direction);		
		return ResponseEntity.ok().body(list);
	}
}
