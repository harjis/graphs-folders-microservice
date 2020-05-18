package com.example.graphsfoldersanalytics.app.services

import org.apache.kafka.streams.KafkaStreams
import org.apache.kafka.streams.StreamsBuilder
import org.springframework.stereotype.Service
import java.util.*

data class Folder(val id: Long, val name: String)

@Service
class FolderService {
    fun getGraphs() {
        val builder = StreamsBuilder()

        val stream = builder.stream<String, Folder>("T_FOLDERS")
        println(stream)
        stream.foreach { key, value ->
            println(key)
            println(value)
        }

        val properties = Properties()
        val kafkaStreams = KafkaStreams(builder.build(), properties)
    }
}
