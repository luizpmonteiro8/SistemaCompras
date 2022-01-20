package com.mensal.compras.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mensal.compras.entity.ItemPurchases;

@Repository
public interface ItemPurchasesRepository extends JpaRepository<ItemPurchases,Long>{

	
}
