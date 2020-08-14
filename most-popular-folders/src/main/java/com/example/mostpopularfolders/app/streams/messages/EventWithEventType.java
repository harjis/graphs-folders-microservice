package com.example.mostpopularfolders.app.streams.messages;

public class EventWithEventType {
    public Graph payload;
    public String eventType;

    public EventWithEventType(Graph payload, String eventType) {
        this.payload = payload;
        this.eventType = eventType;
    }
}
