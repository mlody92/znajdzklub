package com.app.service;

import com.app.model.ActivitiesUsers;
import java.util.List;

public interface ActivitiesUsersService {

    ActivitiesUsers findById(int id);

    List<ActivitiesUsers> findByUserId(int id);

    String save(ActivitiesUsers user);

    void delete(int id);

    List<ActivitiesUsers> findAll();

    boolean isUnique(int user, int act);
}