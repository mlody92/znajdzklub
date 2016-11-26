package com.app.controller;

import com.app.model.User;
import com.app.service.UserService;
import java.util.List;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UsersController {

    @Autowired
    UserService userService;

    @CrossOrigin
    @RequestMapping(value = "/list2", method = RequestMethod.GET)
//    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<User> get() {
        List<User> listUser = userService.findAllUsers();
        for (User user : listUser) {
            user.setPassword("");
        }
        return listUser;
    }
}
