package com.mensal.compras.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mensal.compras.entity.Withdrawal;

@Repository
public interface WithdrawalRepository extends JpaRepository<Withdrawal,Long>{

	
}
