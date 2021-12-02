package com.mensal.compras.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.mensal.compras.entity.Product;
import com.mensal.compras.entity.Stock;

@Repository
public interface StockRepository extends JpaRepository<Stock,Long>{

	@Transactional(readOnly=true)
	Stock findByProduct(Product product);
	
}
