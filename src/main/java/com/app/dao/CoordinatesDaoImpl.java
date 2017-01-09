package com.app.dao;

import com.app.model.Advert;
import com.app.model.Coordinates;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import org.hibernate.Criteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

@Repository("coordinatesDao")
public class CoordinatesDaoImpl extends AbstractDao<String, Coordinates> implements CoordinatesDao {

    static final Logger logger = LoggerFactory.getLogger(UserDaoImpl.class);

    public Coordinates findByKey(String kod) {
        Coordinates coordinates = getByKey(kod);
        return coordinates;
    }

    public List<String> findFilter(String kod, int km) {
        Criteria criteria = createEntityCriteria();
        criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);//To avoid duplicates.
        List<Coordinates> all = (List<Coordinates>) criteria.list();
        List<String> prawidlowe =new ArrayList<String>();
        Coordinates coor = findByKey(kod);

        for (Coordinates coor1 : all) {
            int odleglosc = calculator(coor.getSzerokosc(), coor.getDlugosc(), coor1.getSzerokosc(), coor1.getDlugosc());
            if(odleglosc<=km){
                 prawidlowe.add(coor1.getKodPocztowy());
            }
        }
        return prawidlowe;
    }

    public int calculator(String sz1, String dl1, String sz2, String dl2) {
        double degtorad = 0.01745329;
        double radtodeg = 57.29577951;
        double lat1 = new Double(sz1);
        double lat2 = new Double(sz2);
        double long1 = new Double(dl1);
        double long2 = new Double(dl2);
        double dlong = (long1 - long2);
        double dvalue = (Math.sin(lat1 * degtorad) * Math.sin(lat2 * degtorad))
                            + (Math.cos(lat1 * degtorad) * Math.cos(lat2 * degtorad)
                                   * Math.cos(dlong * degtorad));
        double dd = Math.acos(dvalue) * radtodeg;
        Double km = (dd * 111.302);
        km = (km * 100) / 100;
        return km.intValue();
    }
}