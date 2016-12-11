/*
 * Copyright (c) Krakfin
 * All rights reserved
 */
package com.app.dao;

import com.app.model.Advert;
import com.app.model.Category;
import java.util.List;

public interface CategoryDao {

    Category findById(int id);

    void save(Category user);

    void delete(int id);

    List<Category> findAll();
}
