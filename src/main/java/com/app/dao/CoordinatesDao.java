package com.app.dao;

import com.app.model.Advert;
import com.app.model.Coordinates;
import java.util.List;

public interface CoordinatesDao {

    Coordinates findByKey(String kod);

    List<String> findFilter(String kod, int km);
}
