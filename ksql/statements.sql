CREATE STREAM folders WITH (
    kafka_topic = 'folders',
    value_format = 'avro'
);

CREATE STREAM graphs WITH (
    kafka_topic = 'graphs',
    value_format = 'avro'
)
