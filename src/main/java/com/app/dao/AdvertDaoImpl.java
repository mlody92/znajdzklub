package com.app.dao;

import com.app.model.Advert;
import java.util.LinkedList;
import java.util.List;
import org.hibernate.Criteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

@Repository("advertDao")
public class AdvertDaoImpl extends AbstractDao<Integer, Advert> implements AdvertDao {

    static final Logger logger = LoggerFactory.getLogger(UserDaoImpl.class);

    public Advert findById(int id) {
        Advert advert = getByKey(id);
        return advert;
    }

    @SuppressWarnings("unchecked")
    public List<Advert> findByCategoryId(int id) {
        Criteria criteria = getSession().createCriteria(Advert.class, "advert");
        criteria.add(Restrictions.eq("categoryId", id));
        criteria.addOrder(Order.asc("title"));
        criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);//To avoid duplicates.
        List<Advert> adverts = (List<Advert>) criteria.list();
        return adverts;
    }

    @SuppressWarnings("unchecked")
    public List<Advert> findByUserId(int id) {
        Criteria criteria = getSession().createCriteria(Advert.class, "advert");
        criteria.add(Restrictions.eq("userId", id));
        criteria.addOrder(Order.asc("title"));
        criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);//To avoid duplicates.
        List<Advert> adverts = (List<Advert>) criteria.list();
        return adverts;
    }

    @SuppressWarnings("unchecked")
    public List<Advert> findAll() {
        Criteria criteria = createEntityCriteria().addOrder(Order.asc("title"));
        criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);//To avoid duplicates.
        List<Advert> adverts = (List<Advert>) criteria.list();
        return adverts;
    }

    public void save(Advert advert) {
        persist(advert);
    }

    public void delete(int id) {
        Criteria crit = createEntityCriteria();
        crit.add(Restrictions.eq("id", id));
        Advert advert = (Advert) crit.uniqueResult();
        delete(advert);
    }

    public Advert findByTitle(String title) {
        logger.info("Title : {}", title);
        Criteria crit = createEntityCriteria();
        crit.add(Restrictions.eq("title", title));
        Advert advert = (Advert) crit.uniqueResult();
        return advert;
    }

    @SuppressWarnings("unchecked")
    public List<Advert> findByKodPocztowy(List<String> kody, int catId) {
        Criteria criteria = getSession().createCriteria(Advert.class, "advert");
        criteria.add(Restrictions.eq("categoryId", catId));
        criteria.add(Restrictions.in("postalCode", kody));
        criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);//To avoid duplicates.
        List<Advert> adverts = (List<Advert>) criteria.list();
        return adverts;
    }
}