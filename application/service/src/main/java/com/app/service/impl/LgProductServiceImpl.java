package com.app.service.impl;

import com.app.entity.LgProduct;
import com.app.repository.LgProductRepository;
import com.app.service.LgProductService;
import com.app.utils.DateUtil;
import java.util.Calendar;
import java.util.Date;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class LgProductServiceImpl implements LgProductService {

  private final LgProductRepository productRepository;

  public LgProductServiceImpl(LgProductRepository productRepository) {
    this.productRepository = productRepository;
  }

  @Override
  public Page<LgProduct> findAll(String lgReference, String lgType, Date issueDate, Date startDate,
      Date endDate, String iban, String applicantCif, Pageable pageable) {
    if (endDate != null) {
      endDate = DateUtil.getEndOfDay(endDate);
    }
    return productRepository.findAll(lgReference, lgType, issueDate, startDate, endDate, iban,
        applicantCif, pageable);
  }

  @Override
  public LgProduct findById(Long id) {
    return productRepository.findById(id);
  }
}
