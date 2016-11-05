/*
 * Copyright (c) Krakfin
 * All rights reserved
 */
package com.app.dao;

import com.app.model.AppUsers;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

@Repository
public class AppUsersDaoImpl implements AppUsersDao{

    private static final Logger logger = LoggerFactory.getLogger(AppUsersDaoImpl.class);

    private SessionFactory sessionFactory;

    public void setSessionFactory(SessionFactory sf) {
        this.sessionFactory = sf;
    }

    @Override
    public void addAppUsers(AppUsers p) {
        Session session = this.sessionFactory.getCurrentSession();
        session.persist(p);
        logger.info("User saved successfully, User Details=" + p);
    }

    @Override
    public void updateAppUsers(AppUsers p) {
        Session session = this.sessionFactory.getCurrentSession();
        session.update(p);
        logger.info("User updated successfully, User Details=" + p);
    }

    @SuppressWarnings("unchecked")
    @Override
    public List<AppUsers> listAppUsers() {
        Session session = this.sessionFactory.getCurrentSession();
        List<AppUsers> appUsersList = session.createQuery("from AppUsers").list();
        for (AppUsers p : appUsersList) {
            logger.info("User List::" + p);
        }
        return appUsersList;
    }

    @Override
    public AppUsers getAppUsersById(int id) {
        Session session = this.sessionFactory.getCurrentSession();
        AppUsers p = (AppUsers) session.load(AppUsers.class, new Integer(id));
        logger.info("User loaded successfully, User details=" + p);
        return p;
    }

    @Override
    public void removeAppUsers(int id) {
        Session session = this.sessionFactory.getCurrentSession();
        AppUsers p = (AppUsers) session.load(AppUsers.class, new Integer(id));
        if (null != p) {
            session.delete(p);
        }
        logger.info("User deleted successfully, User details=" + p);
    }
}
