/*
 * Copyright (c) Krakfin
 * All rights reserved
 */
package com.app.controller;

import com.app.model.Advert;
import com.app.model.User;
import com.app.service.AdvertService;
import com.app.service.CoordinatesService;
import java.util.Collection;
import java.util.LinkedList;
import java.util.List;
import javax.validation.Valid;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.SessionAttributes;

@Controller
@RequestMapping("/")
@SessionAttributes("roles")
public class ClubsController {

    @Autowired
    AdvertService advertService;

    @Autowired
    CoordinatesService coordinatesService;

    @CrossOrigin
    @RequestMapping(value = "/listClubs", method = RequestMethod.GET)
    @ResponseBody
    public List<Advert> getList() {
        return advertService.findAll();
    }

    @RequestMapping(value = "/club-{id}", method = RequestMethod.GET)
    @ResponseBody
    public Advert get(@PathVariable Integer id) {
        return advertService.findById(id);
    }

    @RequestMapping(value = "/clubs-category-{id}", method = RequestMethod.GET)
    @ResponseBody
    public List<Advert> getClubsByCategory(@PathVariable Integer id) {
        return advertService.findByCategoryId(id);
    }

    /////// Filtrowanie

    @RequestMapping(value = "/clubs-filter-{kod}-{km}-{catId}", method = RequestMethod.GET)
    @ResponseBody
    public List<Advert> getClubsFilter(@PathVariable String kod, @PathVariable Integer km, @PathVariable Integer catId) {
        //String kod, int km
        List<String> list = coordinatesService.findFilter(kod, km);
        List<Advert> advertList = new LinkedList<>();
        advertList = advertService.findByKodPocztowy(list, catId);
        return advertList;
    }

    /////
    @RequestMapping(value = {"/clubsList"}, method = RequestMethod.GET)
    public String list(ModelMap model) {
        List<Advert> users = advertService.findAll();
        model.addAttribute("users", users);
        model.addAttribute("loggedinuser", getPrincipal());
        return "clubs/clubsList";
    }

    @RequestMapping(value = {"/addAdvert"}, method = RequestMethod.GET)
    public String newClub(ModelMap model) {
        Advert advert = new Advert();
        model.addAttribute("advert", advert);
        model.addAttribute("edit", false);
        model.addAttribute("loggedinuser", getPrincipal());
        return "clubs/addClub";
    }

    @RequestMapping(value = {"/addAdvert"}, method = RequestMethod.POST, produces = {"application/json; charset=UTF-8"})
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody ResponseEntity saveClub(@RequestBody @Valid Advert advert, BindingResult result,
                                                    ModelMap model) {
        JSONObject json = new JSONObject();
        if (!advertService.isUnique(advert)) {
            json.put("success", false);
            json.put("error", "Klub o podanym tytule już istnieje");
            return new ResponseEntity(json.toString(), HttpStatus.OK);
        }

        advertService.save(advert);
        model.addAttribute("success", "Tytuł " + advert.getTitle() + " została poprawnie dodana.");
        model.addAttribute("loggedinuser", getPrincipal());
        json.put("success", true);
        json.put("data", advert);
        return new ResponseEntity(json.toString(), HttpStatus.OK);
    }

    @RequestMapping(value = {"/view-advert-{id}"}, method = RequestMethod.GET)
    public String viewAdvert(@PathVariable Integer id, ModelMap model) {
        Advert advert = advertService.findById(id);
        model.addAttribute("advert", advert);
        model.addAttribute("loggedinuser", getPrincipal());
        return "clubs/view";
    }

    @RequestMapping(value = {"/edit-advert-{id}"}, method = RequestMethod.GET)
    public String editUser(@PathVariable Integer id, ModelMap model) {
        Advert advert = advertService.findById(id);
        model.addAttribute("advert", advert);
        model.addAttribute("edit", true);
        model.addAttribute("loggedinuser", getPrincipal());
        return "clubs/addClub";
    }

    @RequestMapping(value = {"/edit-advert-{title}"}, method = RequestMethod.POST, produces = {"application/json; charset=UTF-8"})
    public ResponseEntity updateUser(@RequestBody @Valid Advert advert, BindingResult result,
                                        ModelMap model, @PathVariable String title) {

        JSONObject json = new JSONObject();
        if (result.hasErrors()) {
            json.put("success", false);
            json.put("error", result);
            return new ResponseEntity(json.toString(), HttpStatus.OK);
        }

        advertService.update(advert);
        model.addAttribute("loggedinuser", getPrincipal());
        json.put("success", true);
        json.put("data", advert);
        return new ResponseEntity(json.toString(), HttpStatus.OK);
    }

    @RequestMapping(value = {"/delete-advert"}, method = RequestMethod.POST, produces = {"application/json; charset=UTF-8"})
    public ResponseEntity deleteCategory(@RequestBody @Valid Advert advert, BindingResult result,
                                            ModelMap model) {

        JSONObject json = new JSONObject();
        if (result.hasErrors()) {
            json.put("success", false);
            json.put("error", result);
            return new ResponseEntity(json.toString(), HttpStatus.OK);
        }

        advertService.delete(advert.getId());
        model.addAttribute("loggedinuser", getPrincipal());
        json.put("success", true);
        json.put("info", "Poprawnie usunięto kategorię");
        return new ResponseEntity(json.toString(), HttpStatus.OK);
    }

    @RequestMapping(value = {"/sztukiWalki"}, method = RequestMethod.GET)
    public String sztukiWalki(ModelMap model) {
        model.addAttribute("categoryId", 1);
        Collection<? extends GrantedAuthority> authorities = SecurityContextHolder.getContext().getAuthentication().getAuthorities();
        boolean authorized = authorities.contains(new SimpleGrantedAuthority("ROLE_ADMIN"));
        model.addAttribute("edit", authorized);
        model.addAttribute("loggedinuser", getPrincipal());
        return "clubs/sztuki_walki";
    }

    @RequestMapping(value = {"/taniec"}, method = RequestMethod.GET)
    public String taniec(ModelMap model) {
        User user = new User();
        model.addAttribute("user", user);
        model.addAttribute("categoryId", 5);
        Collection<? extends GrantedAuthority> authorities = SecurityContextHolder.getContext().getAuthentication().getAuthorities();
        boolean authorized = authorities.contains(new SimpleGrantedAuthority("ROLE_ADMIN"));
        model.addAttribute("edit", authorized);
        model.addAttribute("loggedinuser", getPrincipal());
        return "clubs/taniec";
    }

    //    @RequestMapping(value = {"/asd"}, method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = {"application/json; charset=UTF-8"})
    //    @ResponseStatus(HttpStatus.OK)
    //    public @ResponseBody ResponseEntity asd(@RequestBody @Valid Advert advert, BindingResult result,
    //                                                    ModelMap model, @RequestPart("file") @Valid MultipartFile file) {
    //        JSONObject json = new JSONObject();
    //        if (!advertService.isUnique(advert)) {
    //            json.put("success", false);
    //            json.put("error", "Klub o podanym tytule już istnieje");
    //            return new ResponseEntity(json.toString(), HttpStatus.OK);
    //        }
    //
    //        if(!file.isEmpty())   {
    //            advert.save;
    //        }
    //        advertService.save(advert);
    //        model.addAttribute("success", "Tytuł " + advert.getTitle() + " została poprawnie dodana.");
    //        model.addAttribute("loggedinuser", getPrincipal());
    //        json.put("success", true);
    //        json.put("data", advert);
    //        return new ResponseEntity(json.toString(), HttpStatus.OK);
    //    }

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
