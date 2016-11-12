/*
 * Copyright (c) Krakfin
 * All rights reserved
 */
package com.app.service;

import java.sql.SQLException;

public interface UserService
{
    public boolean isValidUser(String username, String password) throws SQLException;
}
