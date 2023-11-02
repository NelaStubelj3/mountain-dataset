--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4
-- Dumped by pg_dump version 15.4

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
-- Name: combined_data; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.combined_data (
    mountain_id integer,
    mountain_name character varying(255),
    mountain_country character varying(255),
    mountain_height numeric(7,2),
    mountain_description text,
    mountain_highest_peak character varying,
    trail_id integer,
    trail_name character varying(255),
    trail_description text,
    trail_difficulty character varying(50),
    trail_length numeric(5,1),
    trail_elevation_gain numeric(5,1)
);


ALTER TABLE public.combined_data OWNER TO postgres;

--
-- Name: hut_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.hut_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.hut_id_seq OWNER TO postgres;

--
-- Name: mountains; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mountains (
    mountain_id integer NOT NULL,
    mountain_name character varying(255) NOT NULL,
    country character varying(255),
    height numeric(7,2),
    mountain_description text,
    highest_peak character varying
);


ALTER TABLE public.mountains OWNER TO postgres;

--
-- Name: mountains_mountainid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.mountains_mountainid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.mountains_mountainid_seq OWNER TO postgres;

--
-- Name: mountains_mountainid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.mountains_mountainid_seq OWNED BY public.mountains.mountain_id;


--
-- Name: track_id_se; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.track_id_se
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.track_id_se OWNER TO postgres;

--
-- Name: track_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.track_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.track_id_seq OWNER TO postgres;

--
-- Name: trails; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.trails (
    trail_id integer DEFAULT nextval('public.track_id_se'::regclass) NOT NULL,
    trail_name character varying(255) NOT NULL,
    trail_description text,
    difficulty character varying(50),
    length numeric(5,1),
    elevation_gain numeric(5,1),
    mountain_id integer
);


ALTER TABLE public.trails OWNER TO postgres;

--
-- Name: trails_trailid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.trails_trailid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.trails_trailid_seq OWNER TO postgres;

--
-- Name: trails_trailid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.trails_trailid_seq OWNED BY public.trails.trail_id;


--
-- Name: mountains mountain_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mountains ALTER COLUMN mountain_id SET DEFAULT nextval('public.mountains_mountainid_seq'::regclass);


