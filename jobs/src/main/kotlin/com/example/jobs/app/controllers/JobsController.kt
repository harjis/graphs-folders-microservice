package com.example.jobs.app.controllers

import com.example.jobs.app.entities.Job
import com.example.jobs.app.services.JobService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping(path = ["/jobs"])
class JobController(private val jobService: JobService) {
    @GetMapping("")
    fun index() = jobService.all()

    @PostMapping("")
    fun save(@RequestBody job: Job) = jobService.save(job)
}
