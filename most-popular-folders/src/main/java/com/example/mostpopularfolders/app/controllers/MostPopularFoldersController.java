package com.example.mostpopularfolders.app.controllers;

import com.example.mostpopularfolders.app.entities.PopularFolder;
import com.example.mostpopularfolders.app.services.PopularFolderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/most_popular_folders")
public class MostPopularFoldersController {
    @Autowired
    private PopularFolderService popularFolderService;

    @GetMapping()
    public List<PopularFolder> mostPopular() {
        return popularFolderService.findAll();
    }
}