--
-- Data for Name: combined_data; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.combined_data (mountain_id, mountain_name, mountain_country, mountain_height, mountain_description, mountain_highest_peak, trail_id, trail_name, trail_description, trail_difficulty, trail_length, trail_elevation_gain) FROM stdin;
1	Mont Blanc	France	4810.45	The highest mountain in the Alps	Mont Blanc de Courmayeur	1	La Visaille - Peuterey	A pleasant excursion in the mountains of Courmayeur, which starts from La Visaille and proceeds along the Zerotta road. The route reaches the locality of Peuterey passing through the Mont Blanc Refuge (1680m), Peindeint, Lassy Damon, Lassy Desot and Perthud.	Easy	6.0	153.0
2	Matterhorn	Switzerland	4478.45	Famous pyramid-shaped mountain	Dufourspitze	3	Matterhorn Glacier Trail: Schwarzsee - Matterhorngletscher - Trockener Steg	This trail is a high-altitude route through the Alpine peaks, leading from Schwarzsee to Trockener Steg and offering fantastic views of the Matterhorn Glacier. The starting point can be reached with the Matterhorn Express cable car. It's quite a popular trail with amazing terrain. Very rocky in some places, so good footwear is recommended. Please be aware that the trail can be completely covered in snow starting from October.	Hard	6.3	498.0
3	Kilimanjaro	Tanzania	5895.16	Tallest freestanding mountain in the world	Uhuru Peak	4	Mount Kilimanjaro: Machame Route	This is the route to climb Kilimanjaro via Machame route. Seven day trip, camping on the mountain six nights. 	Hard	57.0	5185.0
4	Ben Nevis	United Kingdom	1344.53	Highest peak in the UK	Ben Nevis	5	Ben Nevis Mountain Track	The UK's highest mountain, "The Ben" or Ben Nevis, is one of the most popular spots in Scotland. A challenging and sustained climb, this route will test your endurance as you wind your way up the rocky and steep track to the summit. This big climb must not be underestimated and the correct preparation is required for a safe day out.Please note, due to the high elevation gain, the summit is frequently very cold, windy, and wet and you will always need to be prepared for changeable weather and freezing conditions, even in summer. This includes snow and ice that can often remain on this route beyond winter. It is therefore necessary to check weather and summit conditions before heading out as the temperate difference between the trailhead and the top drops significantly. Warm and waterproof layers, plenty of food and water, sun protection, and sturdy footwear are all essential for this trail. 	Hard	15.9	1342.0
5	Etna	Italy	3330.99	Europe's most active volcano	Punta La Montagnola	6	Pian del Lago Crater	SAFETY NOTICE: The Etna Volcano is active and constantly erupting. It is therefore advisable to check the weather and geological forecasts and the state of the trails before walking in this area. For more information: https://www.ct.ingv.it/ https://parcoetna.it/. A pleasant excursion to one of the craters of Etna, starting from the Montagnola, reachable by cable car from the Sapienza Refuge. The route takes place in a loop and reaches the Pian del Lago Crater which was formed during the eruption of 2001. From the top of the crater it is possible to see the Barbagallo Crater and the Summit Craters.	Moderate	2.1	158.0
7	Dinara	Croatia	1831.97	Prominent mountain on the border with Bosnia and Herzegovina	Troglav	8	Sveti Jakov - Troglav - Velika Duvjakusa	This demanding trail starts from the Sveti Jakov mountain house (1001 m), which is located on the edge of Ravni Vrdov. The trail leads to the peak of Troglav (1913 m), which is located in the territory of Bosnia and Herzegovina and is the highest peak of the Dinara mountain range in the Dinaric Mountains. From Troglav, the trail leads to the top of Velika Duvjakusa (1708 m), the highest peak on the Croatian side. Below Velika Duvjakusa is the Puma mountain shelter.	Hard	32.5	1517.0
8	Biokovo	Croatia	1762.14	Stunning coastal mountain in southern Croatia	Sveti Jure	9	Makar - Vosac	This trail starts from the village of Makar, located right above Makarska. It is the oldest hiking trail on the southern side of Biokovo, the largest, longest, most beautiful, but also the harshest mountain in Dalmatia. The path normally leads to the peak of Sveti Jure (1594 m), the highest peak of Biokovo, and our path goes to the peak of Vosac (1422 m). At the very beginning, the trail is wide and leads along serpentines, winding continuously. The higher the trail climbs, the narrower it gets. On the top of Vosac is the Toni Roso Mountain Hut, from where you can enjoy a wonderful view in all directions.	Hard	10.6	1191.0
6	Vatnajokull	Iceland	2110.13	Largest ice cap in Europe	Hvannadalshnjukur	7	Svartifoss - Sjonarsker	This fantastic trail will show you several waterfalls in Skaftafell. First you go in direction of Lambhagi to reach the Svartifoss waterfall. Svartifoss is surrounded by dark lava columns which gave rise to his name. Fantastic basalt Columnar next to the waterfall. After that you will see a second waterfall called Magnusarfoss and it's the smallest of the 3 waterfalls and a last one called Hundafoss, which is the tallest. The path then goes to the Sjonarsker mountain that offers you incredible views.	Moderate	4.7	193.0
9	Ucka	Croatia	1401.63	Mountain range overlooking the Istrian Peninsula	Vojak	10	Mala Ucka - Vojak	The trail starts from the village of Mala Ucka, the highest rural settlement in Istria, located at 995 meters above sea level. The village is almost deserted. The path continues through a tall beech forest with a sharp climb to the exit to the saddle at the foot of the Vojak peak, from where there is a sharp ascent along a grassy rocky ridge all the way to the top where the old lookout tower is located, offering a beautiful view in all directions. The return goes to the saddle and the circular path back to Mala Ucka.	Moderate	6.9	429.0
1	Mont Blanc	France	4810.45	The highest mountain in the Alps	Mont Blanc de Courmayeur	2	The Mont Blanc Tour, Segment 4	The Mont Blanc Tour crosses three countries in 170 km of discovery for a total of 10 days of satisfaction. This route is a variant of Segment 4, starting from the Combal Refuge (1969m) and proceeding towards Lake Miage before returning to the trail and approaching Courmayeur. The route takes place with steep paths but beautiful views. Some sections of the trail are eroded, so caution is advised.	Moderate	13.4	560.0
\.


