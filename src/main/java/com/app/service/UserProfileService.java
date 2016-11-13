package com.app.service;

import com.app.model.UserProfile;
import java.util.List;



public interface UserProfileService {

    UserProfile findById(int id);

    UserProfile findByType(String type);

    List<UserProfile> findAll();

}