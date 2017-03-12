package com.app.controller;

import com.app.dao.AdvertDaoImpl;
import com.app.model.Advert;
import com.app.model.User;
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
public class ClubsController {

    @Autowired
    AdvertService advertService;

    @Autowired
    UserService userService;

    @Autowired
    CoordinatesService coordinatesService;

    @RequestMapping(value = "/listClubs", method = RequestMethod.GET)
    @ResponseBody
    public List<Advert> getList() {
        return advertService.findAll();
    }

    @RequestMapping(value = "/listClubsAktywne", method = RequestMethod.GET)
    @ResponseBody
    public List<AdvertDaoImpl.AdvertDetails> getListAktywne() {
        return advertService.findAdvertLists("aktywne");
    }

    @RequestMapping(value = "/listClubsDoZatwierdzenia", method = RequestMethod.GET)
    @ResponseBody
    public List<AdvertDaoImpl.AdvertDetails> getListDoZatwierdzenia() {
        return advertService.findAdvertLists("do zatwierdzenia");
    }

    @RequestMapping(value = "/listClubsOdrzucone", method = RequestMethod.GET)
    @ResponseBody
    public List<AdvertDaoImpl.AdvertDetails> getListOdrzucone() {
        return advertService.findAdvertLists("odrzucone");
    }

    @RequestMapping(value = "/listClubsNieaktywne", method = RequestMethod.GET)
    @ResponseBody
    public List<AdvertDaoImpl.AdvertDetails> getListNieaktywne() {
        return advertService.findAdvertLists("nieaktywne");
    }

    @RequestMapping(value = "/club-{id}", method = RequestMethod.GET)
    @ResponseBody
    public Advert get(@PathVariable Integer id) {
        return advertService.findById(id);
    }

    @RequestMapping(value = "/clubs-category-{id}", method = RequestMethod.GET)
    @ResponseBody
    public List<Advert> getClubsByCategory(@PathVariable Integer id) {
        List<Advert> list = advertService.findByCategoryId(id);
        return list;
    }

    @RequestMapping(value = "/clubs-user", method = RequestMethod.GET)
    @ResponseBody
    public List<Advert> getMyClubs() {
        String userName = getPrincipal();
        User user = userService.findByLogin(userName);
        List<Advert> list = advertService.findByUserId(user.getId());
        return list;
    }

    /////// Filtrowanie
    @RequestMapping(value = "/clubs-filter-{kod}-{km}-{catId}", method = RequestMethod.GET)
    @ResponseBody
    public List<Advert> getClubsFilter(@PathVariable String kod, @PathVariable Integer km, @PathVariable Integer catId) {
        //String kod, int km
        List<String> list = coordinatesService.findFilter(kod, km);
        List<Advert> advertList;
        advertList = advertService.findByKodPocztowy(list, catId);
        return advertList;
    }

    /////
    @RequestMapping(value = {"/clubsList"}, method = RequestMethod.GET)
    public String clubsList() {
        return "clubs/clubsList";
    }

    @RequestMapping(value = {"/myClubs"}, method = RequestMethod.GET)
    public String myclubs() {
        return "clubs/myClubs";
    }

    @RequestMapping(value = {"/addAdvert"}, method = RequestMethod.GET)
    public String newClub(ModelMap model) {
        model.addAttribute("edit", false);
        return "clubs/addClub";
    }

    @RequestMapping(value = {"/addAdvert"}, method = RequestMethod.POST, produces = {"application/json; charset=UTF-8"})
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody ResponseEntity saveClub(@RequestBody @Valid Advert advert) {
        JSONObject json = new JSONObject();
        if (!advertService.isUnique(advert)) {
            json.put("success", false);
            json.put("error", "Klub o podanym tytule już istnieje");
            return new ResponseEntity(json.toString(), HttpStatus.OK);
        }
        String userName = getPrincipal();
        User user = userService.findByLogin(userName);
        advert.setUserId(user.getId());
        advert.setStatus("do zatwierdzenia");
        advertService.save(advert);
        json.put("success", true);
        json.put("info", "Klub został prawidłowo dodany.");
        return new ResponseEntity(json.toString(), HttpStatus.OK);
    }

