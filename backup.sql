CREATE TABLE public.persons (
	id serial NOT NULL,
	"name" varchar NOT NULL,
	email varchar NOT NULL,
	CONSTRAINT personas_pkey PRIMARY KEY (id)
);