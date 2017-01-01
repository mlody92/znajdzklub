/*
 * Copyright (c) Krakfin
 * All rights reserved
 */
package com.app.service;

import com.app.model.Category;
import java.util.List;

public interface CategoryService {

    Category findById(int id);

    Category findByName(String name);

    String save(Category category);

    void update(Category category);

    void delete(String name);

    List<Category> findAll();

    boolean isNameUnique(Integer id, String name);
}
