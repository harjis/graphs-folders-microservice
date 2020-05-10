package com.example.jobs.app.services

import com.example.jobs.app.entities.Job
import com.example.jobs.app.repositories.JobRepository
import org.springframework.stereotype.Service

@Service
class JobService(private val jobRepository: JobRepository) {
    fun all(): Iterable<Job> = jobRepository.findAll()

    fun save(job: Job) = jobRepository.save(job)
}
