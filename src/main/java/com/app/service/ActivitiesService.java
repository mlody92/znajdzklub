package com.app.service;

import com.app.model.Activities;
import java.util.List;

public interface ActivitiesService {

    List<Activities> findAll();

    String save(Activities activities);

    void delete(int id);
}
