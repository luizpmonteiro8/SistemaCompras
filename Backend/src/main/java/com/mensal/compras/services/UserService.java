package com.mensal.compras.services;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.mensal.compras.dto.UserDTO;
import com.mensal.compras.entity.User;
import com.mensal.compras.entity.enums.Permissions;
import com.mensal.compras.repositories.UserRepository;
import com.mensal.compras.security.UserSS;
import com.mensal.compras.services.exception.AuthorizationException;
import com.mensal.compras.services.exception.DataIntegrityException;
import com.mensal.compras.services.exception.ObjectNFException;

@Service
public class UserService {
	@Autowired
	private UserRepository repo;

	@Autowired
	private BCryptPasswordEncoder pe;

	public User findById(Long id) {

		UserSS user = UserService.authenticated();
		if (user == null || !user.hasRole(Permissions.ADMIN) && !id.equals(user.getId())) {
			throw new AuthorizationException("Acesso negado para" + user.getUsername());
		}

		Optional<User> obj = repo.findById(id);

		return obj.orElseThrow(() -> new ObjectNFException("Usuário não encontrado! Id: " + id));
	}

	public List<User> findAll() {
		UserSS user = UserService.authenticated();
		if (user == null || !user.hasRole(Permissions.ADMIN)) {
			throw new AuthorizationException("Acesso negado para" + user.getUsername());
		}

		List<User> list = repo.findAll();
		return list;
	}

	@Transactional
	public User insert(User obj) {
		obj.setId(null);
		try {
			repo.save(obj);
		} catch (DataIntegrityViolationException e) {
			if (e.getMostSpecificCause().getMessage().contains("Unique")) {
				throw new DataIntegrityException("Usuário já cadastrada!");
			}

		}
		return obj;
	}

	@Transactional
	public User update(User obj) {
		User newObj = findById(obj.getId());
		updateData(newObj, obj);
		try {
			repo.save(obj);
		} catch (DataIntegrityViolationException e) {
			if (e.getMostSpecificCause().getMessage().contains("Unique")) {
				throw new DataIntegrityException("Usuário já cadastrada!");
			}

		}
		return obj;
	}

	private void updateData(User newObj, User obj) {
		newObj.setId(obj.getId());
		newObj.setName(obj.getName());
		newObj.setEmail(obj.getEmail());
		newObj.setPassword(pe.encode(obj.getPassword()));
		newObj.getPermissionList().addAll(obj.getPermissionList());

	}

	@Transactional
	public void delete(Long id) {
		try {
			repo.deleteById(id);
		} catch (DataIntegrityViolationException e) {
			throw new DataIntegrityException("Não é possível usuário em uso!");
		}
	}

	public Page<User> findPage(Integer page, Integer linesPerPage, String orderBy,
			String direction) {
		PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction),
				orderBy);
		return repo.findAll(pageRequest);
	}

	public User fromDTO(UserDTO objDTO) {
		User user = new User();

		user.setId(objDTO.getId());
		user.setName(objDTO.getName());
		user.setEmail(objDTO.getEmail());
		user.setPassword(pe.encode(objDTO.getPassword()));
		user.addPermissions(Permissions.ADMIN);

		return user;
	}

	public static UserSS authenticated() {
		try {
			return (UserSS) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		} catch (Exception e) {
			return null;
		}
	}
}
