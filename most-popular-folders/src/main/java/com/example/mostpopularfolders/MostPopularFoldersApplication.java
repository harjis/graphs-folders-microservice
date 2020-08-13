package com.example.mostpopularfolders;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.kafka.common.serialization.Serde;
import org.apache.kafka.streams.KeyValue;
import org.apache.kafka.streams.kstream.KStream;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.kafka.support.serializer.JsonSerde;

import java.util.Map;
import java.util.function.Function;

@SpringBootApplication
public class MostPopularFoldersApplication {

    public static void main(String[] args) {
        SpringApplication.run(MostPopularFoldersApplication.class, args);
    }

    public static class MostPopularFoldersProcessor {
        @Bean
        public Function<KStream<String, Event>, KStream<String, Event>> process() {
            return input ->
                    input.map((key, value) -> new KeyValue<>(key, value));
        }
    }

    static class Event {
        public Graph payload;
    }

    static class Graph {
        private ObjectMapper objectMapper = new ObjectMapper();
        public Integer id;
        public String name;
        public Integer folderId;

        Graph(String str) throws JsonProcessingException {
            Map temp = objectMapper.readValue(str, Map.class);
            this.id = (Integer) temp.get("id");
            this.name = (String) temp.get("name");
            this.folderId = (Integer) temp.get("folderId");
        }
    }

    @Bean
    public Serde<Event> graphInSerde() {
        return new JsonSerde<>(Event.class);
    }

}
