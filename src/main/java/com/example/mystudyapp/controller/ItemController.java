package com.example.mystudyapp.controller;


import com.example.mystudyapp.domain.Item;
import com.example.mystudyapp.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/api/items")
public class ItemController {
    private final ItemService itemService;

    @Autowired
    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @ResponseBody
    @PostMapping("create")
    public boolean create(@RequestBody final Item item) {
        return itemService.join(item.getUserId(), item.getSubjectName(), item.getChapterName(), item.getItemName());
    }

    @ResponseBody
    @PostMapping("")
    public List<Item> read(@RequestBody final Item item) {
        List<Item> list = itemService.findItems(item.getUserId(), item.getSubjectName(), item.getChapterName());
        return list;
    }

    @ResponseBody
    @PostMapping("updateCheck")
    public int update(@RequestBody final Item item) {
        System.out.println("updateCheck item = " + item.getUserId() + " " + item.getSubjectName() + " " + item.getChapterName() + " " + item.getItemName() + " " + item.isChecked());
        return itemService.updateChecked(item.getUserId(), item.getSubjectName(), item.getChapterName(), item.getItemName(), item.isChecked());
    }
    @ResponseBody
    @PostMapping("updateCheckByChapterName")
    public int updateCheckByChapterName(@RequestBody final Item item){
        itemService.updateCheckByChapterName(item.getUserId(), item.getSubjectName(), item.getChapterName(), item.isChecked());
        return 1;
    }

    @ResponseBody
    @PostMapping("delete")
    public int delete(@RequestBody final Item item) {
        return itemService.delete(item.getUserId(), item.getSubjectName(), item.getChapterName(), item.getItemName());
    }
}
