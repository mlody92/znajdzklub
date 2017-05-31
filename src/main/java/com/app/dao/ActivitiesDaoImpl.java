package com.app.dao;

import com.app.model.Activities;
import java.util.List;
import org.hibernate.Criteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

@Repository("activitiesDao")
public class ActivitiesDaoImpl extends AbstractDao<Integer, Activities> implements ActivitiesDao {

    static final Logger logger = LoggerFactory.getLogger(ActivitiesDaoImpl.class);

    @SuppressWarnings("unchecked")
    public List<Activities> findAll() {
        Criteria criteria = createEntityCriteria().addOrder(Order.asc("id"));
        criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);//To avoid duplicates.
        List<Activities> activities = (List<Activities>) criteria.list();
        return activities;
    }
    @SuppressWarnings("unchecked")
    public void save(Activities activities) {
        persist(activities);
    }
    @SuppressWarnings("unchecked")
    public void delete(int id) {
        Criteria crit = createEntityCriteria();
        crit.add(Restrictions.eq("id", id));
        Activities activities = (Activities) crit.uniqueResult();
        delete(activities);
    }

    @SuppressWarnings("unchecked")
    public Activities findById(int id) {
        Activities activities = getByKey(id);
        return activities;
    }
}