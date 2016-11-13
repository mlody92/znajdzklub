package com.app.service;

import com.app.model.User;
import java.sql.SQLException;
import java.util.List;

public interface UserService
{
//    public boolean isValidUser(String username, String password) throws SQLException;

    User findById(int id);

    User findBySSO(String sso);

    void saveUser(User user);

    void updateUser(User user);

    void deleteUserBySSO(String sso);

    List<User> findAllUsers();

    boolean isUserSSOUnique(Integer id, String sso);
}
