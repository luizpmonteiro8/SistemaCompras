package com.mensal.compras.services;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;
import javax.transaction.TransactionalException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.mensal.compras.dto.EntraceExitDTO;
import com.mensal.compras.entity.EntraceExit;
import com.mensal.compras.entity.Product;
import com.mensal.compras.entity.Stock;
import com.mensal.compras.repositories.EntraceExitRepository;
import com.mensal.compras.repositories.ProductRepository;
import com.mensal.compras.repositories.StockRepository;
import com.mensal.compras.services.exception.DataIntegrityException;
import com.mensal.compras.services.exception.ObjectNFException;

@Service
public class EntraceExitService {
	@Autowired
	private EntraceExitRepository repo;

	@Autowired
	private ProductRepository productRepo;

	@Autowired
	private StockRepository stockRepo;

	public EntraceExit findById(Long id) {
		Optional<EntraceExit> obj = repo.findById(id);

		return obj.orElseThrow(() -> new ObjectNFException("Entrada/Saida não encontrado! Id: " + id));
	}

	public List<EntraceExit> findAll() {
		List<EntraceExit> list = repo.findAll();
		return list;
	}

	// 0 entrace 1 exit
	@Transactional
	public EntraceExit insert(EntraceExit obj) {
		obj.setId(null);

		if (obj.getType() == 0) {
			obj.getStock().addStock(obj.getQuantity());
		} else if (obj.getType() == 1) {
			if(obj.getStock().getQuantity().compareTo(obj.getQuantity())>= 0) {
				obj.getStock().removeStock(obj.getQuantity());				
			}else {
				throw new DataIntegrityException("Item insuficiente no estoque! Disponível:"
			+obj.getStock().getQuantity().toString().replace(".", ","));
			}
			
		}

		try {
			stockRepo.save(obj.getStock());
			repo.save(obj);			
		} catch (DataIntegrityViolationException e) {
			throw new DataIntegrityException(e.getMessage());			
		} catch (TransactionalException e) {
			throw new DataIntegrityException(e.getMessage());
		}
		return obj;
	}

	// 0 entrace 1 exit
	@Transactional
	public EntraceExit update(EntraceExit obj) {
		EntraceExit newObj = findById(obj.getId());

		if (newObj.getType() == 0) {
			newObj.getStock().removeStock(newObj.getQuantity());
		} else if (newObj.getType() == 1) {
			newObj.getStock().addStock(newObj.getQuantity());
		}		

		try {
			stockRepo.save(newObj.getStock());
		} catch (DataIntegrityViolationException e) {
			throw new DataIntegrityException("Entrada/Saida já cadastrada!");
		} catch (TransactionalException e) {
			throw new DataIntegrityException(e.getMessage());
		}
		
		newObj= obj;		

		if (newObj.getType() == 0) {
			newObj.getStock().addStock(newObj.getQuantity());
		} else if (newObj.getType() == 1) {
			newObj.getStock().removeStock(newObj.getQuantity());
		}

		try {
			repo.save(newObj);
			stockRepo.save(newObj.getStock());
		} catch (DataIntegrityViolationException e) {
			if (e.getMostSpecificCause().getMessage().contains("Unique")) {
				throw new DataIntegrityException("Entrada/Saida já cadastrada!");
			}

		}
		return newObj;
	}

	

	@Transactional
	public void delete(Long id) {
		EntraceExit obj = findById(id);

		if (obj.getType() == 0) {
			obj.getStock().removeStock(obj.getQuantity());
		} else if (obj.getType() == 1) {
			obj.getStock().addStock(obj.getQuantity());
		}

		try {
			stockRepo.save(obj.getStock());
		} catch (DataIntegrityViolationException e) {
			throw new DataIntegrityException("Entrada/Saida já cadastrada!");
		} catch (TransactionalException e) {
			throw new DataIntegrityException(e.getMessage());
		}

		try {
			repo.deleteById(id);
		} catch (DataIntegrityViolationException e) {
			throw new DataIntegrityException("Não é possível excluir uma entrada/saida que possui compras!");
		}
	}

	public Page<EntraceExit> findPage(Integer page, Integer linesPerPage, String orderBy, String direction) {
		PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction), orderBy);
		return repo.findAll(pageRequest);
	}

	public EntraceExit fromDTO(EntraceExitDTO objDTO) {
		Product product = productRepo.findById(objDTO.getProductId()).get();
		Stock stock = stockRepo.findByProduct(product);

		return EntraceExit.builder().id(objDTO.getId()).stock(stock).quantity(objDTO.getQuantity())
				.type(objDTO.getType()).build();
	}
}
