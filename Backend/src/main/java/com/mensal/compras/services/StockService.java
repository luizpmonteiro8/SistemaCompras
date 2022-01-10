package com.mensal.compras.services;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.mensal.compras.entity.Product;
import com.mensal.compras.entity.Stock;
import com.mensal.compras.repositories.ProductRepository;
import com.mensal.compras.repositories.StockRepository;
import com.mensal.compras.services.exception.ObjectNFException;

@Service
public class StockService {
	@Autowired
	private StockRepository repo;
	
	@Autowired
	private ProductRepository productRepo;

	public Stock findById(Long id) {
		Optional<Stock> obj = repo.findById(id);

		return obj.orElseThrow(() -> new ObjectNFException("Loja não encontrado! Id: " + id));
	}

	public List<Stock> findAll() {
		List<Stock> list = repo.findAll();
		return list;
	}

	public Page<Stock> findPage(Integer page, Integer linesPerPage, String orderBy,
			String direction) {
		PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction),
				orderBy);
		return repo.findAll(pageRequest);
	}
	
	public boolean addProduct(Long idProduct,BigDecimal quantity) {
		Product product =  productRepo.findById(idProduct).get();
		Stock stock = repo.findByProduct(product);
		if(stock != null) {
			stock.addStock(quantity);
			return true;
		}else {
			return false;
		}	
		
	}
	
	public boolean removeProduct(Long idProduct,BigDecimal quantity) {
		Product product =  productRepo.findById(idProduct).get();
		Stock stock = repo.findByProduct(product);
		if(stock != null) {
			stock.removeStock(quantity);
			return true;
		}else {
			return false;
		}	
		
	}
	
}