    @RequestMapping(value = {"/view-advert"}, method = RequestMethod.GET)
    public String viewAdvert() {
        return "clubs/view";
    }

    @RequestMapping(value = {"/edit-advert"}, method = RequestMethod.GET)
    public String editUser(@RequestParam("id") int id, ModelMap model) {
        String userName = getPrincipal();
        Collection<? extends GrantedAuthority> authorities = SecurityContextHolder.getContext().getAuthentication().getAuthorities();
        boolean authorized = authorities.contains(new SimpleGrantedAuthority("ROLE_ADMIN"));
        User user = userService.findByLogin(userName);
        Advert advert = advertService.findById(id);
        if (!authorized && user.getId() != advert.getUserId()) {
            return "clubs/myClubs";
        }
        model.addAttribute("edit", true);
        return "clubs/addClub";
    }

    @RequestMapping(value = {"/edit-advert"}, method = RequestMethod.POST, produces = {"application/json; charset=UTF-8"})
    public ResponseEntity editAdvert(@RequestBody @Valid Advert advert, BindingResult result) {

        JSONObject json = new JSONObject();
        if (result.hasErrors()) {
            json.put("success", false);
            json.put("error", result);
            return new ResponseEntity(json.toString(), HttpStatus.OK);
        }
        String userName = getPrincipal();
        Collection<? extends GrantedAuthority> authorities = SecurityContextHolder.getContext().getAuthentication().getAuthorities();
        boolean authorized = authorities.contains(new SimpleGrantedAuthority("ROLE_ADMIN"));
        User user = userService.findByLogin(userName);
        if (!authorized && user.getId() != advert.getUserId()) {
            json.put("success", false);
            json.put("error", "To nie twoje ogłoszenie");
            return new ResponseEntity(json.toString(), HttpStatus.OK);
        }
        advertService.update(advert);
        json.put("success", true);
        json.put("info", "Poprawnie zmieniono dane klubu.");
        return new ResponseEntity(json.toString(), HttpStatus.OK);
    }

    @RequestMapping(value = {"/delete-advert"}, method = RequestMethod.POST, produces = {"application/json; charset=UTF-8"})
    public ResponseEntity deleteAdvert(@RequestBody @Valid Advert advert, BindingResult result) {

        JSONObject json = new JSONObject();
        if (result.hasErrors()) {
            json.put("success", false);
            json.put("error", result);
            return new ResponseEntity(json.toString(), HttpStatus.OK);
        }
        String userName = getPrincipal();
        Collection<? extends GrantedAuthority> authorities = SecurityContextHolder.getContext().getAuthentication().getAuthorities();
        boolean authorized = authorities.contains(new SimpleGrantedAuthority("ROLE_ADMIN"));
        User user = userService.findByLogin(userName);
        if (!authorized && user.getId() != advert.getUserId()) {
            json.put("success", false);
            json.put("error", "To nie twoje ogłoszenie");
            return new ResponseEntity(json.toString(), HttpStatus.OK);
        }
        advertService.delete(advert.getId());
        json.put("success", true);
        json.put("info", "Poprawnie usunięto ogłoszenie");
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

    @RequestMapping(value = {"/club-status"}, method = RequestMethod.POST, produces = {"application/json; charset=UTF-8"})
    public ResponseEntity advertStatus(@RequestBody @Valid Advert advert, BindingResult result) {
        JSONObject json = new JSONObject();
        if (result.hasErrors()) {
            json.put("success", false);
            json.put("error", result);
            return new ResponseEntity(json.toString(), HttpStatus.OK);
        }
        advertService.update(advert);
        json.put("success", true);
        json.put("info", "Poprawnie zmieniono status ogłoszenia.");
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
