package com.app.service;

import com.app.dao.ActivitiesUsersDao;
import com.app.model.ActivitiesUsers;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("activitiesUsersService")
@Transactional
public class ActivitiesUsersServiceImpl implements ActivitiesUsersService {

    @Autowired
    private ActivitiesUsersDao dao;

    public ActivitiesUsers findById(int id) {
        return dao.findById(id);
    }

    public List<ActivitiesUsers> findByUserId(int id) {
        return dao.findByUserId(id);
    }

    public String save(ActivitiesUsers activitiesUsers) {
        dao.save(activitiesUsers);
        return "success";
    }

    public void delete(int id) {
        dao.delete(id);
    }

    public List<ActivitiesUsers> findAll() {
        return dao.findAll();
    }

    public boolean isUnique(int user_id, int act_id) {
        List<ActivitiesUsers> activitiesUsersList = findByUserId(user_id);
        for (ActivitiesUsers actuser : activitiesUsersList) {
            if (actuser.getActivitiesId() == act_id)
                return false;
        }
        return true;
    }
}