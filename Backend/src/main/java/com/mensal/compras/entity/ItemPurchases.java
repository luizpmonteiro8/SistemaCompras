package com.mensal.compras.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.sql.Date;
import java.text.NumberFormat;
import java.util.Locale;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ItemPurchases implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;	

	private BigDecimal quantity;
	private BigDecimal price;
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date validaty;
	
	@JsonBackReference
	@ManyToOne
	@JoinColumn(name = "purchase_id")
	private Purchases purchase;
	
	@ManyToOne
	@JoinColumn(name="stock_id")
	private Stock stock;
	
	public BigDecimal getSubTotal() {
		return price.multiply(quantity);
	}

	@Override
	public String toString() {
		NumberFormat nf = NumberFormat.getCurrencyInstance(new Locale("pt", "BR"));
		StringBuilder builder = new StringBuilder();
		builder.append("Item da compra quantidade=");
		builder.append(getQuantity());
		builder.append(", preço=");
		builder.append(nf.format(getPrice()));
		builder.append(", sub total=");
		builder.append(nf.format(getSubTotal()));
		builder.append(", validade=");
		builder.append(getValidaty());
		builder.append(", produto=");
		builder.append(stock.getProduct().getName());
		builder.append("\n");
		return builder.toString();
	}
	
	
}
