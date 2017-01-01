/*
 * Copyright (c) Krakfin
 * All rights reserved
 */
package com.app.dao;

import com.app.model.Category;
import java.util.List;
import org.hibernate.Criteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

@Repository("categoryDao")
public class CategoryDaoImpl extends AbstractDao<Integer, Category> implements CategoryDao {

    static final Logger logger = LoggerFactory.getLogger(UserDaoImpl.class);

    public Category findById(int id) {
        Category category = getByKey(id);
        return category;
    }

    @SuppressWarnings("unchecked")
    public List<Category> findAll() {
        Criteria criteria = createEntityCriteria().addOrder(Order.asc("name"));
        criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);//To avoid duplicates.
        List<Category> categories = (List<Category>) criteria.list();
        return categories;
    }

    public void save(Category category) {
        persist(category);
    }

    public void delete(String name) {
        Criteria crit = createEntityCriteria();
        crit.add(Restrictions.eq("name", name));
        Category category = (Category) crit.uniqueResult();
        delete(category);
    }

    public Category findByName(String name) {
        logger.info("Name : {}", name);
        Criteria crit = createEntityCriteria();
        crit.add(Restrictions.eq("name", name));
        Category category = (Category) crit.uniqueResult();
        return category;
    }
}