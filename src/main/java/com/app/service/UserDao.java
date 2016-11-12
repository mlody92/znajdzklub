/*
 * Copyright (c) Krakfin
 * All rights reserved
 */
package com.app.service;

import java.sql.SQLException;

/**
 * @author CENTAUR
 * This interface will be used to communicate with the
 * Database
 */
public interface UserDao
{
    public boolean isValidUser(String username, String password) throws SQLException;
}

