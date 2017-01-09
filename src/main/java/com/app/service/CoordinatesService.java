package com.app.service;

import com.app.model.Advert;
import com.app.model.Coordinates;
import java.util.List;

public interface CoordinatesService {

    Coordinates findByKey(String id);

    List<String> findFilter(String kod, int km);
}
