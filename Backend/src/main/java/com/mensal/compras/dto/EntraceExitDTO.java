package com.mensal.compras.dto;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.validation.constraints.NotNull;

import com.mensal.compras.entity.EntraceExit;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
public class EntraceExitDTO implements Serializable {
	private static final long serialVersionUID = 1L;



	private Long id;
	@NotNull(message="Preenchimento obrigatório")
	private Long productId;
	@NotNull(message="Preenchimento obrigatório")
	private BigDecimal quantity;
	private Integer type;
	
	public EntraceExitDTO(EntraceExit obj) {
		this.id = obj.getId();
		this.productId = obj.getStock().getProduct().getId();
		this.quantity = obj.getQuantity();	
		this.type = obj.getType();
		
	}

	
}
