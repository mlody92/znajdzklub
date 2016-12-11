/*
 * Copyright (c) Krakfin
 * All rights reserved
 */
package com.app.service;

import com.app.model.Category;
import java.util.List;

public interface CategoryService {

    Category findById(int id);

    String save(Category category);

    void update(Category category);

    void delete(int id);

    List<Category> findAll();
}
