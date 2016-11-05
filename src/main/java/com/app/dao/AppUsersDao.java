/*
 * Copyright (c) Krakfin
 * All rights reserved
 */
package com.app.dao;

import com.app.model.AppUsers;
import java.util.List;

public interface AppUsersDao {

    public void addAppUsers(AppUsers p);

    public void updateAppUsers(AppUsers p);

    public List<AppUsers> listAppUsers();

    public AppUsers getAppUsersById(int id);

    public void removeAppUsers(int id);
}
