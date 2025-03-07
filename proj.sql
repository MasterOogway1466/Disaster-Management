CREATE DATABASE IF NOT EXISTS Disaster_Management;
Use Disaster_Management;

-- Admin Table
CREATE TABLE Admin (
    Admin_ID INT PRIMARY KEY AUTO_INCREMENT,
    First_name VARCHAR(50),
    Last_name VARCHAR(50),
    email VARCHAR(100) UNIQUE NOT NULL,
    phone_number VARCHAR(15),
    password VARCHAR(255) NOT NULL,
);

-- User Table
CREATE TABLE User (
    User_ID INT PRIMARY KEY AUTO_INCREMENT,
    First_name VARCHAR(50),
    Last_name VARCHAR(50),
    Username VARCHAR(50) UNIQUE NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Phone_number VARCHAR(15),
    password VARCHAR(255) NOT NULL,
    DOB DATE
);


-- Volunteer Table
CREATE TABLE Volunteer (
    Volunteer_ID INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    phone_number VARCHAR(15),
    DOB DATE,
    U_ID INT,
    Disaster_ID INT,
    History_ID INT,
);

-- Disaster Table
CREATE TABLE Disaster (
    Disaster_ID INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    disasterType VARCHAR(50),
    location VARCHAR(100),
    severity ENUM('low', 'medium', 'high', 'critical'),
    startDate DATE,
    endDate DATE,
    Request_ID INT,
    History_ID INT
);

-- Training Session Table
CREATE TABLE Training_Session (
    session_ID INT PRIMARY KEY AUTO_INCREMENT,
    name TEXT
    Date DATE,
    Validity INT,
    Conducted_by INT
);

-- Session Registrations Table
CREATE TABLE Session_registrations (
    Session_ID INT,
    Volunteer_ID INT,
    Status ENUM('registered', 'completed', 'failed'),
    Final_registration_date DATE,
    Successful_Completion BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (Session_ID, Volunteer_ID)
);

-- History Table
CREATE TABLE History (
    History_ID INT PRIMARY KEY AUTO_INCREMENT,
    Feedback TEXT,
    Volunteer_ID INT,
    Disaster_ID INT
);



-- Volunteer Table Foreign Keys
ALTER TABLE Volunteer
    ADD CONSTRAINT fk_volunteer_user FOREIGN KEY (U_ID) REFERENCES User(User_ID),
    ADD CONSTRAINT fk_volunteer_disaster FOREIGN KEY (Disaster_ID) REFERENCES Disaster(Disaster_ID),
    ADD CONSTRAINT fk_volunteer_history FOREIGN KEY (History_ID) REFERENCES History(History_ID),
    ADD CONSTRAINT fk_volunteer_admin FOREIGN KEY (Approved_by) REFERENCES Admin(Admin_ID);

-- Disaster Table Foreign Keys
ALTER TABLE Disaster
    ADD CONSTRAINT fk_disaster_history FOREIGN KEY (History_ID) REFERENCES History(History_ID);



-- Training_Session Table Foreign Key
ALTER TABLE Training_Session
    ADD CONSTRAINT fk_training_conducted_by FOREIGN KEY (Conducted_by) REFERENCES Volunteer(Volunteer_ID);

-- Session_registrations Table Foreign Keys
ALTER TABLE Session_registrations
    ADD CONSTRAINT fk_session_registrations_session FOREIGN KEY (Session_ID) REFERENCES Training_Session(session_ID),
    ADD CONSTRAINT fk_session_registrations_volunteer FOREIGN KEY (Volunteer_ID) REFERENCES Volunteer(Volunteer_ID);

-- History Table Foreign Keys
ALTER TABLE History
    ADD CONSTRAINT fk_history_volunteer FOREIGN KEY (Volunteer_ID) REFERENCES Volunteer(Volunteer_ID),
    ADD CONSTRAINT fk_history_disaster FOREIGN KEY (Disaster_ID) REFERENCES Disaster(Disaster_ID);
