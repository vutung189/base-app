package com.app.controller;

import com.app.entity.LgProduct;
import com.app.service.LgProductService;
import java.util.Date;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class LgProductController {

  private final LgProductService lgProductService;


  public LgProductController(LgProductService lgProductService) {
    this.lgProductService = lgProductService;
  }

  @GetMapping("/lg/find-all")
  public Page<LgProduct> findAll(
      @RequestParam(required = false) String lgReference,
      @RequestParam(required = false) String lgType,
      @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date issueDate,
      @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date startDate,
      @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date endDate,
      @RequestParam(required = false) String iban,
      @RequestParam(required = false) String applicantCif,
      Pageable pageable) {
    return lgProductService.findAll(lgReference, lgType, issueDate, startDate, endDate, iban,
        applicantCif, pageable
    );
  }

  @GetMapping("/lg/find")
  public LgProduct findById(@RequestParam Long id) {
    return lgProductService.findById(id);
  }

}
