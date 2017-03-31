package com.app.controller;

import com.app.model.User;
import com.app.service.UserService;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import javax.validation.Valid;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
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

    @RequestMapping(value = "/listUser-aktywny", method = RequestMethod.GET)
    @ResponseBody
    public List<User> listUserAktywny() {
        List<User> listUser = userService.findAllUsers("aktywny");
        for (User user : listUser) {
            user.setPassword("");
        }
        return listUser;
    }

    @RequestMapping(value = "/listUser-nieaktywny", method = RequestMethod.GET)
    @ResponseBody
    public List<User> listUserNieaktywni() {
        List<User> listUser = userService.findAllUsers("nieaktywny");
        for (User user : listUser) {
            user.setPassword("");
        }
        return listUser;
    }

    @RequestMapping(value = "/listUser-zablokowany", method = RequestMethod.GET)
    @ResponseBody
    public List<User> listUserZablokowany() {
        List<User> listUser = userService.findAllUsers("zablokowany");
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
    public @ResponseBody ResponseEntity saveUser(@RequestBody @Valid User user) {
        JSONObject json = new JSONObject();
        user.setRole("USER");
        if (!userService.isUserLoginUnique(user.getId(), user.getLogin())) {
            json.put("success", false);
            json.put("error", "Podany login już istnieje");
            return new ResponseEntity(json.toString(), HttpStatus.OK);
        }

        String waliduj = waliduj(user);
        if (!"".equals(waliduj)) {
            json.put("success", false);
            json.put("error", waliduj);
            return new ResponseEntity(json.toString(), HttpStatus.OK);
        }

        userService.saveUser(user);
        json.put("success", true);
        json.put("info", "Użytkownik " + user.getLogin() + " został poprawnie zarejestrowany.");
        return new ResponseEntity(json.toString(), HttpStatus.OK);
    }

    /**
     * This method will provide the medium to update an existing user.
     */
    @RequestMapping(value = {"/edit-user"}, method = RequestMethod.GET)
    public String editUser(ModelMap model) {
        model.addAttribute("edit", true);
        return "register/register";
    }

    @RequestMapping(value = {"/edit-user"}, method = RequestMethod.POST, produces = {"application/json; charset=UTF-8"})
    public ResponseEntity updateUser(@RequestBody @Valid User user, BindingResult result) {

        JSONObject json = new JSONObject();
        if (result.hasErrors()) {
            json.put("success", false);
            json.put("error", result);
            return new ResponseEntity(json.toString(), HttpStatus.OK);
        }

        userService.updateUser(user);
        json.put("success", true);
        json.put("info", "Poprawnie przeedytowany użytkownika");
        return new ResponseEntity(json.toString(), HttpStatus.OK);
    }

    @RequestMapping(value = {"/delete-user"}, method = RequestMethod.POST, produces = {"application/json; charset=UTF-8"})
    public ResponseEntity deleteUser(@RequestBody @Valid User user, BindingResult result) {
        JSONObject json = new JSONObject();
        if (result.hasErrors()) {
            json.put("success", false);
            json.put("error", result);
            return new ResponseEntity(json.toString(), HttpStatus.OK);
        }

        userService.deleteUserByLogin(user.getLogin());
        json.put("success", true);
        json.put("info", "Poprawnie usunięto użytkownika");
        return new ResponseEntity(json.toString(), HttpStatus.OK);
    }

    /**
     * This method will provide UserProfile list to views
     */
    @ModelAttribute("roles")
    public List<User> initializeProfiles() {
        return userService.findAllUsers("aktywny");
    }

    @RequestMapping(value = {"/userList"}, method = RequestMethod.GET)
    public String userList() {
        return "user/userList";
    }

    @RequestMapping(value = {"/user-status"}, method = RequestMethod.POST, produces = {"application/json; charset=UTF-8"})
    public ResponseEntity advertStatus(@RequestBody @Valid User user, BindingResult result) {
        JSONObject json = new JSONObject();
        if (result.hasErrors()) {
            json.put("success", false);
            json.put("error", result);
            return new ResponseEntity(json.toString(), HttpStatus.OK);
        }
        userService.updateUser(user);
        json.put("success", true);
        json.put("info", "Poprawnie zmieniono status użytkownika.");
        return new ResponseEntity(json.toString(), HttpStatus.OK);
    }

    //TODO
    //    @RequestMapping(value = {"/edit-profile"}, method = RequestMethod.GET)
    //    public String editProfile(ModelMap model) {
    //        User user = userService.findByLogin(getPrincipal());
    //        model.addAttribute("user", user);
    //        model.addAttribute("edit", true);
    //        model.addAttribute("loggedinuser", getPrincipal());
    //        return "register/register";
    //    }
    //
    //    @RequestMapping(value = {"/edit-profile"}, method = RequestMethod.POST, produces = {"application/json; charset=UTF-8"})
    //    public ResponseEntity updateProfile(@RequestBody @Valid User user, BindingResult result,
    //                                           ModelMap model) {
    //
    //        JSONObject json = new JSONObject();
    //        if (result.hasErrors()) {
    //            json.put("success", false);
    //            json.put("error", result);
    //            return new ResponseEntity(json.toString(), HttpStatus.OK);
    //        }
    //        if (user.getLogin() != getPrincipal()) {
    //            json.put("success", false);
    //            json.put("error", "Możesz edytować tylko swój profil");
    //            return new ResponseEntity(json.toString(), HttpStatus.OK);
    //        }
    //
    //        userService.updateUser(user);
    //        model.addAttribute("loggedinuser", getPrincipal());
    //        json.put("success", true);
    //        json.put("info", "Poprawnie przeedytowany użytkownika");
    //        return new ResponseEntity(json.toString(), HttpStatus.OK);
    //    }

    private String waliduj(User user) {
        String error = "";
        Pattern pemail = Pattern.compile(".+@.+");
        Matcher memail = pemail.matcher(user.getEmail());
        if (!memail.matches()) {
            error += "adres email jest nieprawidłowy.\n";
        }

        if (user.getLogin().length() < 3) {
            error += "login jest za krótki.\n";
        } else if (user.getLogin().length() > 30) {
            error += "login jest zbyt długi";
        }

        if (user.getPassword().length() < 5) {
            error += "hasło jest zbyt krótkie \n";
        }
        return error;
    }
}
