package com.mensal.compras.entity;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.mensal.compras.entity.enums.Permissions;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Data
@NoArgsConstructor
public class User implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String name;
	@Column(unique = true)
	private String email;
	private String password;
	
	@Setter(value = AccessLevel.NONE)
	@ElementCollection(fetch=FetchType.EAGER)
	@CollectionTable(name="Permissions")
	private Set<Integer> permissionList = new HashSet<Integer>();
	
	

	public Set<Permissions> getPermissions() {
		return permissionList.stream().map(x -> Permissions.toEnum(x)).collect(Collectors.toSet());
	}
	
	public void addPermissions(Permissions permission) {
		permissionList.add(permission.getId());
	}

	public User(Long id, String name, String email, String password, Set<Integer> permissionList) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
		this.permissionList = permissionList;
	}


}
