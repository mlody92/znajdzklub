package com.app.service;

import com.app.dao.ActivitiesDao;
import com.app.dao.AdvertDao;
import com.app.dao.AdvertDaoImpl;
import com.app.model.Activities;
import com.app.model.Advert;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("activitiesService")
@Transactional
public class ActivitiesServiceImpl implements ActivitiesService {

    @Autowired
    private ActivitiesDao dao;

    public List<Activities> findAll() {
        return dao.findAll();
    }

    public String save(Activities activities) {
        dao.save(activities);
        return "success";
    }

    public void delete(int id) {
        dao.delete(id);
    }
}