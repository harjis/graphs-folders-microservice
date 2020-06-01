-- FOLDERS
CREATE STREAM folders WITH (
    kafka_topic = 'folders',
    value_format = 'avro'
);

CREATE STREAM folders_stream2 WITH (
    kafka_topic = 'folders_stream2',
    value_format = 'avro'
)
AS
SELECT after->id as id,
after->name as name
FROM folders
PARTITION BY after->id
EMIT CHANGES;

CREATE TABLE folders_tbl (rowkey INTEGER PRIMARY KEY, name VARCHAR)
WITH (
    kafka_topic = 'folders_stream2',
    value_format = 'avro'
);

-- FOLDERS
-- GRAPHS

CREATE STREAM graphs WITH (
    kafka_topic = 'graphs',
    value_format = 'avro'
);

CREATE STREAM graphs_stream WITH (
    kafka_topic = 'graphs_stream',
    value_format = 'avro'
)
AS
SELECT after->id as id,
after->name as name,
after->folderId as folderId
FROM graphs
PARTITION BY after->id
EMIT CHANGES;

CREATE STREAM graphs_by_folderid as select * from graphs_stream PARTITION BY folderId;

CREATE TABLE graphs_tbl WITH (
    kafka_topic = 'GRAPHS_BY_FOLDERID',
    value_format = 'avro'
);

-- GRAPHS

-- So this doesnt work because streams needs to be in from and table in join
-- CREATE TABLE most_popular_folder AS
--     SELECT f.rowkey, f.name, g.name
--     FROM folders_tbl f
--     JOIN graphs_by_folderid g ON f.rowkey = g.folderId
--     EMIT CHANGES;

CREATE TABLE most_popular_folders AS
    SELECT f.rowkey, f.name, COUNT(*) as graphCount
    FROM graphs_by_folderid g
    JOIN folders_tbl f on f.rowkey = g.folderId
    GROUP BY f.rowkey, f.name
    EMIT CHANGES;
