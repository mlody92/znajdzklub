/*
 * Copyright (c) Krakfin
 * All rights reserved
 */
package com.app.service;

import com.app.dao.CoordinatesDao;
import com.app.model.Coordinates;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("coordinatesService")
@Transactional
public class CoordinatesServiceImpl implements CoordinatesService {

    @Autowired
    private CoordinatesDao dao;

    public Coordinates findByKey(String id) {
        return dao.findByKey(id);
    }

    public List<String> findFilter(String kod, int km) {
        return dao.findFilter(kod, km);
    }
}