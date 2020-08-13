package com.example.mostpopularfolders;

import com.example.mostpopularfolders.app.serdes.SerdeFactory;
import org.apache.kafka.common.serialization.Serde;
import org.apache.kafka.streams.KeyValue;
import org.apache.kafka.streams.kstream.KStream;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.function.Function;

@SpringBootApplication
public class MostPopularFoldersApplication {

    public static void main(String[] args) {
        SpringApplication.run(MostPopularFoldersApplication.class, args);
    }


    public static class MostPopularFoldersProcessor {
        @Bean
        public Function<KStream<String, Graph>, KStream<String, Graph>> process() {
            return input ->
                    input.map((key, value) -> {
                        System.out.println(value);
                        return new KeyValue<>(key, value);
                    });
        }
    }

    class Graph {
        public Long id;
        public String name;
        public Long folderId;
    }

    @Bean
    public Serde<Graph> graphInSerde() {
        return SerdeFactory.createDbzEventJsonPojoSerdeFor(Graph.class, false);
    }

}
