INSERT INTO APPLICANT (ID,COUNTRY,HOUSE_NUMBER,STREET,ZIP_CODE,EU_STUDENT,GENDER,PHONE_NUMBER,WAITING_TERMS) VALUES ('2d13bbd4-6c33-4e44-9bc5-58851c2e228a','Deutschland','1','Universitätsstraße','50937',true,0,'004917312345',1);

INSERT INTO STUDY_PROGRAM (ID,COMMON_INFO_LINK,CREDITS,DEADLINE,"DEGREE","LANGUAGE",NAME,NUMERUS_CLAUSUS,REGULAR_STUDY_TIME,START_DATE,STUDY_MANUAL_LINK,STUDY_PLACES) VALUES ('1','https://wiso.uni-koeln.de/de/studium/bachelor/bachelor-wirtschaftsinformatik',180,'2021-06-23 23:59:59','BSc ','Deutsch','BSc Informatik',0.0,6,'2021-10-01 00:00:00','https://wiso.uni-koeln.de/sites/fakultaet/dokumente/downloads/bachelor/b_mhb_po15_winfo.pdf',200);
INSERT INTO STUDY_PROGRAM (ID,COMMON_INFO_LINK,CREDITS,DEADLINE,"DEGREE","LANGUAGE",NAME,NUMERUS_CLAUSUS,REGULAR_STUDY_TIME,START_DATE,STUDY_MANUAL_LINK,STUDY_PLACES) VALUES ('2','https://wiso.uni-koeln.de/de/studium/bachelor/bachelor-wirtschaftsinformatik',180,'2021-06-23 23:59:59','MSc','Deutsch','MSc Informatik',0.0,6,'2021-10-01 00:00:00','https://wiso.uni-koeln.de/sites/fakultaet/dokumente/downloads/bachelor/b_mhb_po15_winfo.pdf',200);

--- workaround for h2 not to be able to read from classpath resource files
INSERT INTO DOCUMENT (ID,DESCRIPTION,DOCUMENT_FILE,DOCUMENT_NAME,"TYPE",APPLICANT_ID) VALUES ('1','Abi Zeugnis',FILE_READ('/tmp/example.pdf'),'Abi Zeugnis',0,'2d13bbd4-6c33-4e44-9bc5-58851c2e228a');
INSERT INTO DOCUMENT (ID,DESCRIPTION,DOCUMENT_FILE,DOCUMENT_NAME,"TYPE",APPLICANT_ID) VALUES ('2','Praktikum bei Apple Inc.',FILE_READ('/tmp/example2.pdf'),'Praktikumsbericht',1,'2d13bbd4-6c33-4e44-9bc5-58851c2e228a');

INSERT INTO DEGREE_DOCUMENT (DEGREE_TYPE,GRADE_AVERAGE,NAME_OF_INSTITUTE,ID,APPLICANT_ID) VALUES (0,1.5,'Schule in Köln','1','2d13bbd4-6c33-4e44-9bc5-58851c2e228a');
