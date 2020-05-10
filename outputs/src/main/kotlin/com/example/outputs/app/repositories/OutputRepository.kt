package com.example.outputs.app.repositories

import com.example.outputs.app.entities.Output
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface OutputRepository : CrudRepository<Output, UUID>
