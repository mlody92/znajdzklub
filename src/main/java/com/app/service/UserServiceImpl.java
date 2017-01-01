package com.app.service;

import com.app.dao.UserDao;
import com.app.model.User;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("userService")
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao dao;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User findById(int id) {
        return dao.findById(id);
    }

    public User findByLogin(String login) {
        User user = dao.findByLogin(login);
        return user;
    }

    public String saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        dao.save(user);
        return "success";
    }

    /*
     * Since the method is running with Transaction, No need to call hibernate update explicitly.
     * Just fetch the entity from db and update it with proper values within transaction.
     * It will be updated in db once transaction ends.
     */
    public void updateUser(User user) {
        User entity = dao.findById(user.getId());
        if (entity != null) {
            entity.setLogin(user.getLogin());
            entity.setFirstName(user.getFirstName());
            entity.setLastName(user.getLastName());
            entity.setEmail(user.getEmail());
            if (!user.getRole().isEmpty()) {
                entity.setRole(user.getRole());
            }
        }
    }

    public void deleteUserByLogin(String login) {
        dao.deleteByLogin(login);
    }

    public List<User> findAllUsers() {
        return dao.findAllUsers();
    }

    public boolean isUserLoginUnique(Integer id, String login) {
        User user = findByLogin(login);
        return (user == null || ((id != null) && (user.getId() == id)));
    }
}