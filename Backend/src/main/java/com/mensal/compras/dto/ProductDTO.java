package com.mensal.compras.dto;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.validation.constraints.NotEmpty;

import com.mensal.compras.entity.Product;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
public class ProductDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	@NotEmpty(message="Preenchimento obrigatório")
	private String name;
	private boolean blocked;
	private Long categoryId;
	private BigDecimal quantMin;
	
	public ProductDTO(Product obj) {
		this.id = obj.getId();
		this.name = obj.getName();	
		this.blocked = obj.isBlocked();
		this.categoryId = obj.getCategory().getId();
		this.quantMin = obj.getQuantMin();
	}

	
}
