package com.mensal.compras.services;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.mensal.compras.dto.ProductDTO;
import com.mensal.compras.entity.Category;
import com.mensal.compras.entity.Product;
import com.mensal.compras.entity.Stock;
import com.mensal.compras.repositories.CategoryRepository;
import com.mensal.compras.repositories.ProductRepository;
import com.mensal.compras.repositories.StockRepository;
import com.mensal.compras.services.exception.DataIntegrityException;
import com.mensal.compras.services.exception.ObjectNFException;

@Service
public class ProductService {
	Product newObj;

	@Autowired
	private ProductRepository repo;

	@Autowired
	private CategoryRepository categoryRepo;

	@Autowired
	private StockRepository stockRepo;

	public Product findById(Long id) {
		Optional<Product> obj = repo.findById(id);

		return obj.orElseThrow(() -> new ObjectNFException("Produto não encontrado! Id: " + id));
	}

	public List<Product> findAll() {
		List<Product> list = repo.findAll();
		return list;
	}

	@Transactional
	public Product insert(Product obj) {
		Stock stock = Stock.builder().product(obj).quantity(BigDecimal.ZERO).build();
		obj.setId(null);

		try {
			repo.save(obj);
			stockRepo.save(stock);

		} catch (DataIntegrityViolationException e) {
			if (e.getMostSpecificCause().getMessage().contains("Unique")) {
				throw new DataIntegrityException("Produto já cadastrada!");
			}

		}
		return obj;
	}

	@Transactional
	public Product update(Product obj) {
		newObj = findById(obj.getId());
		updateData(newObj, obj);
		Stock newStock = stockRepo.findByProduct(obj);
		newStock.setProduct(obj);

		try {
			repo.save(newObj);
			stockRepo.save(newStock);
		} catch (DataIntegrityViolationException e) {
			if (e.getMostSpecificCause().getMessage().contains("Unique")) {
				throw new DataIntegrityException("Produto já cadastrada!");
			}

		}
		return obj;
	}

	private void updateData(Product newObj, Product obj) {
		newObj.setName(obj.getName());
		newObj.setStock(obj.getStock());
		newObj.setBlocked(obj.isBlocked());
		newObj.setCategory(obj.getCategory());
		newObj.setQuantMin(obj.getQuantMin());

	}

	@Transactional
	public void delete(Long id) {
		Stock stock = stockRepo.findByProduct(findById(id));
		try {
			repo.deleteById(id);
			stockRepo.delete(stock);
		} catch (DataIntegrityViolationException e) {
			throw new DataIntegrityException("Não é possível excluir uma produto que possui compras!");
		}
	}

	public Page<Product> findPage(Integer page, Integer linesPerPage, String orderBy, String direction) {
		PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction), orderBy);
		return repo.findAll(pageRequest);
	}

	public Product fromDTO(ProductDTO objDTO) {
		Category category = categoryRepo.findById(objDTO.getCategoryId()).get();

		return Product.builder().id(objDTO.getId()).name(objDTO.getName()).blocked(objDTO.isBlocked())
				.category(category).quantMin(objDTO.getQuantMin()).build();
	}
}
