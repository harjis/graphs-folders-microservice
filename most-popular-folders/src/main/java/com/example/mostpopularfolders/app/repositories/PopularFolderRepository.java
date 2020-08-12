package com.example.mostpopularfolders.app.repositories;

import com.example.mostpopularfolders.app.entities.PopularFolder;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

@Repository
public interface PopularFolderRepository extends JpaRepository<PopularFolder, Long> {
}
