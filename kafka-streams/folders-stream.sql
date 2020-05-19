CREATE STREAM folders WITH (
    kafka_topic = 't_folders',
    value_format = 'avro'
);

CREATE TABLE folders_by_id AS
    SELECT id,
           latest_by_offset(name) AS name,
           count(*) as count
    FROM folders
    GROUP BY id
    EMIT CHANGES;
