/*
 * Copyright (c) Krakfin
 * All rights reserved
 */
package com.app.dao;

import com.app.model.User;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class UserDao {

//    // Dummy database. Initialize with some dummy values.
//    private static List<User> customers;
//
//    {
//        customers = new ArrayList();
//        customers.add(new User(101, "John"));
//        customers.add(new User(201, "Russ"));
//        customers.add(new User(301, "Kate"));
//    }
//
//    /**
//     * Returns list of customers from dummy database.
//     * @return list of customers
//     */
//    public List list() {
//        return customers;
//    }
//
//    /**
//     * Return customer object for given id from dummy database. If customer is
//     * not found for id, returns null.
//     * @param id customer id
//     * @return customer object for given id
//     */
//    public User get(int id) {
//
//        for (User c : customers) {
//            if (c.getId() == id) {
//                return c;
//            }
//        }
//        return null;
//    }
//
//    /**
//     * Create new customer in dummy database. Updates the id and insert new
//     * customer in list.
//     * @param customer Customer object
//     * @return customer object with updated id
//     */
//    public User create(User customer) {
//        customer.setId(1);
//        customers.add(customer);
//        return customer;
//    }
//
//    /**
//     * Delete the customer object from dummy database. If customer not found for
//     * given id, returns null.
//     * @param id the customer id
//     * @return id of deleted customer object
//     */
//    public int delete(int id) {
//
//        for (User c : customers) {
//            if (c.getId() == id) {
//                customers.remove(c);
//                return id;
//            }
//        }
//
//        return 0;
//    }
//
//    /**
//     * Update the customer object for given id in dummy database. If customer
//     * not exists, returns null
//     * @param id
//     * @param customer
//     * @return customer object with id
//     */
//    public User update(Long id, User customer) {
//
//        for (User c : customers) {
//            if (c.getId() == id) {
//                customer.setId(c.getId());
//                customers.remove(c);
//                customers.add(customer);
//                return customer;
//            }
//        }
//
//        return null;
//    }
}
