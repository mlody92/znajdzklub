/*
 * Copyright (c) Krakfin
 * All rights reserved
 */
package com.app.controller;

import com.app.model.AppUsers;
import com.app.service.AppUsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class AppUsersController {

//    private AppUsersService appUsersService;
//
//    @Autowired(required = true)
//    @Qualifier(value = "appUsersService")
//    public void setAppUsersService(AppUsersService ps) {
//        this.appUsersService = ps;
//    }
//
//    @RequestMapping(value = "/appUsers", method = RequestMethod.GET)
//    public String listAppUsers(Model model) {
//        model.addAttribute("appUsers", new AppUsers());
//        model.addAttribute("listAppUsers", this.appUsersService.listAppUsers());
//        return "appUsers";
//    }
//
//    // For add and update appUsers both
//    @RequestMapping(value = "/appUsers/add", method = RequestMethod.POST)
//    public String addAppUsers(@ModelAttribute("appUsers") AppUsers p) {
//
//        if (p.getId() == 0) {
//            // new appUsers, add it
//            this.appUsersService.addAppUsers(p);
//        } else {
//            // existing appUsers, call update
//            this.appUsersService.updateAppUsers(p);
//        }
//
//        return "redirect:/appUsers";
//
//    }
//
//    @RequestMapping("/remove/{id}")
//    public String removeAppUsers(@PathVariable("id") int id) {
//
//        this.appUsersService.removeAppUsers(id);
//        return "redirect:/appUsers";
//    }
//
//    @RequestMapping("/edit/{id}")
//    public String editAppUsers(@PathVariable("id") int id, Model model) {
//        model.addAttribute("appUsers", this.appUsersService.getAppUsersById(id));
//        model.addAttribute("listAppUsers", this.appUsersService.listAppUsers());
//        return "appUsers";
//    }
}
