package com.mensal.compras.entity.enums;

public enum Permissions {

	ADMIN(1,"ROLE_ADMIN"),	
	READ_CATEGORY(2,"ROLE_READ_CATEGORY"),
	WRITE_CATEGORY(3,"ROLE_WRITE_CATEGORY"),
	READ_ITEM_PURCHASES(4,"ROLE_ITEM_PURCHASES"),
	WRITE_ITEM_PURCHASES(5,"ROLE_WRITE_ITEM_PURCHASES"),
	READ_ITEM_WITHDRAWAL(6,"ROLE_READ_ITEM_WITHDRAWAL"),
	WRITE_ITEM_WITHDRAWAL(7,"ROLE_WRITE_ITEM_WITHDRAWAL"),
	READ_MARKET(8,"ROLE_READ_MARKET"),
	WRITE_MARKET(9,"ROLE_WRITE_MARKET"),
	READ_PRODUCT(10,"ROLE_READ_PRODUCT"),
	WRITE_PRODUCT(11,"ROLE_WRITE_PRODUCT"),
	READ_PURCHASES(12,"ROLE_READ_PURCHASES"),
	WRITE_PURCHASES(13,"ROLE_WRITE_PURCHASES"),
	READ_STOCK(14,"ROLE_READ_STOCK"),
	WRITE_STOCK(15,"ROLE_WRITE_STOCK"),
	READ_WITHDRAWAL(16,"ROLE_READ_WITHDRAWAL"),
	WRITE_WITHDRAWAL(17,"ROLE_WRITE_WITHDRAWAL"),
	READ_ENTRACEEXIT(18,"ROLE_READ_ENTRACEEXIT"),
	WRITE_ENTRACEEXIT(19,"ROLE_WRITE_ENTRACEEXIT"),
	READ_DASHBOARD(18,"ROLE_READ_DASHBOARD");

	private Integer id;
	private String displayName;

	private Permissions(Integer id, String displayName) {
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
	
	public static Permissions toEnum(Integer id) {
		
		if(id==null) {
			return null;
		}
		
		for (Permissions x : Permissions.values()) {
			if(id.equals(x.getId())) {
				return x;
			}
			
		}
		
		throw new IllegalArgumentException("Invalido id: " + id);
	}
}
