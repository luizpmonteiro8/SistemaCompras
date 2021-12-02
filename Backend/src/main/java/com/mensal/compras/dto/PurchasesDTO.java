package com.mensal.compras.dto;

import java.io.Serializable;
import java.util.List;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import lombok.Data;


@Data
public class PurchasesDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	@NotEmpty(message="Preenchimento obrigatório")
	private List<ItemPurchasesDTO> itemPurchaseDTOList;
	@NotNull(message="Preenchimento obrigatório")
	private Long marketId;
	@NotNull(message="Preenchimento obrigatório")
	private Integer status;
	
}
