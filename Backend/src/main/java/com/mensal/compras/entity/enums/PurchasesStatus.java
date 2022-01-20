package com.mensal.compras.entity.enums;

public enum PurchasesStatus {

	PENDING(1,"Em rota"), DELIVERED(2,"Entregue");


	private Integer id;
	private String displayName;

	private PurchasesStatus(Integer id, String displayName) {
		this.id = id;
		this.displayName = displayName;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getDisplayName() {
		return displayName;
	}

	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}
	
	public static PurchasesStatus toEnum(Integer id) {
		
		if(id==null) {
			return null;
		}
		
		for (PurchasesStatus x : PurchasesStatus.values()) {
			if(id.equals(x.getId())) {
				return x;
			}
			
		}
		
		throw new IllegalArgumentException("Invalido id: " + id);
	}
	
	public static PurchasesStatus toEnum(String displayName) {
		
		if(displayName==null) {
			return null;
		}
		
		for (PurchasesStatus x : PurchasesStatus.values()) {
			if(displayName.equals(x.getDisplayName())) {
				return x;
			}
			
		}
		
		throw new IllegalArgumentException("Invalido displayName: " + displayName);
	}
}
