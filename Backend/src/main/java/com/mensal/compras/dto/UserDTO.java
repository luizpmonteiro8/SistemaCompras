package com.mensal.compras.dto;

import java.io.Serializable;

import javax.validation.constraints.NotEmpty;

import com.mensal.compras.entity.User;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
public class UserDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	@NotEmpty(message="Preenchimento obrigatório")
	private String name;
	@NotEmpty(message="Preenchimento obrigatório")
	private String email;
	@NotEmpty(message="Preenchimento obrigatório")
	private String password;
	
	public UserDTO(User obj) {
		this.id = obj.getId();
		this.name = obj.getName();
		this.email = obj.getEmail();
		this.password = obj.getPassword();
	}

	
}
