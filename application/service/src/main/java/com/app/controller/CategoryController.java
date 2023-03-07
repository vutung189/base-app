package com.app.controller;

import com.app.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PutMapping("/categories/index")
    public ResponseEntity<?> updatePlace(@RequestBody Map<String, Object> mapData) {
        categoryService.indexCategories(mapData);
        return ResponseEntity.ok().body(null);

    }

}
