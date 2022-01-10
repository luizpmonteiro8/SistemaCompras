package com.mensal.compras.dto;

import java.io.Serializable;
import java.math.BigDecimal;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
public class ItemWithdrawalDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;	
	private BigDecimal quantity;
	private Long productId;
	
}
