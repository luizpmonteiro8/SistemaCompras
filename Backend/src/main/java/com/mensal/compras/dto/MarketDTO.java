package com.mensal.compras.dto;

import java.io.Serializable;

import javax.validation.constraints.NotEmpty;

import com.mensal.compras.entity.Market;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
public class MarketDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	@NotEmpty(message="Preenchimento obrigatório")
	private String name;
	private boolean blocked;	
	private long cnpj;
	
	public MarketDTO(Market obj) {
		this.id = obj.getId();
		this.name = obj.getName();
		this.blocked = obj.isBlocked();
		if(obj.getCnpj() != null) {
			this.cnpj = obj.getCnpj();
		}
		
	}

	
}
