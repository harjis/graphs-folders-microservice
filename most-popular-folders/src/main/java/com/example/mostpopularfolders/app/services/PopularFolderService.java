package com.example.mostpopularfolders.app.services;

import com.example.mostpopularfolders.app.entities.PopularFolder;
import com.example.mostpopularfolders.app.repositories.PopularFolderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PopularFolderService {
    @Autowired
    private PopularFolderRepository popularFolderRepository;

    public List<PopularFolder> findAll(){
        return popularFolderRepository.findAll();
    }
}
