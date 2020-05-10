package com.example.jobs.app.repositories

import com.example.jobs.app.entities.Job
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface JobRepository : CrudRepository<Job, UUID>
