package com.mensal.compras.dto;

import java.io.Serializable;

import javax.validation.constraints.NotEmpty;

import com.mensal.compras.entity.Category;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CategoryDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	@NotEmpty(message = "Preenchimento obrigatório")
	private String name;

	public CategoryDTO(Category obj) {
		this.id = obj.getId();
		this.name = obj.getName();

	}

}
