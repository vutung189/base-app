package com.app.repository;

import com.app.model.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends CrudRepository<Category, String> {
    Page<Category> findByTitle(String title, Pageable pageable);

    Page<Category> findByTitleAndFilteredTagQuery(String title, String tag, Pageable pageable);
}
