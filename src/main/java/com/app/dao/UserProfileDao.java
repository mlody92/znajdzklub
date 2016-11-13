package com.app.dao;

import com.app.model.UserProfile;
import java.util.List;



public interface UserProfileDao {

    List<UserProfile> findAll();

    UserProfile findByType(String type);

    UserProfile findById(int id);
}