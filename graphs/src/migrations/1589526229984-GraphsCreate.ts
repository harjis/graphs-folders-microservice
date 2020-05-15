import { MigrationInterface, QueryRunner } from 'typeorm';

export class GraphsFoldersCreate1589526229984 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
CREATE TABLE public.graphs (
    id integer NOT NULL,
    name character varying NOT NULL,
    "folderId" integer NOT NULL
);
ALTER TABLE public.graphs OWNER TO postgres;
CREATE SEQUENCE public.graphs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE public.graphs_id_seq OWNER TO postgres;
ALTER SEQUENCE public.graphs_id_seq OWNED BY public.graphs.id;


CREATE TABLE public.t_folders (
    id integer NOT NULL,
    name character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.t_folders OWNER TO postgres;
CREATE SEQUENCE public.t_folders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE public.t_folders_id_seq OWNER TO postgres;
ALTER SEQUENCE public.t_folders_id_seq OWNED BY public.t_folders.id;

ALTER TABLE ONLY public.graphs ALTER COLUMN id SET DEFAULT nextval('public.graphs_id_seq'::regclass);
ALTER TABLE ONLY public.t_folders ALTER COLUMN id SET DEFAULT nextval('public.t_folders_id_seq'::regclass);

SELECT pg_catalog.setval('public.graphs_id_seq', 1, false);
SELECT pg_catalog.setval('public.t_folders_id_seq', 1, false);

ALTER TABLE ONLY public.t_folders
    ADD CONSTRAINT "PK_390a357f2921004067ad416e04f" PRIMARY KEY (id);
ALTER TABLE ONLY public.graphs
    ADD CONSTRAINT "PK_4f32e4f134362de610c87cb99e7" PRIMARY KEY (id);
ALTER TABLE ONLY public.graphs
    ADD CONSTRAINT "FK_17c34853f70a746e7cd78301d77" FOREIGN KEY ("folderId") REFERENCES public.t_folders(id);
`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
