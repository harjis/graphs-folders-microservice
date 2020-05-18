package com.example.graphsfoldersanalytics.app.controllers

import com.example.graphsfoldersanalytics.app.services.FolderService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping(path = ["/analytics"])
class JobController(private val folderService: FolderService) {
    @GetMapping("")
    fun index(): String {
        folderService.getGraphs()
        return "Analytics!"
    }
}
