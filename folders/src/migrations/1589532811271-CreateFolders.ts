import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFolders1589532811271 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
CREATE TABLE public.folders (
    id integer NOT NULL,
    name character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);

ALTER TABLE public.folders OWNER TO postgres;

CREATE SEQUENCE public.folders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.folders_id_seq OWNER TO postgres;
ALTER SEQUENCE public.folders_id_seq OWNED BY public.folders.id;

ALTER TABLE ONLY public.folders ALTER COLUMN id SET DEFAULT nextval('public.folders_id_seq'::regclass);

SELECT pg_catalog.setval('public.folders_id_seq', 1, true);

ALTER TABLE ONLY public.folders
    ADD CONSTRAINT "PK_8578bd31b0e7f6d6c2480dbbca8" PRIMARY KEY (id);

`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
