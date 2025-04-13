--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: Factory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."factories" (id, name) FROM stdin;
1	Alpha Textiles
2	Beta Garments
3	Testing one
4	Test two
\.


--
-- Data for Name: Inspection; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."inspections" (id, "factoryId", "inspectedAt", "barcodeNumber", "respectivePerson", "styleNumber", "selectedQuantity", "failQuantity") FROM stdin;
1	1	2025-04-10 10:00:00	ALP123	John Doe	STY-A1	100	5
2	1	2025-04-11 11:30:00	ALP124	Jane Smith	STY-A2	120	6
3	2	2025-04-12 09:00:00	BET321	Alice Green	STY-B1	80	2
4	2	2025-04-13 14:45:00	BET322	Tom White	STY-B2	150	10
5	1	2025-04-18 15:36:00	111	Kalaa	001	15	5
6	1	2025-04-12 15:43:00	111	Kalaa	111	100	20
7	3	2025-04-12 16:19:00	1234	Sumanaweera	002	150	8
8	3	2025-04-12 16:39:00	0012	Testing	003	150	28
9	1	2025-04-12 18:01:00	00	okok	12356	150	18
\.


--
-- Data for Name: InspectionType; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."inspection_types" (id, name) FROM stdin;
1	Visual Inspection
2	Measurement Check
\.


--
-- Data for Name: InspectionFinding; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."inspection_findings" (id, "inspectionId", "inspectionTypeId", rating) FROM stdin;
1	1	1	4
2	1	2	3
3	2	1	5
4	3	2	4
5	3	1	4
6	4	1	3
7	5	1	2
8	5	2	1
9	6	1	2
10	6	2	1
11	7	1	1
12	7	2	1
13	8	1	1
14	8	2	2
15	9	1	2
16	9	2	2
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
bcaeaeb4-381c-49e6-80ca-c3fe5f626b40	3903ea120c3ee2d05db59a2f15aea983bb6bc5d5200b1d5339a0e839adcbbd44	2025-04-11 20:48:05.14281+05:30	20250411151805_init	\N	\N	2025-04-11 20:48:05.103797+05:30	1
\.


--
-- Name: Factory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Factory_id_seq"', 4, true);


--
-- Name: InspectionFinding_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."InspectionFinding_id_seq"', 16, true);


--
-- Name: InspectionType_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."InspectionType_id_seq"', 2, true);


--
-- Name: Inspection_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Inspection_id_seq"', 9, true);


--
-- PostgreSQL database dump complete
--

