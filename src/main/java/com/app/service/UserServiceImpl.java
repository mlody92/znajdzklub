/*
 * Copyright (c) Krakfin
 * All rights reserved
 */
package com.app.service;

import java.sql.SQLException;

public class UserServiceImpl implements UserService
{

    private UserDao userDao;

    public UserDao getUserDao()
    {
        return this.userDao;
    }

    public void setUserDao(UserDao userDao)
    {
        this.userDao = userDao;
    }

    @Override
    public boolean isValidUser(String username, String password) throws SQLException
    {
        return userDao.isValidUser(username, password);
    }

}