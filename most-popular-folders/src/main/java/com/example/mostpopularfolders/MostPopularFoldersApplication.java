package com.example.mostpopularfolders;

import org.apache.kafka.streams.KeyValue;
import org.apache.kafka.streams.kstream.KStream;
import org.apache.kafka.streams.kstream.Printed;
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
        public Function<KStream<String, String>, KStream<String, Folder>> process() {
            return input -> {
                System.out.println("HERE!");
                input.print(Printed.toSysOut());
                System.out.println("HERE22");
                return input.map((key, value) -> {
                    System.out.println("WHAT!");
                    System.out.println(value);
                    return new KeyValue<>(key, new Folder(1L, value));
                });
            };
        }
    }

    static class Folder {
        private Long id;
        private String name;

        public Folder() {

        }

        public Folder(Long id, String name) {
            this.id = id;
            this.name = name;
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }

}
