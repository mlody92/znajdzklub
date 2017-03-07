package com.app.dao;

import com.app.model.Advert;
import java.util.List;

public interface AdvertDao {

    Advert findById(int id);

    List<Advert> findByCategoryId(int id);

    List<Advert> findByUserId(int id);

    Advert findByTitle(String title);

    void save(Advert user);

    void delete(int id);

    List<Advert> findAll();

    List<Advert> findAktywne();

    List<Advert> findDoZatwierdzenia();

    List<Advert> findOdrzucone();

    List<Advert> findNieaktywne();

    List<Advert> findByKodPocztowy(List<String> kody, int catId);
}
