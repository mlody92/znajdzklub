/*
 * Copyright (c) Krakfin
 * All rights reserved
 */
package com.app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class HomeController {

    //    @RequestMapping(value = "/")
    //    public String home() {
    //        return "webapp";
    //    }

    //    @RequestMapping(method = RequestMethod.GET)
    //    public String getIndexPage() {
    //        return "UserManagement";
    //    }

    @RequestMapping(value = "/")
    public ModelAndView mainPage() {
        return new ModelAndView("home");
    }

    @RequestMapping(value = "/home/home")
    public ModelAndView getIndex() {
        return new ModelAndView("home/home");
    }

    @RequestMapping(value = "/webapp")
    public ModelAndView getInasdasddex() {
        return new ModelAndView("webapp");
    }

    @RequestMapping(value = "/inner/inner")
    public ModelAndView getInnerTemplate() {
        return new ModelAndView("inner/inner");
    }

    @RequestMapping(value = "/contact/contact")
    public ModelAndView getContactTemplate() {
        return new ModelAndView("contact/contact");
    }

    @RequestMapping(value = "/register/register")
    public ModelAndView getRegisterTemplate() {
        return new ModelAndView("register/register");
    }

    @RequestMapping(value = "/login/login")
    public ModelAndView getLoginTemplate() {
        return new ModelAndView("login/login");
    }
}
