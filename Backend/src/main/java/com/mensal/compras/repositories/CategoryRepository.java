package com.mensal.compras.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mensal.compras.entity.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category,Long>{

	
}
