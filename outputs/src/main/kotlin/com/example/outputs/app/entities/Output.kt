package com.example.outputs.app.entities

import java.util.*
import javax.persistence.Entity

@Entity
class Output(
        var name: String,
        id: UUID = UUID.randomUUID()
) : AbstractJpaPersistable<UUID>(id) {}
