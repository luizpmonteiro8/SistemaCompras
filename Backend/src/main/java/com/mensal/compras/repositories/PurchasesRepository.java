package com.mensal.compras.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.mensal.compras.entity.Purchases;
import com.mensal.compras.repositories.projections.PurchasesFromMonth;

@Repository
public interface PurchasesRepository extends JpaRepository<Purchases,Long>{

	@Query(nativeQuery = true,
			value = "select extract( month from p.date ) as month,sum(i.price*i.quantity) as total from purchases as p "
					+ "INNER JOIN item_purchases as i on p.id=i.purchase_id "
					+ "where extract(year from p.date) = :year group by extract( month from p.date ) order by extract( month from p.date)")
	List<PurchasesFromMonth> getSumPurchasesFromMonth(@Param("year") Integer year);

	}
