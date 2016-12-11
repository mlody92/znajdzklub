package com.app.controller;

import com.app.model.Advert;
import com.app.model.Category;
import com.app.model.User;
import com.app.service.AdvertService;
import com.app.service.CategoryService;
import com.app.service.UserService;
import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.security.authentication.AuthenticationTrustResolver;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.rememberme.PersistentTokenBasedRememberMeServices;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.SessionAttributes;

@Controller
@RequestMapping("/")
@SessionAttributes("roles")
public class AppController {

    @Autowired
    UserService userService;

    @Autowired
    AdvertService advertService;

    @Autowired
    MessageSource messageSource;

    @Autowired
    PersistentTokenBasedRememberMeServices persistentTokenBasedRememberMeServices;

    @Autowired
    AuthenticationTrustResolver authenticationTrustResolver;

    @RequestMapping(value = {"/"}, method = RequestMethod.GET)
    public String home(ModelMap model) {
        model.addAttribute("loggedinuser", getPrincipal());
        return "home";
    }

    @RequestMapping(value = {"/home"}, method = RequestMethod.GET)
    public String home2(ModelMap model) {
        return "redirect:/";
    }

    /**
     * This method will provide the medium to add a new user.
     */
    @RequestMapping(value = {"/register"}, method = RequestMethod.GET)
    public String newUser(ModelMap model) {
        User user = new User();
        model.addAttribute("user", user);
        model.addAttribute("edit", false);
        model.addAttribute("loggedinuser", getPrincipal());
        return "register/register";
    }

    /**
     * This method will be called on form submission, handling POST request for
     * saving user in database. It also validates the user input
     */
    @RequestMapping(value = {"/register"}, method = RequestMethod.POST)
    public String saveUser(@Valid User user, BindingResult result,
                              ModelMap model) {

        if (result.hasErrors()) {
            return "register/register";
        }
 
        /*
         * Preferred way to achieve uniqueness of field [sso] should be implementing custom @Unique annotation 
         * and applying it on field [sso] of Model class [User].
         * 
         * Below mentioned peace of code [if block] is to demonstrate that you can fill custom errors outside the validation
         * framework as well while still using internationalized messages.
         * 
         */
        user.setRole("USER");
        if (!userService.isUserLoginUnique(user.getId(), user.getLogin())) {
            FieldError loginError = new FieldError("user", "login", "Podany login już istnieje!");
            result.addError(loginError);
            return "register/register";
        }

        userService.saveUser(user);

        model.addAttribute("success", "Użytkownik " + user.getFirstName() + " " + user.getLastName() + " został poprawnie zarejestrowany.");
        model.addAttribute("loggedinuser", getPrincipal());
        //return "success";
        return "login/registrationsuccess";
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

    /**
     * This method will be called on form submission, handling POST request for
     * updating user in database. It also validates the user input
     */
    @RequestMapping(value = {"/edit-user-{login}"}, method = RequestMethod.POST)
    public String updateUser(@Valid User user, BindingResult result,
                                ModelMap model, @PathVariable String login) {

        if (result.hasErrors()) {
            return "register/register";
        }
 
        /*//Uncomment below 'if block' if you WANT TO ALLOW UPDATING SSO_ID in UI which is a unique key to a User.
        if(!userService.isUserSSOUnique(user.getId(), user.getSsoId())){
            FieldError ssoError =new FieldError("user","ssoId",messageSource.getMessage("non.unique.ssoId", new String[]{user.getSsoId()}, Locale.getDefault()));
            result.addError(ssoError);
            return "registration";
        }*/

        userService.updateUser(user);

        model.addAttribute("success", "User " + user.getFirstName() + " " + user.getLastName() + " updated successfully");
        model.addAttribute("loggedinuser", getPrincipal());
        return "login/registrationsuccess";
    }

    /**
     * This method will delete an user by it's SSOID value.
     */
    @RequestMapping(value = {"/delete-user-{login}"}, method = RequestMethod.GET)
    public String deleteUser(@PathVariable String login) {
        userService.deleteUserByLogin(login);
        return "redirect:/userList";
    }

    /**
     * This method will provide UserProfile list to views
     */
    @ModelAttribute("roles")
    public List<User> initializeProfiles() {
        return userService.findAllUsers();
    }

    /**
     * This method handles Access-Denied redirect.
     */
    @RequestMapping(value = "/Access_Denied", method = RequestMethod.GET)
    public String accessDeniedPage(ModelMap model) {
        model.addAttribute("isLogged", isCurrentAuthenticationAnonymous());
        model.addAttribute("loggedinuser", getPrincipal());
        return "login/accessDenied";
    }

    /**
     * This method handles login GET requests.
     * If users is already logged-in and tries to goto login page again, will be redirected to list page.
     */
    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String loginPage() {
        if (isCurrentAuthenticationAnonymous()) {
            return "login/login";
        } else {
            return "redirect:/userList";
        }
        //        return "login/login";
    }

    /**
     * This method handles logout requests.
     * Toggle the handlers if you are RememberMe functionality is useless in your app.
     */
    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    public String logoutPage(HttpServletRequest request, HttpServletResponse response) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {
            //new SecurityContextLogoutHandler().logout(request, response, auth);
            persistentTokenBasedRememberMeServices.logout(request, response, auth);
            SecurityContextHolder.getContext().setAuthentication(null);
        }
        return "redirect:/login?logout";
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

    /**
     * This method returns true if users is already authenticated [logged-in], else false.
     */
    private boolean isCurrentAuthenticationAnonymous() {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authenticationTrustResolver.isAnonymous(authentication);
    }

    @RequestMapping(value = {"/addClub"}, method = RequestMethod.GET)
    public String newClub(ModelMap model) {
        Advert advert = new Advert();
        model.addAttribute("advert", advert);
        model.addAttribute("edit", false);
        model.addAttribute("loggedinuser", getPrincipal());
        return "clubs/addClub";
    }

    @RequestMapping(value = {"/addClub"}, method = RequestMethod.POST)
    public String save(@Valid Advert advert, BindingResult result,
                              ModelMap model) {

        if (result.hasErrors()) {
            return "clubs/addClub";
        }
        advert.setAddress("ares");
        advert.setCategoryId(1);
        advert.setDate(Date.valueOf("2016,"));
        advert.setDescription("asd");
        advert.setEmail("asd");
        advert.setPhone("213");
        advert.setPostalCode("23");
        advert.setStatus("st");
        advert.setWebsite("web");
        advertService.save(advert);

        model.addAttribute("success", "Ogłoszenie " + advert.getTitle() + " zostało poprawnie dodane.");
        model.addAttribute("loggedinuser", getPrincipal());
        return "home";
    }

    @Autowired
    CategoryService categoryService;

    @RequestMapping(value = {"/addCategory"}, method = RequestMethod.GET)
    public String newCategory(ModelMap model) {
        Category category = new Category();
        model.addAttribute("category", category);
        model.addAttribute("edit", false);
        model.addAttribute("loggedinuser", getPrincipal());
        return "clubs/addCategory";
    }

    @RequestMapping(value = {"/addCategory"}, method = RequestMethod.POST)
    public String saveCategory(@Valid Category category, BindingResult result,
                          ModelMap model) {

        if (result.hasErrors()) {
            return "clubs/addCategory";
        }
        categoryService.save(category);

        model.addAttribute("success", "Kategoria " + category.getName() + " została poprawnie dodana.");
        model.addAttribute("loggedinuser", getPrincipal());
        return "home";
    }
}