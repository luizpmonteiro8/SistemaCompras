package com.mensal.compras.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Market implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(unique = true)
	private String name;
	private boolean blocked;
	private Long cnpj;
	
	@Setter(value = AccessLevel.NONE)
	@JsonBackReference
	@OneToMany(mappedBy="market")
	private List<Purchases> purchasesList;

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Mercado =");
		builder.append(getName());
		return builder.toString();
	} 
	
	

}
