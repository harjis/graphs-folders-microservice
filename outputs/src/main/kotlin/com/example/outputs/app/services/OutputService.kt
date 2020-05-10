package com.example.outputs.app.services

import com.example.outputs.app.entities.Output
import com.example.outputs.app.repositories.OutputRepository
import org.springframework.stereotype.Service

@Service
class OutputService(private val outputRepository: OutputRepository) {
    fun all(): Iterable<Output> = outputRepository.findAll()

    fun save(output: Output) = outputRepository.save(output)
}
