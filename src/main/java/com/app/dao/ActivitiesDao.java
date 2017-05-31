/*
 * Copyright (c) Krakfin
 * All rights reserved
 */
package com.app.dao;

import com.app.model.Activities;
import java.util.List;

public interface ActivitiesDao {
    List<Activities> findAll();

    void save(Activities activities);

    void delete(int id);
}
