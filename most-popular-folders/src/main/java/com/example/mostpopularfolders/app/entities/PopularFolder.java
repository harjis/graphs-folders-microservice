package com.example.mostpopularfolders.app.entities;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class PopularFolder {
    @Id
    private Long id;
    private String name;
    private Long count;

    public PopularFolder() {

    }

    public PopularFolder(Long id, String name, Long count) {
        this.id = id;
        this.name = name;
        this.count = count;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setCount(Long count) {
        this.count = count;
    }

    public Long getCount() {
        return count;
    }
}
