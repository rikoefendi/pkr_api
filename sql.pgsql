--
-- PostgreSQL database dump
--

-- Dumped from database version 13.4 (Ubuntu 13.4-0ubuntu0.21.04.1)
-- Dumped by pg_dump version 13.4 (Ubuntu 13.4-0ubuntu0.21.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: adonis_schema; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.adonis_schema (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    batch integer NOT NULL,
    migration_time timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.adonis_schema OWNER TO root;

--
-- Name: adonis_schema_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.adonis_schema_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.adonis_schema_id_seq OWNER TO root;

--
-- Name: adonis_schema_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.adonis_schema_id_seq OWNED BY public.adonis_schema.id;


--
-- Name: answers; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.answers (
    id integer NOT NULL,
    question_id integer NOT NULL,
    score integer,
    answer character varying(1500) NOT NULL,
    is_choice boolean DEFAULT false,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE public.answers OWNER TO root;

--
-- Name: answers_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.answers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.answers_id_seq OWNER TO root;

--
-- Name: answers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.answers_id_seq OWNED BY public.answers.id;


--
-- Name: api_tokens; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.api_tokens (
    id integer NOT NULL,
    user_id integer,
    name character varying(255) NOT NULL,
    type character varying(255) NOT NULL,
    token character varying(64) NOT NULL,
    expires_at timestamp with time zone,
    created_at timestamp with time zone NOT NULL
);


ALTER TABLE public.api_tokens OWNER TO root;

--
-- Name: api_tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.api_tokens_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.api_tokens_id_seq OWNER TO root;

--
-- Name: api_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.api_tokens_id_seq OWNED BY public.api_tokens.id;


--
-- Name: components; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.components (
    id integer NOT NULL,
    name character varying(255),
    label character varying(255),
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE public.components OWNER TO root;

--
-- Name: components_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.components_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.components_id_seq OWNER TO root;

--
-- Name: components_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.components_id_seq OWNED BY public.components.id;


--
-- Name: counselors; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.counselors (
    id integer NOT NULL,
    file_id integer,
    name character varying(255),
    description character varying(255),
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE public.counselors OWNER TO root;

--
-- Name: counselors_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.counselors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.counselors_id_seq OWNER TO root;

--
-- Name: counselors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.counselors_id_seq OWNED BY public.counselors.id;


--
-- Name: evaluations; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.evaluations (
    id integer NOT NULL,
    name character varying(225),
    description character varying(500),
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE public.evaluations OWNER TO root;

--
-- Name: evaluations_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.evaluations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.evaluations_id_seq OWNER TO root;

--
-- Name: evaluations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.evaluations_id_seq OWNED BY public.evaluations.id;


--
-- Name: files; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.files (
    id integer NOT NULL,
    parent_id integer NOT NULL,
    name character varying(225) NOT NULL,
    "unique" character varying(225) NOT NULL,
    private boolean DEFAULT false,
    type text NOT NULL,
    mime character varying(20) NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    CONSTRAINT files_type_check CHECK ((type = ANY (ARRAY['IDENTITY'::text, 'MEMBER'::text, 'MODULE'::text, 'PROFILE'::text, 'CONSELING'::text, 'ASSETS'::text])))
);


ALTER TABLE public.files OWNER TO root;

--
-- Name: files_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.files_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.files_id_seq OWNER TO root;

--
-- Name: files_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.files_id_seq OWNED BY public.files.id;


--
-- Name: schedules; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.schedules (
    id integer NOT NULL,
    counselor_id integer,
    subject_id integer NOT NULL,
    description character varying(1000),
    start_date timestamp with time zone,
    end_date timestamp with time zone,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE public.schedules OWNER TO root;

--
-- Name: schedules_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.schedules_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.schedules_id_seq OWNER TO root;

--
-- Name: schedules_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.schedules_id_seq OWNED BY public.schedules.id;


--
-- Name: subject_components; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.subject_components (
    id integer NOT NULL,
    subject_id integer,
    component_id integer,
    label character varying(255),
    description character varying(255),
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE public.subject_components OWNER TO root;

--
-- Name: subject_components_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.subject_components_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.subject_components_id_seq OWNER TO root;

--
-- Name: subject_components_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.subject_components_id_seq OWNED BY public.subject_components.id;


--
-- Name: subjects; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.subjects (
    id integer NOT NULL,
    training_id integer NOT NULL,
    name character varying(255),
    description character varying(255),
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE public.subjects OWNER TO root;

--
-- Name: subjects_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.subjects_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.subjects_id_seq OWNER TO root;

--
-- Name: subjects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.subjects_id_seq OWNED BY public.subjects.id;


--
-- Name: trainings; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.trainings (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(255),
    capacity character varying(10),
    status character varying(255) DEFAULT 'draft'::character varying,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE public.trainings OWNER TO root;

--
-- Name: trainings_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.trainings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.trainings_id_seq OWNER TO root;

--
-- Name: trainings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.trainings_id_seq OWNED BY public.trainings.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(225) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(180) NOT NULL,
    remember_me_token character varying(255),
    email_verified_at character varying(255),
    phone character varying(16),
    status character varying(255),
    birthday date,
    gender text,
    jobs character varying(255),
    job_duration character varying(255),
    home_town character varying(255),
    str_number character varying(255),
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    deleted_at timestamp with time zone,
    CONSTRAINT users_gender_check CHECK ((gender = ANY (ARRAY['LAKI-LAKI'::text, 'PEREMPUAN'::text])))
);


ALTER TABLE public.users OWNER TO root;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO root;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: adonis_schema id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.adonis_schema ALTER COLUMN id SET DEFAULT nextval('public.adonis_schema_id_seq'::regclass);


--
-- Name: answers id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.answers ALTER COLUMN id SET DEFAULT nextval('public.answers_id_seq'::regclass);


--
-- Name: api_tokens id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.api_tokens ALTER COLUMN id SET DEFAULT nextval('public.api_tokens_id_seq'::regclass);


--
-- Name: components id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.components ALTER COLUMN id SET DEFAULT nextval('public.components_id_seq'::regclass);


--
-- Name: counselors id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.counselors ALTER COLUMN id SET DEFAULT nextval('public.counselors_id_seq'::regclass);


--
-- Name: evaluations id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.evaluations ALTER COLUMN id SET DEFAULT nextval('public.evaluations_id_seq'::regclass);


--
-- Name: files id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.files ALTER COLUMN id SET DEFAULT nextval('public.files_id_seq'::regclass);


--
-- Name: schedules id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.schedules ALTER COLUMN id SET DEFAULT nextval('public.schedules_id_seq'::regclass);


--
-- Name: subject_components id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.subject_components ALTER COLUMN id SET DEFAULT nextval('public.subject_components_id_seq'::regclass);


--
-- Name: subjects id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.subjects ALTER COLUMN id SET DEFAULT nextval('public.subjects_id_seq'::regclass);


--
-- Name: trainings id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.trainings ALTER COLUMN id SET DEFAULT nextval('public.trainings_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: adonis_schema; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.adonis_schema (id, name, batch, migration_time) FROM stdin;
1	database/migrations/1623144538293_users	1	2021-09-11 07:21:08.914403+07
2	database/migrations/1623144538298_api_tokens	1	2021-09-11 07:21:08.975277+07
3	database/migrations/1629959511697_files	1	2021-09-11 07:21:09.022539+07
10	database/migrations/1633147518484_trainings	2	2021-10-04 08:10:12.266778+07
11	database/migrations/1633308924963_subjects	3	2021-10-04 08:10:46.04573+07
12	database/migrations/1633308924964_schedules	3	2021-10-04 08:10:46.099832+07
13	database/migrations/1633330059494_counselors	4	2021-10-04 14:00:32.376706+07
14	database/migrations/1633332075257_components	5	2021-10-04 14:49:17.305748+07
15	database/migrations/1633332101393_subject_components	5	2021-10-04 14:49:17.365741+07
29	database/migrations/1633843660271_evaluations	6	2021-10-11 23:09:35.309784+07
30	database/migrations/1633844644772_answers	6	2021-10-11 23:09:35.366007+07
\.


--
-- Data for Name: answers; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.answers (id, question_id, score, answer, is_choice, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: api_tokens; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.api_tokens (id, user_id, name, type, token, expires_at, created_at) FROM stdin;
5	2	Opaque Access Token	api	0e0a5e7532f9afe43d1f6a8bde7954cfce308fe9cbf60ff6e70b8396085192ea	2021-09-18 09:48:27.099+07	2021-09-11 09:48:27.1+07
6	3	Verify Email Token	email_token	f35bc26df8ffa5444d2417f29d712f0b39978db72b01f0392190800193ea9ff2	2021-09-11 19:28:21.989+07	2021-09-11 18:28:21.996+07
7	3	Opaque Access Token	api	35c23369d21803774f60057635c2a2a7f88f392946d4be28aa5f3f0a74598d2e	2021-09-18 18:28:22.414+07	2021-09-11 18:28:22.415+07
8	4	Verify Email Token	email_token	05fd5ebab415949a5b5e5464aeaab8f701cd00afce61acdce24a04528fd0255e	2021-09-11 19:29:00.035+07	2021-09-11 18:29:00.042+07
9	4	Opaque Access Token	api	2586bc5e3bc9ecea399be4cb4af801155782496908de6220213b5b33bb890417	2021-09-18 18:29:00.357+07	2021-09-11 18:29:00.358+07
11	5	Opaque Access Token	api	f8f326f4f511ad4e8b7e1b71e01b19241fff8e2ea7acdd3381e2960b3d13e0ae	2021-09-18 18:33:50.74+07	2021-09-11 18:33:50.741+07
15	7	Opaque Access Token	api	0730a561fa7c616e845f0ea7301271d130d2883e22300534aaeb81d3e3b725a9	2021-09-18 18:45:42.719+07	2021-09-11 18:45:42.72+07
16	8	Verify Email Token	email_token	7c25c26a3f4b54538aede95bd3511211950c984ab831990ef226c6e59ff3e18a	2021-09-11 20:06:23.488+07	2021-09-11 19:06:23.495+07
17	8	Opaque Access Token	api	42c22006ceaa9c38cb0c6f0de69ed8b4a2583069800d412c5a3ef1939cd0b8f3	2021-09-18 19:06:23.607+07	2021-09-11 19:06:23.608+07
18	9	Verify Email Token	email_token	9b034a80ce264fa2a5da699a6af3f6bca25f09937223b675033ce2eda61d54fa	2021-09-11 20:07:42.04+07	2021-09-11 19:07:42.048+07
19	9	Opaque Access Token	api	e3c4844f3be7b25794c278b036c48f3bb50b7ed23b93d630d55bc0449f26ced7	2021-09-18 19:07:42.154+07	2021-09-11 19:07:42.155+07
20	1	Opaque Access Token	api	f32820c0be57113484a9543057ebd56c37d3fbe7103c2b098b7766615cb24692	2021-09-18 19:37:12.054+07	2021-09-11 19:37:12.055+07
21	1	Opaque Access Token	api	82c76ee7bee774db3f8cc0b7db2d81f35ecb19ea30a49cb8e771d2429a202d7a	2021-09-20 11:18:08.666+07	2021-09-13 11:18:08.673+07
22	1	Opaque Access Token	api	7103cb449ccb5040c2b56375a2a849d9fd3a9d07faab8d5b80aa4f3dd61cf0dd	2021-09-27 15:15:41.379+07	2021-09-20 15:15:41.385+07
23	1	Opaque Access Token	api	553e2bf34614c3529c051f53260f701dc27eca3eb07c534e1fba72abd10b3285	2021-10-04 12:09:30.73+07	2021-09-27 12:09:30.736+07
24	1	Opaque Access Token	api	3ac44c17144fa8f083f6a0557d96c9b2681af1f6e6d9462d3dc429709f0c57dc	2021-10-10 19:09:20.776+07	2021-10-03 19:09:20.778+07
25	1	Opaque Access Token	api	77503146538d351cff5997ce89fcab78da33aa59358f38f3c43d229aa604c9da	2021-10-18 23:03:06.474+07	2021-10-11 23:03:06.48+07
26	1	Opaque Access Token	api	3455b07877a91bf51851d3d2f10a56923e8575e5cb63c3815cb83876c493a999	2021-11-02 08:10:17.259+07	2021-10-26 08:10:17.265+07
\.


--
-- Data for Name: components; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.components (id, name, label, created_at, updated_at) FROM stdin;
2	Audio Konseling	Audio Konseling	2021-10-04 14:50:49.042+07	2021-10-04 14:50:49.042+07
3	PreTest	PreTest	2021-10-04 14:50:54.36+07	2021-10-04 14:50:54.36+07
4	Modul	Modul	2021-10-04 14:51:00.399+07	2021-10-04 14:51:00.399+07
5	Latihan Mandiri	Latihan Mandiri	2021-10-04 14:51:18.276+07	2021-10-04 14:51:18.276+07
1	UploadAudio	Upload Audio Konseling	2021-10-04 14:50:21.231+07	2021-10-04 14:50:21.231+07
\.


--
-- Data for Name: counselors; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.counselors (id, file_id, name, description, created_at, updated_at) FROM stdin;
1	2	Khairunnisa Mubarokah, SK	ini adalah pembimbing konselor	2021-10-04 14:02:15.221+07	2021-10-04 14:02:15.222+07
2	2	dr. Fransisca Handy. SpA	ini adalah pembimbing konselor	2021-10-04 14:02:41.333+07	2021-10-04 14:02:41.333+07
3	2	Fajar Tri Waluyanti, Ns.,Sp.Kep.An.,IBCLC	ini adalah pembimbing konselor	2021-10-04 14:02:54.397+07	2021-10-04 14:02:54.397+07
4	2	Khairunnisa Mubarokah, SK	ini adalah pembimbing konselor	2021-10-04 14:03:02.196+07	2021-10-04 14:03:02.196+07
\.


--
-- Data for Name: evaluations; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.evaluations (id, name, description, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: files; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.files (id, parent_id, name, "unique", private, type, mime, created_at, updated_at) FROM stdin;
2	1	Screenshot from 2020-10-19 14-51-30.png	mf7JqRh4zzlwV-OK_UHn	t	MEMBER	png	2021-09-11 09:00:09.493+07	2021-09-11 09:00:09.494+07
3	6	SiswaController2.png	sCqdt6UIAoKcoi3By81x	t	MEMBER	png	2021-09-11 19:25:31.997+07	2021-09-11 19:25:31.998+07
\.


--
-- Data for Name: schedules; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.schedules (id, counselor_id, subject_id, description, start_date, end_date, created_at, updated_at) FROM stdin;
1	1	1	ini adalah jadwal pertama	2021-10-02 14:44:00.319+07	2021-10-02 14:40:00.319+07	2021-10-04 08:18:45.269+07	2021-10-04 08:18:45.269+07
2	2	1	ini adalah jadwal kedua	2021-10-02 14:44:00.319+07	2021-10-02 14:40:00.319+07	2021-10-04 08:18:51.687+07	2021-10-04 08:18:51.687+07
3	3	1	ini adalah jadwal ketiga	2021-10-02 14:44:00.319+07	2021-10-02 14:40:00.319+07	2021-10-04 08:18:55.126+07	2021-10-04 08:18:55.126+07
4	3	1	ini adalah jadwal keempat	2021-10-02 14:44:00.319+07	2021-10-02 14:40:00.319+07	2021-10-04 08:19:07.965+07	2021-10-04 08:19:07.965+07
5	2	1	ini adalah jadwal kelima	2021-10-02 14:44:00.319+07	2021-10-02 14:40:00.319+07	2021-10-04 08:19:10.959+07	2021-10-04 08:19:10.959+07
6	\N	1	Melakukan 2 refleksi proses konseling yang selama ini dikerjakan bersama remaja dan orangtua. Berdasar formulir yang telah disediakan dalam aplikasi ( 1 proses refleksi tentang remaja dan 1 proses refleksi tentang orangtua remaja ) untuk melihat karakteristik masing-masing dan kekuatan – kekuatan yang kita miliki untuk dapat membawakan sesi konseling yang kolaboratif. Peserta dapat mengikuti pertemuan daring kedua, setelah melakukan seluruh proses refleksi. Masing – masing proses refleksi membutuhkan sekitar 30 – 45 menit; sehingga total pengerjaan sekitar 60 – 90 menit.	2021-10-02 14:44:00.319+07	2021-10-10 14:40:00.319+07	2021-10-04 08:19:26.472+07	2021-10-04 08:19:26.472+07
7	\N	6	asdf asdfa sdfasdfasd fasdf	2021-10-10 14:40:00.319+07	2021-11-10 14:40:00.319+07	\N	\N
\.


--
-- Data for Name: subject_components; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.subject_components (id, subject_id, component_id, label, description, created_at, updated_at) FROM stdin;
10	1	1	Upload Audio Konseling 1	Ini Berguna unutk penilaian	\N	\N
11	1	1	Upload Audio Konseling 2	Ini Berguna unutk penilaian	\N	\N
12	1	3	PreTest	Ini Berguna unutk penilaian	\N	\N
\.


--
-- Data for Name: subjects; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.subjects (id, training_id, name, description, created_at, updated_at) FROM stdin;
1	1	MInggu 1	ini adalah pelatihan pertama minggu 1	2021-10-04 08:12:46.018+07	2021-10-04 08:12:46.018+07
2	1	MInggu 2	ini adalah pelatihan pertama minggu 2	2021-10-04 08:12:54.596+07	2021-10-04 08:12:54.596+07
3	1	MInggu 3	ini adalah pelatihan pertama minggu 3	2021-10-04 08:13:00.622+07	2021-10-04 08:13:00.622+07
4	1	MInggu 4	ini adalah pelatihan pertama minggu 4	2021-10-04 08:13:07.66+07	2021-10-04 08:13:07.66+07
5	1	pra pelatihan	ini adalah pembimbing konselor	2021-10-12 08:23:16.667+07	2021-10-12 08:23:16.667+07
6	3	minggu 1	asdfasd fasdfsdfasdf	\N	\N
\.


--
-- Data for Name: trainings; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.trainings (id, name, description, capacity, status, created_at, updated_at) FROM stdin;
1	pelatihan pertama	ini adalah pelatihan pertama	10	draft	2021-10-04 08:11:05.29+07	2021-10-04 08:14:28.817+07
3	pra pelatihan	ini adalah pembimbing konselor	10	draft	2021-10-12 08:23:01.963+07	2021-10-12 08:23:01.963+07
4	ini test	asdfas fasd fasdf asdfasdf	100	draft	\N	\N
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.users (id, name, email, password, remember_me_token, email_verified_at, phone, status, birthday, gender, jobs, job_duration, home_town, str_number, created_at, updated_at, deleted_at) FROM stdin;
1	test user	root@ass.com	$argon2id$v=19$t=3,m=4096,p=1$7YCn7veC0rtaDfq6HeO3nw$Bil4STME47DLJpZBRcY9mTI6N7/gtavYAAmGhdFlDdg	\N	"2021-09-11T07:29:23.287+07:00"	08578857770	PENDING	2002-06-21	LAKI-LAKI	Doker	Kurang dari 6 Bulan	KAB. SEMARANG, JAWA TENGAH	010405000	2021-09-11 07:29:16.238+07	2021-09-11 09:00:09.555+07	\N
2	test	test@ld.com	$argon2id$v=19$t=3,m=4096,p=1$FpMQEIPayea/cuQVhRBenw$SukjynKoT54JtKdwqrTFspXzKT4SzqbC3+Puay/BB6I	\N	"2021-09-11T09:48:41.016+07:00"	\N	NEW	\N	\N	\N	\N	\N	\N	2021-09-11 09:48:26.905+07	2021-09-11 09:48:44.901+07	\N
3	test	test@mailer.com	$argon2id$v=19$t=3,m=4096,p=1$tVB9V0WCAu+X+jaJtC6qWQ$85qIC44/yOxhzqQhBAL15iNJl5ZzULi77ddSFcJiv1k	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2021-09-11 18:28:21.962+07	2021-09-11 18:28:21.963+07	\N
4	test	test@smailer.com	$argon2id$v=19$t=3,m=4096,p=1$PnxfLLLWs41eSfXbd9x5oQ$rSV7yPRTdVCdk/xd0qdP6ZHM30zyXEbrAs6oJlTg5DY	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2021-09-11 18:29:00.007+07	2021-09-11 18:29:00.009+07	\N
5	asdfa	root@ss.com	$argon2id$v=19$t=3,m=4096,p=1$guwNXgSZ9XLYRDw1rKEcdQ$hmgRzGx8O0NA871hwEa+w4+8BGxcOWWCaKjsJ9LoyZQ	\N	"2021-09-11T18:36:56.842+07:00"	\N	NEW	\N	\N	\N	\N	\N	\N	2021-09-11 18:33:50.718+07	2021-09-11 18:38:41.591+07	\N
7	test	tesst@smailer.com	$argon2id$v=19$t=3,m=4096,p=1$RVv/VK1H2WqRqt5w/t+YAQ$gtK+bwMoJ1BRR9OSP+5VaoacnUuzN0JhgIQ3Ce1v6EU	\N	"2021-09-11T18:45:57.283+07:00"	\N	\N	\N	\N	\N	\N	\N	\N	2021-09-11 18:45:42.285+07	2021-09-11 18:45:57.284+07	\N
8	test	tessst@smailer.com	$argon2id$v=19$t=3,m=4096,p=1$nl7UXdrfmnP0ZCdiswaNQA$E02yK+dGy1XvXdWN7vpOTQSJO/MWcNcdUmV1eS+TpSA	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2021-09-11 19:06:23.455+07	2021-09-11 19:06:23.456+07	\N
9	test	tesssts@smailer.com	$argon2id$v=19$t=3,m=4096,p=1$rJGOlgWue1WxqQoDYD22Hg$VlGkSFDad9R6Zpiyaxz21EVmkYjeTw8uTTV+TNMQjXc	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2021-09-11 19:07:42.008+07	2021-09-11 19:07:42.009+07	\N
6	asdf	root@asss.com	$argon2id$v=19$t=3,m=4096,p=1$swN91uXNmNFS9rWgiOZ9FQ$gGLO3MQ/X30xbL2O0gyc52yWV3u5hKhKkAujnOrtwss	\N	"2021-09-11T18:39:21.859+07:00"	085454545	PENDING	2021-09-30	LAKI-LAKI	ASdfasdf	Kurang dari 6 Bulan	KAB TIMOR TENGAH SELATAN, NUSA TENGGARA TIMUR	044545454	2021-09-11 18:39:14.177+07	2021-09-11 19:25:32.103+07	\N
\.


--
-- Name: adonis_schema_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.adonis_schema_id_seq', 30, true);


--
-- Name: answers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.answers_id_seq', 1, false);


--
-- Name: api_tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.api_tokens_id_seq', 26, true);


--
-- Name: components_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.components_id_seq', 5, true);


--
-- Name: counselors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.counselors_id_seq', 4, true);


--
-- Name: evaluations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.evaluations_id_seq', 1, false);


--
-- Name: files_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.files_id_seq', 3, true);


--
-- Name: schedules_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.schedules_id_seq', 7, true);


--
-- Name: subject_components_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.subject_components_id_seq', 12, true);


--
-- Name: subjects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.subjects_id_seq', 6, true);


--
-- Name: trainings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.trainings_id_seq', 4, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.users_id_seq', 9, true);


--
-- Name: adonis_schema adonis_schema_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.adonis_schema
    ADD CONSTRAINT adonis_schema_pkey PRIMARY KEY (id);


--
-- Name: answers answers_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT answers_pkey PRIMARY KEY (id);


--
-- Name: api_tokens api_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.api_tokens
    ADD CONSTRAINT api_tokens_pkey PRIMARY KEY (id);


--
-- Name: api_tokens api_tokens_token_unique; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.api_tokens
    ADD CONSTRAINT api_tokens_token_unique UNIQUE (token);


--
-- Name: components components_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.components
    ADD CONSTRAINT components_pkey PRIMARY KEY (id);


--
-- Name: counselors counselors_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.counselors
    ADD CONSTRAINT counselors_pkey PRIMARY KEY (id);


--
-- Name: evaluations evaluations_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.evaluations
    ADD CONSTRAINT evaluations_pkey PRIMARY KEY (id);


--
-- Name: files files_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.files
    ADD CONSTRAINT files_pkey PRIMARY KEY (id);


--
-- Name: files files_unique_unique; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.files
    ADD CONSTRAINT files_unique_unique UNIQUE ("unique");


--
-- Name: schedules schedules_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.schedules
    ADD CONSTRAINT schedules_pkey PRIMARY KEY (id);


--
-- Name: subject_components subject_components_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.subject_components
    ADD CONSTRAINT subject_components_pkey PRIMARY KEY (id);


--
-- Name: subjects subjects_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.subjects
    ADD CONSTRAINT subjects_pkey PRIMARY KEY (id);


--
-- Name: trainings trainings_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.trainings
    ADD CONSTRAINT trainings_pkey PRIMARY KEY (id);


--
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: answers_question_id_index; Type: INDEX; Schema: public; Owner: root
--

CREATE INDEX answers_question_id_index ON public.answers USING btree (question_id);


--
-- Name: api_tokens_user_id_index; Type: INDEX; Schema: public; Owner: root
--

CREATE INDEX api_tokens_user_id_index ON public.api_tokens USING btree (user_id);


--
-- Name: counselors_file_id_index; Type: INDEX; Schema: public; Owner: root
--

CREATE INDEX counselors_file_id_index ON public.counselors USING btree (file_id);


--
-- Name: files_parent_id_index; Type: INDEX; Schema: public; Owner: root
--

CREATE INDEX files_parent_id_index ON public.files USING btree (parent_id);


--
-- Name: files_type_index; Type: INDEX; Schema: public; Owner: root
--

CREATE INDEX files_type_index ON public.files USING btree (type);


--
-- Name: files_unique_index; Type: INDEX; Schema: public; Owner: root
--

CREATE INDEX files_unique_index ON public.files USING btree ("unique");


--
-- Name: schedules_counselor_id_index; Type: INDEX; Schema: public; Owner: root
--

CREATE INDEX schedules_counselor_id_index ON public.schedules USING btree (counselor_id);


--
-- Name: schedules_subject_id_index; Type: INDEX; Schema: public; Owner: root
--

CREATE INDEX schedules_subject_id_index ON public.schedules USING btree (subject_id);


--
-- Name: subject_components_component_id_index; Type: INDEX; Schema: public; Owner: root
--

CREATE INDEX subject_components_component_id_index ON public.subject_components USING btree (component_id);


--
-- Name: subject_components_subject_id_index; Type: INDEX; Schema: public; Owner: root
--

CREATE INDEX subject_components_subject_id_index ON public.subject_components USING btree (subject_id);


--
-- Name: subjects_training_id_index; Type: INDEX; Schema: public; Owner: root
--

CREATE INDEX subjects_training_id_index ON public.subjects USING btree (training_id);


--
-- Name: users_email_index; Type: INDEX; Schema: public; Owner: root
--

CREATE INDEX users_email_index ON public.users USING btree (email);


--
-- Name: counselors counselors_file_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.counselors
    ADD CONSTRAINT counselors_file_id_foreign FOREIGN KEY (file_id) REFERENCES public.files(id);


--
-- Name: schedules schedules_subject_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.schedules
    ADD CONSTRAINT schedules_subject_id_foreign FOREIGN KEY (subject_id) REFERENCES public.subjects(id);


--
-- Name: subject_components subject_components_component_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.subject_components
    ADD CONSTRAINT subject_components_component_id_foreign FOREIGN KEY (component_id) REFERENCES public.components(id);


--
-- Name: subject_components subject_components_subject_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.subject_components
    ADD CONSTRAINT subject_components_subject_id_foreign FOREIGN KEY (subject_id) REFERENCES public.subjects(id);


--
-- Name: subjects subjects_training_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.subjects
    ADD CONSTRAINT subjects_training_id_foreign FOREIGN KEY (training_id) REFERENCES public.trainings(id);


--
-- PostgreSQL database dump complete
--

