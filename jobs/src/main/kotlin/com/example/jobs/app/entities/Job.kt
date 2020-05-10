package com.example.jobs.app.entities

import java.util.*
import javax.persistence.Entity

@Entity
class Job(
        var name: String,
        id: UUID = UUID.randomUUID()
) : AbstractJpaPersistable<UUID>(id) {}
