package com.mensal.compras.dto;

import java.io.Serializable;
import java.util.List;

import javax.validation.constraints.NotEmpty;

import lombok.Data;


@Data
public class WithdrawalDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	@NotEmpty(message="Preenchimento obrigatório")
	private List<ItemWithdrawalDTO> itemWithdrawalDTOList;

	
}
