package com.app.service;

import com.app.model.User;
import java.util.List;

public interface UserService
{
    User findById(int id);

    User findByLogin(String login);

    String saveUser(User user);

    void updateUser(User user);

    void deleteUserByLogin(String login);

    List<User> findAllUsers();

    boolean isUserLoginUnique(Integer id, String login);
}
