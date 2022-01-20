package com.mensal.compras.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

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
public class Stock implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private BigDecimal quantity;		

	@OneToOne
	@JoinColumn(name="product_id",unique = true)
	private Product product;
	
	@Setter(value = AccessLevel.NONE)
	@JsonBackReference
	@OneToMany(mappedBy="stock")
	private List<EntraceExit> entraceExitList;
	
	@Setter(value = AccessLevel.NONE)
	@JsonBackReference
	@OneToMany(mappedBy="stock")
	private List<ItemPurchases> itemPurchasesList;
	
	public void addStock(BigDecimal quantity) {
		this.quantity= this.quantity.add(quantity);
	}
	
	public void removeStock(BigDecimal quantity) {
		this.quantity= this.quantity.subtract(quantity);
	}

}
