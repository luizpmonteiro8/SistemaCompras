package com.mensal.compras.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mensal.compras.entity.ItemWithdrawal;

@Repository
public interface ItemWithdrawalRepository extends JpaRepository<ItemWithdrawal,Long>{

	
}