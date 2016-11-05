/*
 * Copyright (c) Krakfin
 * All rights reserved
 */
package com.app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
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
        return new ModelAndView("index");
    }

    @RequestMapping(value="/pages/index")
    public ModelAndView getIndex() {
        return new ModelAndView("pages/index");
    }

    @RequestMapping(value="/pages/inner")
    public ModelAndView getInnerTemplate() {
        return new ModelAndView("pages/inner");
    }

    @RequestMapping(value="/pages/contact")
    public ModelAndView getContactTemplate() {
        return new ModelAndView("pages/contact");
    }
}
