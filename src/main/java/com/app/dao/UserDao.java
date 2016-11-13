package com.app.dao;

import com.app.model.User;
import java.sql.SQLException;
import java.util.List;

public interface UserDao
{
    User findById(int id);

    User findBySSO(String sso);

    void save(User user);

    void deleteBySSO(String sso);

    List<User> findAllUsers();

//    public boolean isValidUser(String username, String password) throws SQLException;
}