--
-- Data for Name: mountains; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.mountains (mountain_id, mountain_name, country, height, mountain_description, highest_peak) FROM stdin;
1	Mont Blanc	France	4810.45	The highest mountain in the Alps	Mont Blanc de Courmayeur
2	Matterhorn	Switzerland	4478.45	Famous pyramid-shaped mountain	Dufourspitze
3	Kilimanjaro	Tanzania	5895.16	Tallest freestanding mountain in the world	Uhuru Peak
4	Ben Nevis	United Kingdom	1344.53	Highest peak in the UK	Ben Nevis
5	Etna	Italy	3330.99	Europe's most active volcano	Punta La Montagnola
7	Dinara	Croatia	1831.97	Prominent mountain on the border with Bosnia and Herzegovina	Troglav
8	Biokovo	Croatia	1762.14	Stunning coastal mountain in southern Croatia	Sveti Jure
10	Velebit	Croatia	1757.73	Dinaric mountain range along the Adriatic coast	Vaganski vrh
6	Vatnajokull	Iceland	2110.13	Largest ice cap in Europe	Hvannadalshnjukur
9	Ucka	Croatia	1401.63	Mountain range overlooking the Istrian Peninsula	Vojak
\.


--
-- Data for Name: trails; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.trails (trail_id, trail_name, trail_description, difficulty, length, elevation_gain, mountain_id) FROM stdin;
1	La Visaille - Peuterey	A pleasant excursion in the mountains of Courmayeur, which starts from La Visaille and proceeds along the Zerotta road. The route reaches the locality of Peuterey passing through the Mont Blanc Refuge (1680m), Peindeint, Lassy Damon, Lassy Desot and Perthud.	Easy	6.0	153.0	1
3	Matterhorn Glacier Trail: Schwarzsee - Matterhorngletscher - Trockener Steg	This trail is a high-altitude route through the Alpine peaks, leading from Schwarzsee to Trockener Steg and offering fantastic views of the Matterhorn Glacier. The starting point can be reached with the Matterhorn Express cable car. It's quite a popular trail with amazing terrain. Very rocky in some places, so good footwear is recommended. Please be aware that the trail can be completely covered in snow starting from October.	Hard	6.3	498.0	2
4	Mount Kilimanjaro: Machame Route	This is the route to climb Kilimanjaro via Machame route. Seven day trip, camping on the mountain six nights. 	Hard	57.0	5185.0	3
6	Pian del Lago Crater	SAFETY NOTICE: The Etna Volcano is active and constantly erupting. It is therefore advisable to check the weather and geological forecasts and the state of the trails before walking in this area. For more information: https://www.ct.ingv.it/ https://parcoetna.it/. A pleasant excursion to one of the craters of Etna, starting from the Montagnola, reachable by cable car from the Sapienza Refuge. The route takes place in a loop and reaches the Pian del Lago Crater which was formed during the eruption of 2001. From the top of the crater it is possible to see the Barbagallo Crater and the Summit Craters.	Moderate	2.1	158.0	5
5	Ben Nevis Mountain Track	The UK's highest mountain, "The Ben" or Ben Nevis, is one of the most popular spots in Scotland. A challenging and sustained climb, this route will test your endurance as you wind your way up the rocky and steep track to the summit. This big climb must not be underestimated and the correct preparation is required for a safe day out.Please note, due to the high elevation gain, the summit is frequently very cold, windy, and wet and you will always need to be prepared for changeable weather and freezing conditions, even in summer. This includes snow and ice that can often remain on this route beyond winter. It is therefore necessary to check weather and summit conditions before heading out as the temperate difference between the trailhead and the top drops significantly. Warm and waterproof layers, plenty of food and water, sun protection, and sturdy footwear are all essential for this trail. 	Hard	15.9	1342.0	4
7	Svartifoss - Sjonarsker	This fantastic trail will show you several waterfalls in Skaftafell. First you go in direction of Lambhagi to reach the Svartifoss waterfall. Svartifoss is surrounded by dark lava columns which gave rise to his name. Fantastic basalt Columnar next to the waterfall. After that you will see a second waterfall called Magnusarfoss and it's the smallest of the 3 waterfalls and a last one called Hundafoss, which is the tallest. The path then goes to the Sjonarsker mountain that offers you incredible views.	Moderate	4.7	193.0	6
8	Sveti Jakov - Troglav - Velika Duvjakusa	This demanding trail starts from the Sveti Jakov mountain house (1001 m), which is located on the edge of Ravni Vrdov. The trail leads to the peak of Troglav (1913 m), which is located in the territory of Bosnia and Herzegovina and is the highest peak of the Dinara mountain range in the Dinaric Mountains. From Troglav, the trail leads to the top of Velika Duvjakusa (1708 m), the highest peak on the Croatian side. Below Velika Duvjakusa is the Puma mountain shelter.	Hard	32.5	1517.0	7
2	The Mont Blanc Tour, Segment 4	The Mont Blanc Tour crosses three countries in 170 km of discovery for a total of 10 days of satisfaction. This route is a variant of Segment 4, starting from the Combal Refuge (1969m) and proceeding towards Lake Miage before returning to the trail and approaching Courmayeur. The route takes place with steep paths but beautiful views. Some sections of the trail are eroded, so caution is advised.	Moderate	13.4	560.0	1
9	Makar - Vosac	This trail starts from the village of Makar, located right above Makarska. It is the oldest hiking trail on the southern side of Biokovo, the largest, longest, most beautiful, but also the harshest mountain in Dalmatia. The path normally leads to the peak of Sveti Jure (1594 m), the highest peak of Biokovo, and our path goes to the peak of Vosac (1422 m). At the very beginning, the trail is wide and leads along serpentines, winding continuously. The higher the trail climbs, the narrower it gets. On the top of Vosac is the Toni Roso Mountain Hut, from where you can enjoy a wonderful view in all directions.	Hard	10.6	1191.0	8
10	Mala Ucka - Vojak	The trail starts from the village of Mala Ucka, the highest rural settlement in Istria, located at 995 meters above sea level. The village is almost deserted. The path continues through a tall beech forest with a sharp climb to the exit to the saddle at the foot of the Vojak peak, from where there is a sharp ascent along a grassy rocky ridge all the way to the top where the old lookout tower is located, offering a beautiful view in all directions. The return goes to the saddle and the circular path back to Mala Ucka.	Moderate	6.9	429.0	9
\.


--
-- Name: hut_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.hut_id_seq', 10, true);


--
-- Name: mountains_mountainid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.mountains_mountainid_seq', 10, true);


--
-- Name: track_id_se; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.track_id_se', 10, true);


--
-- Name: track_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.track_id_seq', 20, true);


--
-- Name: trails_trailid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.trails_trailid_seq', 1, false);


--
-- Name: mountains mountains_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mountains
    ADD CONSTRAINT mountains_pkey PRIMARY KEY (mountain_id);


--
-- Name: trails trails_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trails
    ADD CONSTRAINT trails_pkey PRIMARY KEY (trail_id);


--
-- Name: trails trails_mountainid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trails
    ADD CONSTRAINT trails_mountainid_fkey FOREIGN KEY (mountain_id) REFERENCES public.mountains(mountain_id);


--
-- PostgreSQL database dump complete
--

