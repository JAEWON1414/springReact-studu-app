package com.example.mystudyapp.service;


import com.example.mystudyapp.domain.Item;
import com.example.mystudyapp.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {
    private final ItemRepository itemRepository;

    @Autowired
    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    public boolean join(String userId, String subjectName, String chapterName, String itemName) {
        Item item = new Item(userId, subjectName, chapterName, itemName);
        itemRepository.save(item);
        return true;
    }

    public List<Item> findItems(String userId, String subjectName, String chapterName) {
        return itemRepository.findItems(userId, subjectName, chapterName);
    }

    public int updateChecked(String userId, String subjectName, String chapterName, String itemName, boolean checked) {
        return itemRepository.updateChecked(userId, subjectName, chapterName, itemName, checked);
    }

    public int delete(String userId, String subjectName, String chapterName, String itemName) {
        return itemRepository.delete(userId, subjectName, chapterName, itemName);
    }
}
