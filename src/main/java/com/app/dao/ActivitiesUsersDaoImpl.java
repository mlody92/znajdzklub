package com.app.dao;

import com.app.model.ActivitiesUsers;
import java.util.List;
import org.hibernate.Criteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

@Repository("activitiesUsersDao")
public class ActivitiesUsersDaoImpl extends AbstractDao<Integer, ActivitiesUsers> implements ActivitiesUsersDao {

    static final Logger logger = LoggerFactory.getLogger(ActivitiesUsersDaoImpl.class);

    @SuppressWarnings("unchecked")
    public List<ActivitiesUsers> findAll() {
        Criteria criteria = createEntityCriteria().addOrder(Order.asc("id"));
        criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);//To avoid duplicates.
        List<ActivitiesUsers> activities = (List<ActivitiesUsers>) criteria.list();
        return activities;
    }

    public ActivitiesUsers findById(int id) {
        ActivitiesUsers advert = getByKey(id);
        return advert;
    }

    public List<ActivitiesUsers> findByUserId(int id) {
        Criteria criteria = createEntityCriteria().add(Restrictions.eq("userId", id));
        criteria.addOrder(Order.asc("id"));
        criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);//To avoid duplicates.
        List<ActivitiesUsers> activities = (List<ActivitiesUsers>) criteria.list();
        return activities;
    }

    public void save(ActivitiesUsers advert) {
        persist(advert);
    }

    public void delete(int id) {
        Criteria crit = createEntityCriteria();
        crit.add(Restrictions.eq("id", id));
        ActivitiesUsers advert = (ActivitiesUsers) crit.uniqueResult();
        delete(advert);
    }
}