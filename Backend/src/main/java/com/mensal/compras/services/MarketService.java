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

import com.mensal.compras.dto.MarketDTO;
import com.mensal.compras.entity.Market;
import com.mensal.compras.repositories.MarketRepository;
import com.mensal.compras.services.exception.DataIntegrityException;
import com.mensal.compras.services.exception.ObjectNFException;

@Service
public class MarketService {
	@Autowired
	private MarketRepository repo;

	public Market findById(Long id) {
		Optional<Market> obj = repo.findById(id);

		return obj.orElseThrow(() -> new ObjectNFException("Loja não encontrado! Id: " + id));
	}

	public List<Market> findAll() {
		List<Market> list = repo.findAll();
		return list;
	}

	@Transactional
	public Market insert(Market obj) {
		obj.setId(null);
		try {
			repo.save(obj);
		} catch (DataIntegrityViolationException e) {
			if (e.getMostSpecificCause().getMessage().contains("Unique")) {
				throw new DataIntegrityException("Loja já cadastrada!");
			}

		}
		catch (TransactionalException e) {
			
				throw new DataIntegrityException(e.getMessage());
			

		}
		return obj;
	}

	@Transactional
	public Market update(Market obj) {
		Market newObj = findById(obj.getId());
		updateData(newObj, obj);
		try {
			repo.save(obj);
		} catch (DataIntegrityViolationException e) {
			if (e.getMostSpecificCause().getMessage().contains("Unique")) {
				throw new DataIntegrityException("Loja já cadastrada!");
			}

		}
		return obj;
	}

	private void updateData(Market newObj, Market obj) {
		newObj = Market.builder().id(newObj.getId()).name(obj.getName()).blocked(obj.isBlocked())
				.cnpj(obj.getCnpj()).build();

	}

	@Transactional
	public void delete(Long id) {
		try {
			repo.deleteById(id);
		} catch (DataIntegrityViolationException e) {
			throw new DataIntegrityException("Não é possível excluir uma mercado que possui compras!");
		}	
	}

	public Page<Market> findPage(Integer page, Integer linesPerPage, String orderBy,
			String direction) {
		PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction),
				orderBy);
		return repo.findAll(pageRequest);
	}

	public Market fromDTO(MarketDTO objDTO) {
		return Market.builder().id(objDTO.getId()).name(objDTO.getName())
				.blocked(objDTO.isBlocked()).cnpj(objDTO.getCnpj()).build();
	}
}
