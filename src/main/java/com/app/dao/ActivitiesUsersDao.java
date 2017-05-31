/*
 * Copyright (c) Krakfin
 * All rights reserved
 */
package com.app.dao;

import com.app.model.ActivitiesUsers;
import java.util.List;

public interface ActivitiesUsersDao {

    List<ActivitiesUsers> findAll();

    ActivitiesUsers findById(int id);

    List<ActivitiesUsers> findByUserId(int id);

    void save(ActivitiesUsers user);

    void delete(int id);
}
