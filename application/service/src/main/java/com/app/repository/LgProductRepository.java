package com.app.repository;


import com.app.entity.LgProduct;
import java.util.Date;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface LgProductRepository {

    Page<LgProduct> findAll(String lgReference, String lgType, Date issueDate, Date startDate,
        Date endDate, String iban, String applicantCif, Pageable pageable);

    LgProduct findById(Long id);
}
