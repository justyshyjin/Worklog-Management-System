
/*creating database and tables for worklog management system*/

CREATE DATABASE IF NOT EXISTS worklog_management
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE worklog_management;

/*Users table to store user information and roles for access control*/

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,

    username VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,

    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255),

    role ENUM(
        'ADMIN',
        'MANAGER',
        'DEVELOPER',
        'TESTER'
    ) DEFAULT 'DEVELOPER',

    is_active TINYINT(1) DEFAULT 1,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

-- Table to store different platforms where tasks are performed (e.g., Web, Mobile, API)

CREATE TABLE platforms (
    id INT AUTO_INCREMENT PRIMARY KEY,

    platform_name VARCHAR(100) NOT NULL UNIQUE,

    description VARCHAR(500),

    is_active TINYINT(1) DEFAULT 1,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

-- Table to store project information, allowing tasks to be associated with specific projects. This helps in organizing worklogs by project and tracking progress effectively.

CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,

    project_name VARCHAR(255) NOT NULL UNIQUE,

    description TEXT,

    is_active TINYINT(1) DEFAULT 1,

    created_by INT NULL,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_project_created_by
    FOREIGN KEY (created_by)
    REFERENCES users(id)
);

--  Table to manage the many-to-many relationship between projects and platforms, allowing a project to be associated with multiple platforms and vice versa. This enables better organization and filtering of tasks based on the platforms they are related to.

CREATE TABLE project_platforms (

    id INT AUTO_INCREMENT PRIMARY KEY,

    project_id INT NOT NULL,

    platform_id INT NOT NULL,

    is_default TINYINT(1) DEFAULT 0,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP 
        ON UPDATE CURRENT_TIMESTAMP,


    CONSTRAINT fk_project_platform_project
    FOREIGN KEY(project_id)
    REFERENCES projects(id),


    CONSTRAINT fk_project_platform_platform
    FOREIGN KEY(platform_id)
    REFERENCES platforms(id)

);

-- Table to define different sources from which tasks can originate (e.g., JIRA, Email, Chat, Call, Testing Team, PE Team, Internal, Deployment). This allows for better tracking and reporting of task origins.
CREATE TABLE task_sources (
    id INT AUTO_INCREMENT PRIMARY KEY,

    source_name VARCHAR(100) NOT NULL UNIQUE,

    description VARCHAR(500),

    is_active TINYINT(1) DEFAULT 1,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

--  Table to define various task statuses (e.g., To Do, In Progress, Done) with a sequence number for ordering and an active flag to manage which statuses are currently in use. This allows for better tracking of task progress and workflow management.
CREATE TABLE task_status (
    id INT AUTO_INCREMENT PRIMARY KEY,

    status_name VARCHAR(100) NOT NULL UNIQUE,

    sequence_no INT NOT NULL,

    description VARCHAR(500),

    is_active TINYINT(1) DEFAULT 1,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

--  Table to define different task types (e.g., Bug, Feature, Improvement) with a description and an active flag to manage which task types are currently in use. This helps in categorizing tasks and generating reports based on task types.
CREATE TABLE task_types (
    id INT AUTO_INCREMENT PRIMARY KEY,

    task_type_name VARCHAR(100) NOT NULL UNIQUE,

    description VARCHAR(500),

    is_active TINYINT(1) DEFAULT 1,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

--  Table to store application settings, allowing for key-value pairs of configuration settings that can be easily updated and accessed throughout the application. This provides flexibility in managing application behavior without needing to change code.
CREATE TABLE settings (
    id INT AUTO_INCREMENT PRIMARY KEY,

    setting_key VARCHAR(100) NOT NULL UNIQUE,

    setting_value VARCHAR(255),

    description VARCHAR(500),

    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

-- Table to store task information, including details about the task, its association with projects and platforms, assigned users, status, type, and timestamps for tracking the lifecycle of the task. This is the central table for managing tasks and worklogs in the system.
CREATE TABLE tasks (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    task_details VARCHAR(500) NOT NULL,

    project_id INT NOT NULL,

    task_source_id INT NOT NULL,

    assigned_to INT NOT NULL,

    task_status_id INT NOT NULL,

    task_type_id INT NOT NULL,

    platform_id INT NOT NULL,

    jira_logged TINYINT(1)
        DEFAULT '0',

    created_date DATETIME
        DEFAULT CURRENT_TIMESTAMP,

    started_date DATETIME NULL,

    completed_date DATETIME NULL,

    total_minutes INT DEFAULT 0,

    work_description TEXT,

    remarks TEXT,

    created_by INT NOT NULL,

    updated_by INT NULL,

    is_deleted TINYINT(1) DEFAULT 0,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY(project_id)
        REFERENCES projects(id),

    FOREIGN KEY(task_source_id)
        REFERENCES task_sources(id),

    FOREIGN KEY(assigned_to)
        REFERENCES users(id),

    FOREIGN KEY(task_status_id)
        REFERENCES task_status(id),

    FOREIGN KEY(task_type_id)
        REFERENCES task_types(id),

    FOREIGN KEY(platform_id)
        REFERENCES platforms(id),

    FOREIGN KEY(created_by)
        REFERENCES users(id),

    FOREIGN KEY(updated_by)
        REFERENCES users(id)
);

-- Table to store worklog entries for each task, including the date of work, minutes spent, description of the work done, and references to the task and user who created the entry. This allows for detailed tracking of time spent on tasks and the ability to generate reports based on worklogs.
CREATE TABLE task_worklogs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    task_id BIGINT NOT NULL,

    work_date DATE NOT NULL,

    minutes_spent INT NOT NULL,

    description TEXT NOT NULL,

    created_by INT NOT NULL,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(task_id)
        REFERENCES tasks(id),

    FOREIGN KEY(created_by)
        REFERENCES users(id)
);

-- Table to store the history of changes made to tasks, including changes in status, assigned user, comments, and the user who made the change. This allows for auditing and tracking the evolution of tasks over time.
CREATE TABLE task_history (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    task_id BIGINT NOT NULL,

    old_status_id INT NULL,

    new_status_id INT NULL,

    old_assigned_to INT NULL,

    new_assigned_to INT NULL,

    comments TEXT,

    changed_by INT NOT NULL,

    changed_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(task_id)
        REFERENCES tasks(id),

    FOREIGN KEY(changed_by)
        REFERENCES users(id)
);

-- Table to store attachments related to tasks, including the file name, file path, the user who uploaded the attachment, and the timestamp of the upload. This allows users to associate relevant documents or files with their tasks for better context and information sharing.
CREATE TABLE task_attachments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    task_id BIGINT NOT NULL,

    file_name VARCHAR(255),

    file_path VARCHAR(1000),

    uploaded_by INT,

    uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(task_id)
        REFERENCES tasks(id),

    FOREIGN KEY(uploaded_by)
        REFERENCES users(id)
);

-- Table to store system logs, capturing user actions, module interactions, changes made to data, and other relevant information for auditing and monitoring purposes. This helps in tracking user activities and identifying potential issues or unauthorized access.
CREATE TABLE system_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NULL,

    module_name VARCHAR(100) NOT NULL,

    action_name VARCHAR(100) NOT NULL,

    reference_id BIGINT NULL,

    old_value JSON NULL,

    new_value JSON NULL,

    remarks TEXT,

    ip_address VARCHAR(50),

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(user_id)
        REFERENCES users(id)
);

-- Table to store error logs, capturing details about errors that occur within the application, including the user involved, module where the error occurred, error message, stack trace, API endpoint, request payload, and timestamp. This is crucial for debugging and improving the application.
CREATE TABLE error_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NULL,

    module_name VARCHAR(100),

    error_message TEXT,

    stack_trace LONGTEXT,

    api_endpoint VARCHAR(255),

    request_payload JSON NULL,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(user_id)
        REFERENCES users(id)
);

