import { MigrationInterface, QueryRunner } from 'typeorm';

export class GraphsCreate1589526229984 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
CREATE TABLE public.graphs (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
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
`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
