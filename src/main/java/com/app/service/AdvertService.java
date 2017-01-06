/*
 * Copyright (c) Krakfin
 * All rights reserved
 */
package com.app.service;

import com.app.model.Advert;
import java.util.List;

public interface AdvertService {

    Advert findById(int id);

    List<Advert> findByCategoryId(int id);

    Advert findByTitle(String title);

    String save(Advert user);

    void update(Advert user);

    void delete(int id);

    List<Advert> findAll();

    boolean isUnique(Advert advert);
}
