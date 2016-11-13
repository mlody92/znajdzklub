package com.app.dao;

import com.app.model.User;
import java.util.List;
import org.hibernate.Criteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

@Repository("userDao")
public class UserDaoImpl extends AbstractDao<Integer, User> implements UserDao {

    static final Logger logger = LoggerFactory.getLogger(UserDaoImpl.class);

    public User findById(int id) {
        User user = getByKey(id);
//        if(user!=null){
//            Hibernate.initialize(user.getUsers());
//        }
        return user;
    }

    public User findBySSO(String sso) {
        logger.info("SSO : {}", sso);
        Criteria crit = createEntityCriteria();
        crit.add(Restrictions.eq("ssoId", sso));
        User user = (User)crit.uniqueResult();
//        if(user!=null){
//            Hibernate.initialize(user.getUsers());
//        }
        return user;
    }

    @SuppressWarnings("unchecked")
    public List<User> findAllUsers() {
        Criteria criteria = createEntityCriteria().addOrder(Order.asc("firstName"));
        criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);//To avoid duplicates.
        List<User> users = (List<User>) criteria.list();

        // No need to fetch userProfiles since we are not showing them on list page. Let them lazy load.
        // Uncomment below lines for eagerly fetching of userProfiles if you want.
        /*
        for(User user : users){
            Hibernate.initialize(user.getUserProfiles());
        }*/
        return users;
    }

    public void save(User user) {
        persist(user);
    }

    public void deleteBySSO(String sso) {
        Criteria crit = createEntityCriteria();
        crit.add(Restrictions.eq("ssoId", sso));
        User user = (User)crit.uniqueResult();
        delete(user);
    }

}
//
//public class UserDaoImpl implements UserDao {
//
//    DataSource dataSource;
//
//    public DataSource getDataSource() {
//        return this.dataSource;
//    }
//
//    public void setDataSource(DataSource dataSource) {
//        this.dataSource = dataSource;
//    }
//
//    @Override
//    public boolean isValidUser(String username, String password) throws SQLException {
//        //        String query = "Select count(1) from user where username = ? and password = ?";
//        //        PreparedStatement pstmt = dataSource.getConnection().prepareStatement(query);
//        //        pstmt.setString(1, username);
//        //        pstmt.setString(2, password);
//        //        ResultSet resultSet = pstmt.executeQuery();
//        //        if(resultSet.next())
//        //            return (resultSet.getInt(1) > 0);
//        //        else
//        //            return false;
//
//        return false;
//    }
//
//}