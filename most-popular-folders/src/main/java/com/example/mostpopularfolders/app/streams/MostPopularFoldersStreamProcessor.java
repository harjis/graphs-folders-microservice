package com.example.mostpopularfolders.app.streams;

import com.example.mostpopularfolders.app.events.Event;
import org.apache.kafka.common.serialization.Serde;
import org.apache.kafka.streams.KeyValue;
import org.apache.kafka.streams.kstream.KStream;
import org.springframework.context.annotation.Bean;
import org.springframework.kafka.support.serializer.JsonSerde;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class MostPopularFoldersStreamProcessor {
    @Bean
    public Function<KStream<String, Event>, KStream<String, Event>> process() {
        return input ->
                input.map((key, value) -> new KeyValue<>(key, value));
    }

    @Bean
    public Serde<Event> graphInSerde() {
        return new JsonSerde<>(Event.class);
    }
}
