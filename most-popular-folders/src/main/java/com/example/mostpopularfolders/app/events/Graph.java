package com.example.mostpopularfolders.app.events;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Map;

public class Graph {
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

