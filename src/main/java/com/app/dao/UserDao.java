package com.app.dao;

import com.app.model.User;
import java.util.List;

public interface UserDao
{
    User findById(int id);

    User findByLogin(String login);

    void save(User user);

    void deleteByLogin(String login);

    List<User> findAllUsers(String status);

}
