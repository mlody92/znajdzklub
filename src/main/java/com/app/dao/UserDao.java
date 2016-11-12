/*
 * Copyright (c) Krakfin
 * All rights reserved
 */
package com.app.dao;

import java.sql.SQLException;

public interface UserDao
{
    public boolean isValidUser(String username, String password) throws SQLException;
}
