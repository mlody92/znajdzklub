package com.app.controller;

import com.app.model.User;
import com.app.service.UserService;
import java.util.List;
import javax.validation.Valid;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
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
public class UsersController {

    @Autowired
    UserService userService;

    @CrossOrigin
    @RequestMapping(value = "/listUser", method = RequestMethod.GET)
    @ResponseBody
    public List<User> get() {
        List<User> listUser = userService.findAllUsers();
        for (User user : listUser) {
            user.setPassword("");
        }
        return listUser;
    }

    @RequestMapping(value = "/user-{login}", method = RequestMethod.GET)
    @ResponseBody
    public User getUser(@PathVariable String login) {
        User user = userService.findByLogin(login);
        user.setPassword("");
        return user;
    }

    @RequestMapping(value = {"/register"}, method = RequestMethod.POST, produces = {"application/json; charset=UTF-8"})
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody ResponseEntity saveUser(@RequestBody @Valid User user, BindingResult result,
                                                    ModelMap model) {
        JSONObject json = new JSONObject();
        user.setRole("USER");
        if (!userService.isUserLoginUnique(user.getId(), user.getLogin())) {
            json.put("success", false);
            json.put("error", "Podany login już istnieje");
            return new ResponseEntity(json.toString(), HttpStatus.OK);
        }

        userService.saveUser(user);
        model.addAttribute("success", "Użytkownik " + user.getFirstName() + " " + user.getLastName() + " został poprawnie zarejestrowany.");
        model.addAttribute("loggedinuser", getPrincipal());
        json.put("success", true);
        json.put("data", user);
        return new ResponseEntity(json.toString(), HttpStatus.OK);
    }

    /**
     * This method will provide the medium to update an existing user.
     */
    @RequestMapping(value = {"/edit-user-{login}"}, method = RequestMethod.GET)
    public String editUser(@PathVariable String login, ModelMap model) {
        User user = userService.findByLogin(login);
        model.addAttribute("user", user);
        model.addAttribute("edit", true);
        model.addAttribute("loggedinuser", getPrincipal());
        return "register/register";
    }

    @RequestMapping(value = {"/edit-user-{login}"}, method = RequestMethod.POST, produces = {"application/json; charset=UTF-8"})
    public ResponseEntity updateUser(@RequestBody @Valid User user, BindingResult result,
                                        ModelMap model, @PathVariable String login) {

        JSONObject json = new JSONObject();
        if (result.hasErrors()) {
            json.put("success", false);
            json.put("error", result);
            return new ResponseEntity(json.toString(), HttpStatus.OK);
        }

        userService.deleteUserByLogin(login);
        model.addAttribute("loggedinuser", getPrincipal());
        json.put("success", true);
        json.put("info", "Poprawnie usunięto kategorię");
        return new ResponseEntity(json.toString(), HttpStatus.OK);
    }

    /**
     * This method will delete an user by it's SSOID value.
     */
//    @RequestMapping(value = {"/delete-user-{login}"}, method = RequestMethod.GET)
//    public String deleteUser(@PathVariable String login) {
//        userService.deleteUserByLogin(login);
//        return "redirect:/userList";
//    }

    @RequestMapping(value = {"/delete-user-{login}"}, method = RequestMethod.POST, produces = {"application/json; charset=UTF-8"})
    public ResponseEntity deleteUser2(@RequestBody @Valid User user, BindingResult result,
                                         ModelMap model, @PathVariable String login) {
        JSONObject json = new JSONObject();
        if (result.hasErrors()) {
            json.put("success", false);
            json.put("error", result);
            return new ResponseEntity(json.toString(), HttpStatus.OK);
        }

        userService.deleteUserByLogin(login);
        model.addAttribute("loggedinuser", getPrincipal());
        json.put("success", true);
        json.put("info", "Poprawnie usunięto użytkownika");
        return new ResponseEntity(json.toString(), HttpStatus.OK);
    }

    /**
     * This method will provide UserProfile list to views
     */
    @ModelAttribute("roles")
    public List<User> initializeProfiles() {
        return userService.findAllUsers();
    }

    @RequestMapping(value = {"/userList"}, method = RequestMethod.GET)
    public String listUsers2(ModelMap model) {
        List<User> users = userService.findAllUsers();
        model.addAttribute("users", users);
        model.addAttribute("loggedinuser", getPrincipal());
        return "user/userList";
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
