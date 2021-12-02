package com.mensal.compras.services;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.mensal.compras.dto.CategoryDTO;
import com.mensal.compras.entity.Category;
import com.mensal.compras.repositories.CategoryRepository;
import com.mensal.compras.services.exception.DataIntegrityException;
import com.mensal.compras.services.exception.ObjectNFException;

@Service
public class CategoryService {
	Category newObj;

	@Autowired
	private CategoryRepository repo;

	public Category findById(Long id) {
		Optional<Category> obj = repo.findById(id);

		return obj.orElseThrow(() -> new ObjectNFException("Categoria não encontrado! Id: " + id));
	}

	public List<Category> findAll() {
		List<Category> list = repo.findAll();
		return list;
	}

	@Transactional
	public Category insert(Category obj) {		
		obj.setId(null);

		try {
			repo.save(obj);	

		} catch (DataIntegrityViolationException e) {
			if (e.getMostSpecificCause().getMessage().contains("Unique")) {
				throw new DataIntegrityException("Categoria já cadastrada!");
			}

		}
		return obj;
	}

	@Transactional
	public Category update(Category obj) {
		newObj = findById(obj.getId());
		updateData(newObj, obj);		
		try {
			repo.save(newObj);		
		} catch (DataIntegrityViolationException e) {
			if (e.getMostSpecificCause().getMessage().contains("Unique")) {
				throw new DataIntegrityException("Categoria já cadastrada!");
			}

		}
		return obj;
	}

	private void updateData(Category newObj, Category obj) {
		newObj.setName(obj.getName());			

	}

	@Transactional
	public void delete(Long id) {		
		try {
			repo.deleteById(id);		
		} catch (DataIntegrityViolationException e) {
			throw new DataIntegrityException(
					"Não é possível deletar categoria com produtos cadastrado!");
		}
	}

	public Page<Category> findPage(Integer page, Integer linesPerPage, String orderBy,
			String direction) {
		PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction),
				orderBy);
		return repo.findAll(pageRequest);
	}

	public Category fromDTO(CategoryDTO objDTO) {
		return Category.builder().id(objDTO.getId()).name(objDTO.getName()).build();
	}
}
