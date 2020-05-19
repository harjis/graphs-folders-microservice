CREATE STREAM folders WITH (
    kafka_topic = 't_folders',
    value_format = 'avro'
);

CREATE TABLE folders_by_id AS
    SELECT id,
           name
    FROM folders
    EMIT CHANGES;
