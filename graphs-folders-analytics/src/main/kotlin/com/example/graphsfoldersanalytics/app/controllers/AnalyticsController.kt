package com.example.graphsfoldersanalytics.app.controllers

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping(path = ["/analytics"])
class JobController() {
    @GetMapping("")
    fun index(): String {
        return "Analytics!"
    }
}
