package com.example.mostpopularfolders.app.streams;

import com.example.mostpopularfolders.app.streams.messages.Event;
import com.example.mostpopularfolders.app.streams.messages.EventWithEventType;
import com.example.mostpopularfolders.app.streams.transformers.EventTypeTransformer;
import org.apache.kafka.streams.kstream.KStream;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class MostPopularFoldersStreamProcessor {
    @Bean
    public Function<KStream<String, Event>, KStream<String, EventWithEventType>> process() {
        return input -> input.transform(() -> new EventTypeTransformer());
    }
}
