package com.app.service;

import com.app.dao.CategoryDao;
import com.app.model.Category;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("categoryService")
@Transactional
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryDao dao;

    public Category findById(int id) {
        return dao.findById(id);
    }

    public String save(Category category) {
        dao.save(category);
        return "success";
    }

    public void update(Category category) {
        Category entity = dao.findById(category.getId());
        if (entity != null) {
            entity.setName(category.getName());

        }
    }

    public void delete(String name) {
        dao.delete(name);
    }

    public List<Category> findAll() {
        return dao.findAll();
    }

    public boolean isNameUnique(Integer id, String name) {
        Category category = findByName(name);
        return (category == null || ((id != null) && (category.getId() == id)));
    }

    public Category findByName(String name) {
        Category category = dao.findByName(name);
        return category;
    }
}
