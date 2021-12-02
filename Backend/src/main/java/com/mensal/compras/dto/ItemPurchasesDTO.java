package com.mensal.compras.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ItemPurchasesDTO implements Serializable {
	private static final long serialVersionUID = 1L;	

	private Long id;
	private Double quantity;
	@JsonFormat(pattern = "dd/MM/yyyy")
	private Date validaty;
	private BigDecimal price;
	private Long productId;
}
