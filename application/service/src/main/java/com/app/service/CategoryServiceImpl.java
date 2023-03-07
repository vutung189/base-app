package com.app.service;

import com.app.model.Category;
import com.app.model.Skill;
import com.app.repository.CategoryRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

@Service
public class CategoryServiceImpl implements CategoryService {


    private CategoryRepository categoryRepository;

    public CategoryServiceImpl( CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public void save(List<Category> categories) {
        categoryRepository.saveAll(categories);
    }

    public void indexCategories(Map<String, Object> mapData) {
        int index = 1;
        List<Category> categories = new ArrayList<>();
        Iterator<String> iterator = mapData.keySet().iterator();
        while (iterator.hasNext()) {
            String groupCategory = iterator.next();
            List<Object> categoryList = (List<Object>) mapData.get(groupCategory);

            for (Object obj : categoryList) {
                Map<String, List<String>> mapSkill = (Map<String, List<String>>) obj;
                Iterator<Map.Entry<String, List<String>>> iterator2 = mapSkill.entrySet().iterator();
                while (iterator2.hasNext()) {
                    Map.Entry<String, List<String>> entry = iterator2.next();
                    String key = entry.getKey();

                    if (key != null && (key.endsWith("skills") || key.endsWith("Skills"))) {
                        List<Skill> skills = new ArrayList<>();
                        List<String> values = entry.getValue();
                        for (String item : values) {
                            Skill skill = new Skill(item, "");
                            skills.add(skill);
                        }

                        Category category = new Category();
                        category.setId("" + index++);
                        category.setGroup(groupCategory);
                        category.setTitle(key.substring(0, key.length() - 6).trim());
                        category.setSkills(skills);
                        categories.add(category);
                    }
                }
            }
        }

        // index category Elasticsearch
        save(categories);
    }

    @Override
    public Page<Category> find(String title, Pageable pageable) {
        return categoryRepository.findByTitle(title, pageable);
    }

}
