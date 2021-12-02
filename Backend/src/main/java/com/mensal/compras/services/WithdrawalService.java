package com.mensal.compras.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.HandlerMapping;

import com.mensal.compras.dto.ItemWithdrawalDTO;
import com.mensal.compras.dto.WithdrawalDTO;
import com.mensal.compras.entity.ItemWithdrawal;
import com.mensal.compras.entity.Product;
import com.mensal.compras.entity.Stock;
import com.mensal.compras.entity.Withdrawal;
import com.mensal.compras.repositories.ItemWithdrawalRepository;
import com.mensal.compras.repositories.ProductRepository;
import com.mensal.compras.repositories.StockRepository;
import com.mensal.compras.repositories.WithdrawalRepository;
import com.mensal.compras.services.exception.ConstraintVException;
import com.mensal.compras.services.exception.DataIntegrityException;
import com.mensal.compras.services.exception.ObjectNFException;

@Service
public class WithdrawalService {
	@Autowired
	private WithdrawalRepository repo;

	@Autowired
	private ItemWithdrawalRepository itemRepo;

	@Autowired
	private StockRepository stockRepo;

	@Autowired
	private ProductRepository productRepo;

	@Autowired
	private HttpServletRequest request;

	public Withdrawal findById(Long id) {
		Optional<Withdrawal> objConsumption = repo.findById(id);

		return objConsumption
				.orElseThrow(() -> new ObjectNFException("Retirada não encontrado! Id: " + id));
	}

	public List<Withdrawal> findAll() {
		List<Withdrawal> list = repo.findAll();
		return list;
	}

	@Transactional
	public Withdrawal insert(Withdrawal obj) {
		obj.setId(null);
		obj.setInstantDate(new Date());

		List<Stock> stockList = new ArrayList<>();

		try {
			obj = repo.save(obj);
			for (ItemWithdrawal item : obj.getItemWithdrawalsList()) {
				item.setWithdrawal(obj);
				stockList.add(item.getStock());
				item.getStock().removeStock(item.getQuantity());
			}
			itemRepo.saveAll(obj.getItemWithdrawalsList());
			stockRepo.saveAll(stockList);
		} catch (DataIntegrityViolationException e) {
			if (e.getMostSpecificCause().getMessage().contains("Unique")) {
				throw new ConstraintVException("Retirada já cadastrada!");
			}

		}
		return obj;
	}

	@Transactional
	public Withdrawal update(Withdrawal obj) {
		Withdrawal newObj = findById(obj.getId());
		addStock(newObj);
		newObj = updateData(newObj, obj);

		List<Stock> stockList = new ArrayList<>();
		try {
			repo.deleteById(newObj.getId());
			newObj.setId(null);
			repo.save(newObj);			
			for (ItemWithdrawal item : newObj.getItemWithdrawalsList()) {
				item.setWithdrawal(newObj);
				stockList.add(item.getStock());
				item.getStock().removeStock(item.getQuantity());
			}
			
			itemRepo.saveAll(newObj.getItemWithdrawalsList());
			stockRepo.saveAll(stockList);
		} catch (DataIntegrityViolationException e) {
			if (e.getMostSpecificCause().getMessage().contains("Unique")) {
				throw new ConstraintVException("Retirada já cadastrada!");
			}

		}
		return obj;
	}

	public void delete(Long id) {
		findById(id);
		try {
			repo.deleteById(id);
		} catch (DataIntegrityViolationException e) {
			throw new DataIntegrityException(
					"Não é possível excluir uma retirada que possui produtos!");
		}
	}

	public Page<Withdrawal> findPage(Integer page, Integer linesPerPage, String orderBy,
			String direction) {
		PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction),
				orderBy);
		return repo.findAll(pageRequest);
	}

	private Stock addStock(Withdrawal withdrawal) {
		for (ItemWithdrawal item : withdrawal.getItemWithdrawalsList()) {
			Stock stock = item.getStock();
			stock.addStock(item.getQuantity());
			stockRepo.save(stock);
		}

		return null;
	}

	private Withdrawal updateData(Withdrawal newObj, Withdrawal obj) {
		return Withdrawal.builder().id(newObj.getId()).instantDate(newObj.getInstantDate())
				.itemWithdrawalsList(obj.getItemWithdrawalsList()).build();
	}

	public Withdrawal fromDTO(WithdrawalDTO objDTO) {
		List<ItemWithdrawal> itemWithdrawalList = new ArrayList<>();

		for (ItemWithdrawalDTO item : objDTO.getItemWithdrawalDTOList()) {
			Product product = productRepo.findById(item.getProductId()).get();
			Stock stock = stockRepo.findByProduct(product);
			ItemWithdrawal itemWithdrawal = new ItemWithdrawal(null, item.getQuantity(), null,
					stock);
			itemWithdrawalList.add(itemWithdrawal);
		}

		return Withdrawal.builder().itemWithdrawalsList(itemWithdrawalList).build();
	}

	public Withdrawal fromDTOUpdate(WithdrawalDTO objDTO) {
		@SuppressWarnings("unchecked")
		Map<String, String> map = (Map<String, String>) request
				.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);
		Long uriId = Long.parseLong(map.get("id"));

		List<ItemWithdrawal> itemWithdrawalList = new ArrayList<>();

		for (ItemWithdrawalDTO item : objDTO.getItemWithdrawalDTOList()) {
			Product product = productRepo.findById(item.getProductId()).get();
			Stock stock = stockRepo.findByProduct(product);
			ItemWithdrawal itemWithdrawal = new ItemWithdrawal(item.getId(), item.getQuantity(),
					null, stock);
			itemWithdrawalList.add(itemWithdrawal);
		}

		return Withdrawal.builder().id(uriId).itemWithdrawalsList(itemWithdrawalList).build();
	}
}
