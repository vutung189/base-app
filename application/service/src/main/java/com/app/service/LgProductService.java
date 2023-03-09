package com.app.service;

import com.app.entity.LgProduct;
import java.util.Date;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service class for managing users.
 */
public interface LgProductService {

  Page<LgProduct> findAll(String lgReference,String lgType, Date issueDate, Date startDate,
      Date endDate, String iban, String applicantCif, Pageable pageable);

  LgProduct findById(Long id);
}
