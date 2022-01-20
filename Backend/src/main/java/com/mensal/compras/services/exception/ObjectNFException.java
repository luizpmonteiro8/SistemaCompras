package com.mensal.compras.services.exception;

public class ObjectNFException extends RuntimeException{
	private static final long serialVersionUID = 1L;
	
	public ObjectNFException(String msg) {
		super(msg);
	}
	
	public ObjectNFException(String msg,Throwable cause) {
		super(msg,cause);		
	}

	
}
