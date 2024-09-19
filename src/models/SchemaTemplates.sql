/*
  
Project Schema Definitions
--------------------------
This SQL file contains the schema definitions for all the tables used in the project.
Each schema is designed to efficiently store and manage the relevant data for the application,
with proper relationships, data types, and constraints in place.
  
The file is structured as follows:

- User Schemas (Line 24)
    - user
    - user_roles
    - user_body_info
    - user_favourite_exercise

- Exercise Schemas (Line 100)
    - exercise
    - exercise_muscle_group

- Set Schemas (Line )
    - set

- Workout Schemas (Line )
    - workout
    - workout_group

- User Max Schemas (Line )
    - max_record
  
This file is intended for use in initializing or updating the project's database.
Please ensure to review and update the schema as the project evolves.

*/

-- ================= USER SCHEMAS =================

-- USER
CREATE TABLE `user` (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    phoneNumber VARCHAR(15) UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    passwordHash VARCHAR(255) NOT NULL,
    role_id INT DEFAULT 2,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (role_id) REFERENCES `user_roles` (role_id) ON DELETE SET NULL
);

INSERT INTO `user` (username, phoneNumber, role_id)
VALUES ('Bailey', '0432521178', 1);

-- USER_ROLES
CREATE TABLE `user_roles` (
    role_id INT AUTO_INCREMENT PRIMARY KEY, 
    roleName VARCHAR(255) NOT NULL UNIQUE
);

INSERT INTO `user_roles` (roleName)
VALUES ('Admin'), ('User'), ('Moderator');


-- USER_BODY_INFO
CREATE TABLE `user_body_info` (
    userID INT NOT NULL,
    recordID INT NOT NULL,
    gender VARCHAR(10),
    height DECIMAL(5, 2),
    weight DECIMAL(5, 2),
    age INT,
    thigh DECIMAL(5, 2),
    calf DECIMAL(5, 2),
    glute DECIMAL(5, 2),
    upperarm DECIMAL(5, 2),
    forearm DECIMAL(5, 2),
    chest DECIMAL(5, 2),
    shoulders DECIMAL(5, 2),
    waist DECIMAL(5, 2),
    neck DECIMAL(5, 2),
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (userID, recordID),
    FOREIGN KEY (userID) REFERENCES `user`(userId) ON DELETE CASCADE
);

INSERT INTO `user_body_info` (userID, recordID, gender, height, weight, age, thigh, calf, glute, upperarm, forearm, chest, shoulders, waist, neck)
VALUES (1, 1, 'Male', 180.5, 75.0, 25, 60.0, 40.0, 50.0, 35.0, 30.0, 100.0, 45.0, 80.0, 40.0);


-- USER_FAVOURITE_EXERCISE
CREATE TABLE `user_favourite_exercise` (
    userId INT NOT NULL,
    exerciseID INT NOT NULL,
    favourite BOOLEAN NOT NULL,
    PRIMARY KEY (userId, exerciseID),
    FOREIGN KEY (userId) REFERENCES `user`(userId) ON DELETE CASCADE
);

INSERT INTO `user_favourite_exercise` (userId, exerciseID, favourite)
VALUES (1, 1, TRUE);


-- ================= EXERCISE SCHEMAS =================

-- EXRECISES