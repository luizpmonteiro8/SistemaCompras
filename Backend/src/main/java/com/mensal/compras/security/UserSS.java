package com.mensal.compras.security;

import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.mensal.compras.entity.enums.Permissions;

public class UserSS implements UserDetails {
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String email;
	private String password;
	private String name;
	private Collection<? extends GrantedAuthority> authorities;
	
	public UserSS() {
	}
	
	public UserSS(Long id, String email, String password,String name, Set<Permissions> permissions) {
		super();
		this.id = id;
		this.email = email;
		this.password = password;
		this.name = name;
		this.authorities = permissions.stream().map(x -> new SimpleGrantedAuthority(x.getDisplayName())).collect(Collectors.toList());
	}

	public Long getId() {
		return id;
	}
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return name;
	}
	
	public String getEmail() {
		return email;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}	

	public boolean hasRole(Permissions permissions) {
		return getAuthorities().contains(new SimpleGrantedAuthority(permissions.getDisplayName()));
	}
}