-- Table to store user login history, capturing login and logout times, IP address, and browser information for each user. This helps in monitoring user access and identifying potential security issues.
CREATE TABLE user_login_history (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,

    login_time DATETIME NOT NULL,

    logout_time DATETIME NULL,

    ip_address VARCHAR(50),

    browser_info VARCHAR(500),

    FOREIGN KEY(user_id)
        REFERENCES users(id)
);

-- Table to store different platforms where tasks are performed (e.g., Web, Mobile, API)
INSERT INTO platforms(platform_name) VALUES
('UAT'),
('LIVE VSI'),
('LIVE CBE'),
('ALL'),
('LOCAL'),
('OTHER');

-- Table to define various task statuses (e.g., To Do, In Progress, Done) with a sequence number for ordering and an active flag to manage which statuses are currently in use. This allows for better tracking of task progress and workflow management.
INSERT INTO task_status(status_name,sequence_no) VALUES
('NEW',1),
('IN PROGRESS',2),
('FINISHED',3),
('PENDING',4),
('DROPPED',5);

-- Table to store different types of tasks (e.g., Bug, Feature, Improvement) with a description and an active flag to manage which task types are currently in use. This helps in categorizing tasks and generating reports based on task types.
INSERT INTO task_types(task_type_name) VALUES
('ISSUE'),
('ENHANCEMENT'),
('SUPPORT TASK'),
('DEPLOYMENT TASK'),
('MEETING'),
('SELF LEARNING'),
('ANALYSIS'),
('TESTING');

-- Table to store different sources from which tasks can originate (e.g., JIRA, Email, Chat, Call, Testing Team, PE Team, Internal, Deployment). This allows for better tracking and reporting of task origins.`
INSERT INTO task_sources(source_name) VALUES
('JIRA'),
('EMAIL'),
('CHAT'),
('CALL'),
('TESTING TEAM'),
('PE TEAM'),
('INTERNAL'),
('DEPLOYMENT');

-- Table to store application settings, allowing for key-value pairs of configuration settings that can be easily updated and accessed throughout the application. This provides flexibility in managing application behavior without needing to change code.
CREATE TABLE saved_filters (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    name VARCHAR(255) NOT NULL,

    user_id BIGINT NOT NULL,

    filter_json JSON NOT NULL,

    is_public TINYINT(1) DEFAULT 0,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_saved_filters_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
);

--Table  to store saved filter settings

CREATE TABLE saved_filters (

    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,

    module VARCHAR(50) NOT NULL,

    name VARCHAR(100) NOT NULL,

    filter_json JSON NOT NULL,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP

);

