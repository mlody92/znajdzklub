package com.app.service;

import com.app.model.Advert;
import java.util.List;

public interface AdvertService {

    Advert findById(int id);

    List<Advert> findByCategoryId(int id);

    List<Advert> findByUserId(int id);

    List<Advert> findByKodPocztowy(List<String> kody, int catId);

    Advert findByTitle(String title);

    String save(Advert user);

    void update(Advert user);

    void delete(int id);

    List<Advert> findAll();

    List<Advert> findAktywne();

    List<Advert> findDoZatwierdzenia();

    List<Advert> findOdrzucone();

    List<Advert> findNieaktywne();

    boolean isUnique(Advert advert);
}
