/*
 * Copyright (c) Krakfin
 * All rights reserved
 */
package com.app.controller;

import com.app.model.Advert;
import com.app.model.User;
import com.app.service.AdvertService;
import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

@Controller
@RequestMapping("/")
@SessionAttributes("roles")
public class ClubsController {

    @Autowired
    AdvertService advertService;

    @RequestMapping(value = {"/addClub"}, method = RequestMethod.POST)
    public String save(@Valid Advert advert, BindingResult result,
                          ModelMap model) {

        if (result.hasErrors()) {
            return "clubs/addClub";
        }
        advertService.save(advert);
        model.addAttribute("success", "Ogłoszenie " + advert.getTitle() + " zostało poprawnie dodane.");
        model.addAttribute("loggedinuser", getPrincipal());
        return "home";
    }

    @RequestMapping(value = {"/addClub"}, method = RequestMethod.GET)
    public String newClub(ModelMap model) {
        Advert advert = new Advert();
        model.addAttribute("advert", advert);
        model.addAttribute("edit", false);
        model.addAttribute("loggedinuser", getPrincipal());
        return "clubs/addClub";
    }

    @RequestMapping(value = {"/clubsList"}, method = RequestMethod.GET)
    public String list(ModelMap model) {
        List<Advert> users = advertService.findAll();
        model.addAttribute("users", users);
        model.addAttribute("loggedinuser", getPrincipal());
        return "clubs/clubsList";
    }

    @CrossOrigin
    @RequestMapping(value = "/listClubs", method = RequestMethod.GET)
    @ResponseBody
    public List<Advert> get() {
        return advertService.findAll();
    }

    /**
     * This method returns the principal[user-name] of logged-in user.
     */
    private String getPrincipal() {
        String userName = null;
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof UserDetails) {
            userName = ((UserDetails) principal).getUsername();
        } else {
            userName = principal.toString();
        }
        return userName;
    }
}
