CREATE DATABASE db_wasa;
USE db_wasa;

#wasa----CREACION DE TABLAS-----
CREATE TABLE tb_contacts(
 cont_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
 cont_phone INT NOT NULL,
 cont_displayName VARCHAR(100));

CREATE TABLE tb_users(
	user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	user_name VARCHAR(100) NOT NULL,
	user_lastname VARCHAR(100) NOT NULL,
	user_username VARCHAR(100) NOT NULL,
	user_email VARCHAR(100) NOT NULL,
	user_urlPhoto VARCHAR(100) NOT NULL,
	user_state VARCHAR(200) NOT NULL,
	user_phone VARCHAR(20),
	user_lastConnection VARCHAR(100) NOT NULL);
	
	CREATE TABLE tb_contacts_list(
		coli_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
		coli_cont_id INT NOT NULL,
		coli_user_id INT NOT NULL,
		FOREIGN KEY (coli_cont_id) REFERENCES tb_contacts(cont_id),
		FOREIGN KEY (coli_user_id) REFERENCES tb_users(user_id));
	
	CREATE TABLE tb_settings(
		sett_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
		sett_user_id INT NOT NULL,
		sett_darktheme BOOLEAN NOT NULL,
		FOREIGN KEY (sett_user_id) REFERENCES tb_users(user_id));
		
	CREATE TABLE tb_chats(
		chat_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
		chat_user_id INT NOT NULL,
		chat_cont_id INT NOT NULL,
		chat_message VARCHAR(500),
		chat_viewed BOOLEAN NOT NULL DEFAULT FALSE,
		chat_hourSend VARCHAR(100) NOT NULL,
		chat_hourViewed VARCHAR(100) NOT NULL,
		chat_isMedia BOOLEAN NOT NULL,
		chat_urlMedia VARCHAR(100),
		FOREIGN KEY (chat_user_id) REFERENCES tb_users(user_id),
		FOREIGN KEY (chat_cont_id) REFERENCES tb_contacts(cont_id));
		
	CREATE TABLE tb_stories(
		stor_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
		stor_user_id INT NOT NULL,
		stor_datepublish VARCHAR(100) NOT NULL,
		stor_urlMedia VARCHAR(100) NOT NULL,
		FOREIGN KEY (stor_user_id) REFERENCES tb_users(user_id));
	
	CREATE TABLE tb_stories_viewers(
		stvi_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
		stvi_stor_id INT NOT NULL,
		stvi_cont_id INT NOT NULL,
		stvi_viewHour VARCHAR(100) NOT NULL,
		stvi_duration INT NOT NULL,
		FOREIGN KEY (stvi_stor_id) REFERENCES tb_stories(stor_id),
		FOREIGN KEY (stvi_cont_id) REFERENCES tb_contacts(cont_id)
	);
		
	CREATE TABLE tb_api_key(
		apke_type VARCHAR(10) NOT NULL,
		apke_token VARCHAR(200) NOT NULL
	);