package com.app.dao;

import com.app.model.Advert;
import com.app.model.Category;
import com.app.model.User;
import java.util.LinkedList;
import java.util.List;
import org.hibernate.Criteria;
import org.hibernate.Session;
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
        Criteria criteria = createEntityCriteria();
        criteria.add(Restrictions.eq("categoryId", id));
        criteria.add(Restrictions.eq("status", "aktywne"));
        criteria.addOrder(Order.asc("title"));
        criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);//To avoid duplicates.
        List<Advert> adverts = (List<Advert>) criteria.list();
        return adverts;
    }

    @SuppressWarnings("unchecked")
    public List<Advert> findByUserId(int id) {
        Criteria criteria = createEntityCriteria();
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

    @SuppressWarnings("unchecked")
    public List<AdvertDetails> findAdvertLists(String status) {
        //        Criteria criteria = createEntityCriteria().addOrder(Order.asc("title"));
        //        criteria.add(Restrictions.eq("status", status));
        //        criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);//To avoid duplicates.
        //        List<Advert> adverts = (List<Advert>) criteria.list();
        //        return adverts;
        List<AdvertDetails> advertDetailsList = new LinkedList<>();
        Session s = getSession();
        List<Object[]> result = s.createQuery("from Advert a, Category c , User u where a.categoryId=c.id and a.userId=u.id and a.status='"+status+"'").list();
        for (Object[] obj : result) {
            AdvertDetails tmp = new AdvertDetails((Advert) obj[0], (Category) obj[1], (User) obj[2]);
            advertDetailsList.add(tmp);
        }
        return advertDetailsList;
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
        Criteria criteria = createEntityCriteria();
        criteria.add(Restrictions.eq("categoryId", catId));
        criteria.add(Restrictions.in("postalCode", kody));
        criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);//To avoid duplicates.
        List<Advert> adverts = (List<Advert>) criteria.list();
        return adverts;
    }

    public class AdvertDetails {

        private Advert advert;
        private Category category;
        private User user;

        public AdvertDetails(Advert advert, Category category, User user) {
            this.advert = advert;
            this.category = category;
            this.user = user;
        }

        public Advert getAdvert() {
            return advert;
        }

        public Category getCategory() {
            return category;
        }

        public User getUser() {
            return user;
        }
    }
}