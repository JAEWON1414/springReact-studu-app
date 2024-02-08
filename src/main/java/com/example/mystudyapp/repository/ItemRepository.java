package com.example.mystudyapp.repository;


import com.example.mystudyapp.domain.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {

    @Query("SELECT i FROM Item i WHERE i.userId=:userId and i.subjectName=:subjectName and i.chapterName=:chapterName")
    List<Item> findItems(String userId, String subjectName, String chapterName);

    @Transactional
    @Modifying
    @Query("UPDATE Item i SET i.checked=:checked " +
            "WHERE i.userId=:userId and i.subjectName=:subjectName and i.chapterName=:chapterName and i.itemName=:itemName")
    int updateChecked(String userId, String subjectName, String chapterName, String itemName, boolean checked);

    @Transactional
    @Modifying
    @Query("UPDATE Item i SET i.checked =:checked WHERE i.userId=:userId and i.subjectName=:subjectName and i.chapterName=:chapterName")
    void updateCheckByChapterName(String userId, String subjectName, String chapterName, boolean checked);

    @Transactional
    @Modifying
    @Query("DELETE Item i WHERE i.userId=:userId and i.subjectName=:subjectName and i.chapterName=:chapterName and i.itemName=:itemName")
    int delete(String userId, String subjectName, String chapterName, String itemName);
}
