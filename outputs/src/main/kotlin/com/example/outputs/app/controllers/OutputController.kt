package com.example.outputs.app.controllers

import com.example.outputs.app.entities.Output
import com.example.outputs.app.services.OutputService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping(path = ["/outputs"])
class OutputController(private val outputService: OutputService) {
    @GetMapping("")
    fun index() = outputService.all()

    @PostMapping("")
    fun save(@RequestBody output: Output) = outputService.save(output)
}
