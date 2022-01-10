package com.mensal.compras.repositories.projections;

import java.math.BigDecimal;

public interface PurchasesFromMonth {
	Integer getMonth();
	BigDecimal getTotal();
}
