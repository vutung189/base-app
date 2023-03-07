package com.app.controller;

import com.app.model.Category;
import com.app.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SearchController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/search")
    public Page<Category> updatePlace(@RequestParam String title, Pageable pageable) {
        return categoryService.find(title, pageable);
    }

}
