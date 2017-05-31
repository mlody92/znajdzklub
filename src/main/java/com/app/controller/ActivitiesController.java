package com.app.controller;

import com.app.dao.AdvertDaoImpl;
import com.app.model.Activities;
import com.app.model.ActivitiesUsers;
import com.app.model.Advert;
import com.app.model.User;
import com.app.service.ActivitiesService;
import com.app.service.ActivitiesUsersService;
import com.app.service.AdvertService;
import com.app.service.CoordinatesService;
import com.app.service.UserService;
import java.util.Collection;
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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.SessionAttributes;

@Controller
@RequestMapping("/")
@SessionAttributes("roles")
public class ActivitiesController {

    @Autowired
    AdvertService advertService;

    @Autowired
    ActivitiesService activitiesService;

    @Autowired
    ActivitiesUsersService activitiesUsersService;

    @Autowired
    UserService userService;

    @Autowired
    CoordinatesService coordinatesService;

    @RequestMapping(value = {"/scheduler"}, method = RequestMethod.GET)
    public String scheduler(ModelMap model) {
        return "../scheduler/scheduler";
    }

    @RequestMapping(value = "/allActivities", method = RequestMethod.GET)
    @ResponseBody
    public List<Activities> getActivities() {
        return activitiesService.findAll();
    }

    @RequestMapping(value = "/myActivities", method = RequestMethod.GET)
    @ResponseBody
    public List<ActivitiesUsers> getMyActivities() {
        String userName = getPrincipal();
        User user = userService.findByLogin(userName);
        return activitiesUsersService.findByUserId(user.getId());
    }

    @RequestMapping(value = {"/saveToActivities"}, method = RequestMethod.POST, produces = {"application/json; charset=UTF-8"})
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody ResponseEntity saveActivities(@RequestBody @Valid ActivitiesUsers activitiesUsers) {

        JSONObject json = new JSONObject();
        String userName = getPrincipal();
        User user = userService.findByLogin(userName);
        if(!activitiesUsersService.isUnique(user.getId(),activitiesUsers.getActivitiesId())){
            json.put("success", false);
            json.put("error", "Jesteś już zapisany/a");
            return new ResponseEntity(json.toString(), HttpStatus.OK);
        }
        activitiesUsers.setUserId(user.getId());
        activitiesUsersService.save(activitiesUsers);
        json.put("success", true);
        json.put("info", "Poprawnie zapisano.");
        return new ResponseEntity(json.toString(), HttpStatus.OK);
    }

    @RequestMapping(value = {"/add-activity"}, method = RequestMethod.POST, produces = {"application/json; charset=UTF-8"})
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody ResponseEntity saveActivity(@RequestBody @Valid Activities activities) {
        JSONObject json = new JSONObject();
        Collection<? extends GrantedAuthority> authorities = SecurityContextHolder.getContext().getAuthentication().getAuthorities();
        boolean authorized = authorities.contains(new SimpleGrantedAuthority("ROLE_ADMIN"));
        if(!authorized){
            json.put("success", false);
            json.put("error", "Nie posiadasz uprawnień do dodania zajęć");
            return new ResponseEntity(json.toString(), HttpStatus.OK);
        }
        activitiesService.save(activities);
        json.put("success", true);
        json.put("info", "Zajęcia zostały prawidłowo dodane.");
        return new ResponseEntity(json.toString(), HttpStatus.OK);
    }

    @RequestMapping(value = {"/edit-activity"}, method = RequestMethod.POST, produces = {"application/json; charset=UTF-8"})
    public ResponseEntity editCategory(@RequestBody @Valid Activities activities, BindingResult result) {
        JSONObject json = new JSONObject();
        Collection<? extends GrantedAuthority> authorities = SecurityContextHolder.getContext().getAuthentication().getAuthorities();
        boolean authorized = authorities.contains(new SimpleGrantedAuthority("ROLE_ADMIN"));
        if(!authorized){
            json.put("success", false);
            json.put("error", result);
            return new ResponseEntity(json.toString(), HttpStatus.OK);
        }
        activitiesService.update(activities);
        json.put("success", true);
        json.put("info", "Zajęcia zostały poprawnie przeedytowane");
        return new ResponseEntity(json.toString(), HttpStatus.OK);
    }

    @RequestMapping(value = {"/delete-activity"}, method = RequestMethod.POST, produces = {"application/json; charset=UTF-8"})
    public ResponseEntity deleteActivity(@RequestBody @Valid Activities activities, BindingResult result) {

        JSONObject json = new JSONObject();
        if (result.hasErrors()) {
            json.put("success", false);
            json.put("error", result);
            return new ResponseEntity(json.toString(), HttpStatus.OK);
        }
        Collection<? extends GrantedAuthority> authorities = SecurityContextHolder.getContext().getAuthentication().getAuthorities();
        boolean authorized = authorities.contains(new SimpleGrantedAuthority("ROLE_ADMIN"));
        if (!authorized) {
            json.put("success", false);
            json.put("error", "Nie możesz usunąć zajęć");
            return new ResponseEntity(json.toString(), HttpStatus.OK);
        }
        activitiesService.delete(activities.getId());
        json.put("success", true);
        json.put("info", "Poprawnie usunięto zajęcia");
        return new ResponseEntity(json.toString(), HttpStatus.OK);
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
