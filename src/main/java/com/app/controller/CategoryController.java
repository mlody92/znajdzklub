package com.app.controller;

import com.app.model.Category;
import com.app.service.CategoryService;
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
public class CategoryController {

    @Autowired
    CategoryService categoryService;

    @RequestMapping(value = "/listCategory", method = RequestMethod.GET)
    @ResponseBody
    public List<Category> get() {
        return categoryService.findAll();
    }

    @RequestMapping(value = "/category-{name}", method = RequestMethod.GET)
    @ResponseBody
    public Category getCategory(@PathVariable String name) {
        return categoryService.findByName(name);
    }

    @RequestMapping(value = {"/categoryList"}, method = RequestMethod.GET)
    public String catlist(ModelMap model) {
        model.addAttribute("loggedinuser", getPrincipal());
        return "category/categoryList";
    }

    @RequestMapping(value = {"/addCategory"}, method = RequestMethod.GET)
    public String newCategory(ModelMap model) {
        Category category = new Category();
        model.addAttribute("category", category);
        model.addAttribute("edit", false);
        model.addAttribute("loggedinuser", getPrincipal());
        return "category/addCategory";
    }

    @RequestMapping(value = {"/addCategory"}, method = RequestMethod.POST, produces = {"application/json; charset=UTF-8"})
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody ResponseEntity saveUser(@RequestBody @Valid Category category, BindingResult result,
                                                    ModelMap model) {
        JSONObject json = new JSONObject();
        if (!categoryService.isNameUnique(category.getId(), category.getName())) {
            json.put("success", false);
            json.put("error", "Podana kategoria już istnieje");
            return new ResponseEntity(json.toString(), HttpStatus.OK);
        }

        categoryService.save(category);
        model.addAttribute("success", "Kategoria " + category.getName() + " została poprawnie dodana.");
        model.addAttribute("loggedinuser", getPrincipal());
        json.put("success", true);
        json.put("data", category);
        return new ResponseEntity(json.toString(), HttpStatus.OK);
    }

    @RequestMapping(value = {"/edit-category-{name}"}, method = RequestMethod.GET)
    public String editUser(@PathVariable String name, ModelMap model) {
        Category category= categoryService.findByName(name);
        model.addAttribute("category", category);
        model.addAttribute("edit", true);
        model.addAttribute("loggedinuser", getPrincipal());
        return "category/addCategory";
    }

    @RequestMapping(value = {"/edit-category-{name}"}, method = RequestMethod.POST, produces = {"application/json; charset=UTF-8"})
    public ResponseEntity updateUser(@RequestBody @Valid Category category, BindingResult result,
                                        ModelMap model, @PathVariable String name) {

        JSONObject json = new JSONObject();
        if (result.hasErrors()) {
            json.put("success", false);
            json.put("error", result);
            return new ResponseEntity(json.toString(), HttpStatus.OK);
        }

        categoryService.update(category);
        model.addAttribute("loggedinuser", getPrincipal());
        json.put("success", true);
        json.put("data", category);
        return new ResponseEntity(json.toString(), HttpStatus.OK);
    }

    @RequestMapping(value = {"/delete-category-{name}"}, method = RequestMethod.POST, produces = {"application/json; charset=UTF-8"})
    public ResponseEntity deleteCategory(@RequestBody @Valid Category category, BindingResult result,
                                        ModelMap model, @PathVariable String name) {

        JSONObject json = new JSONObject();
        if (result.hasErrors()) {
            json.put("success", false);
            json.put("error", result);
            return new ResponseEntity(json.toString(), HttpStatus.OK);
        }

        categoryService.delete(name);
        model.addAttribute("loggedinuser", getPrincipal());
        json.put("success", true);
        json.put("info", "Poprawnie usunięto kategorię");
        return new ResponseEntity(json.toString(), HttpStatus.OK);
    }

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
