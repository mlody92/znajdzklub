/*
 * Copyright (c) Krakfin
 * All rights reserved
 */
package com.app.controller;

import com.app.dao.UserDao;
import com.app.model.User;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserRestController {
//    @Autowired
//    private UserDao customerDAO;
//
//
//    @GetMapping("/users")
//    public List getCustomers() {
//        return customerDAO.list();
//    }
//
//    @GetMapping("/users/{id}")
//    public ResponseEntity getCustomer(@PathVariable("id") int id) {
//
//        User customer = customerDAO.get(id);
//        if (customer == null) {
//            return new ResponseEntity("No Customer found for ID " + id, HttpStatus.NOT_FOUND);
//        }
//
//        return new ResponseEntity(customer, HttpStatus.OK);
//    }
//
//    @PostMapping(value = "/users")
//    public ResponseEntity createCustomer(@RequestBody User customer) {
//
//        customerDAO.create(customer);
//
//        return new ResponseEntity(customer, HttpStatus.OK);
//    }
//
//    @DeleteMapping("/users/{id}")
//    public ResponseEntity deleteCustomer(@PathVariable int id) {
//
//        if (0 == customerDAO.delete(id)) {
//            return new ResponseEntity("No Customer found for ID " + id, HttpStatus.NOT_FOUND);
//        }
//
//        return new ResponseEntity(id, HttpStatus.OK);
//
//    }
//
//    @PutMapping("/users/{id}")
//    public ResponseEntity updateCustomer(@PathVariable Long id, @RequestBody User customer) {
//
//        customer = customerDAO.update(id, customer);
//
//        if (null == customer) {
//            return new ResponseEntity("No Customer found for ID " + id, HttpStatus.NOT_FOUND);
//        }
//
//        return new ResponseEntity(customer, HttpStatus.OK);
//    }
}
