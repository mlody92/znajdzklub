/*
 * Copyright (c) Krakfin
 * All rights reserved
 */
package com.app.service;

import com.app.dao.AppUsersDao;
import com.app.model.AppUsers;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AppUsersServiceImpl implements AppUsersService {

    @Autowired
    private AppUsersDao appUsersDao;

    public void setAppUsersDao(AppUsersDao appUsersDao) {
        this.appUsersDao = appUsersDao;
    }

    @Override
    @Transactional
    public void addAppUsers(AppUsers p) {
        this.appUsersDao.addAppUsers(p);
    }

    @Override
    @Transactional
    public void updateAppUsers(AppUsers p) {
        this.appUsersDao.updateAppUsers(p);
    }

    @Override
    @Transactional
    public List<AppUsers> listAppUsers() {
        return this.appUsersDao.listAppUsers();
    }

    @Override
    @Transactional
    public AppUsers getAppUsersById(int id) {
        return this.appUsersDao.getAppUsersById(id);
    }

    @Override
    @Transactional
    public void removeAppUsers(int id) {
        this.appUsersDao.removeAppUsers(id);
    }

}
