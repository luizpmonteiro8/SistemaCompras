package com.mensal.compras.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.mensal.compras.entity.enums.PurchasesStatus;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Purchases implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss'BRT'", timezone = "America/Sao_Paulo")
	private Date instantDate;

	@Setter(value = AccessLevel.NONE)
	@Getter(value = AccessLevel.NONE)
	private Integer status;

	@Setter(value = AccessLevel.NONE)
	@OneToMany(mappedBy = "purchase",cascade = CascadeType.ALL)
	private List<ItemPurchases> itemPurchaseList;

	@ManyToOne
	@JoinColumn(name = "market_id")
	private Market market;

	public Purchases(Long id, Date instantDate, PurchasesStatus status,
			List<ItemPurchases> itemPurchaseList, Market market) {
		super();
		this.id = id;
		this.instantDate = instantDate;
		this.status = status.getId();
		this.itemPurchaseList = itemPurchaseList;
		this.market = market;
	}
	

	public Double getTotal() {
		
		Double[] soma = new Double[1];
		soma[0]=0.0;
		itemPurchaseList.forEach((x) -> soma[0]+=(x.getPrice().multiply(BigDecimal.valueOf(x.getQuantity()))).doubleValue());
		return soma[0];
	}

	public PurchasesStatus getStatus() {
		return PurchasesStatus.toEnum(status);
	}

	public void setStatus(PurchasesStatus status) {
		this.status = status.getId();
	}

	@Override
	public String toString() {
		NumberFormat nf = NumberFormat.getCurrencyInstance(new Locale("pt", "BR"));
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy", new Locale("pt", "BR"));     
		StringBuilder builder = new StringBuilder();
		builder.append("Compra id=");
		builder.append(getId());
		builder.append(", Mercado=");
		builder.append(getMarket());
		builder.append(", Data=");
		builder.append(sdf.format(getInstantDate()));
		builder.append(", status=");
		builder.append(PurchasesStatus.toEnum(status).getDisplayName());
		builder.append(", items=");
		itemPurchaseList.forEach((x) -> builder.append(x.toString()));
		builder.append(", Total=");
		builder.append(nf.format(getTotal()));
		return builder.toString();
	}
	
	

}
