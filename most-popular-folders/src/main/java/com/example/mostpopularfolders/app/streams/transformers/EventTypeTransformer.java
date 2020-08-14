package com.example.mostpopularfolders.app.streams.transformers;

import com.example.mostpopularfolders.app.streams.messages.Event;
import com.example.mostpopularfolders.app.streams.messages.EventWithEventType;
import org.apache.kafka.common.header.Header;
import org.apache.kafka.common.serialization.Serde;
import org.apache.kafka.streams.KeyValue;
import org.apache.kafka.streams.kstream.Transformer;
import org.apache.kafka.streams.processor.ProcessorContext;
import org.springframework.context.annotation.Bean;
import org.springframework.kafka.support.serializer.JsonSerde;

import java.util.Optional;
import java.util.stream.StreamSupport;

public class EventTypeTransformer implements Transformer<String, Event, KeyValue<String, EventWithEventType>> {
    private ProcessorContext context;

    @Override
    public void init(ProcessorContext context) {
        this.context = context;
    }

    @Override
    public KeyValue<String, EventWithEventType> transform(String key, Event value) {
        Iterable<Header> hr = this.context.headers().headers("eventType");
        Optional<Header> eventTypeHeader = StreamSupport.stream(hr.spliterator(), false).findFirst();

        return new KeyValue<>(
                key,
                new EventWithEventType(value.payload, new String(eventTypeHeader.get().value()))
        );
    }

    @Override
    public void close() {

    }

    @Bean
    public Serde<Event> eventInSerde() {
        return new JsonSerde<>(Event.class);
    }

    @Bean
    public Serde<EventWithEventType> eventWithTypeInSerde() {
        return new JsonSerde<>(EventWithEventType.class);
    }
}
