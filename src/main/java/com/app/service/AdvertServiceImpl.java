/*
 * Copyright (c) Krakfin
 * All rights reserved
 */
package com.app.service;

import com.app.dao.AdvertDao;
import com.app.model.Advert;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("advertService")
@Transactional
public class AdvertServiceImpl implements AdvertService {

    @Autowired
    private AdvertDao dao;

    public Advert findById(int id) {
        return dao.findById(id);
    }

    public String save(Advert advert) {
        dao.save(advert);
        return "success";
    }

    public void update(Advert advert) {
        Advert entity = dao.findById(advert.getId());
        if (entity != null) {
            entity.setAddress(advert.getAddress());
            entity.setCategoryId(advert.getCategoryId());
            entity.setDate(advert.getDate());
            entity.setDescription(advert.getDescription());
            entity.setEmail(advert.getEmail());
            entity.setPhone(advert.getPhone());
            entity.setPostalCode(advert.getPostalCode());
            entity.setStatus(advert.getStatus());
            entity.setTitle(advert.getTitle());
            entity.setWebsite(advert.getWebsite());
            entity.setCategoryId(advert.getCategoryId());
        }
    }

    public void delete(int id) {
        dao.delete(id);
    }

    public List<Advert> findAll() {
        return dao.findAll();
    }

    public boolean isUnique(Advert newAdvert) {
        Advert advert = findByTitle(newAdvert.getTitle());
        return (advert == null || ((newAdvert.getId() != null) && (advert.getId() == newAdvert.getId())));
    }

    public Advert findByTitle(String title) {
        return dao.findByTitle(title);
    }
}