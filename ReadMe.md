High-Level Architecture
┌─────────────────────────────────────────────────┐
│                 REACT FRONTEND                  │
│                                                 │
│ Login                                           │
│ Dashboard                                       │
│ Tasks                                            │
│ Reports                                          │
│ Settings                                         │
│ Masters                                          │
└─────────────────────┬───────────────────────────┘
                      │ REST API
                      ▼
┌─────────────────────────────────────────────────┐
│               PYTHON BACKEND API                │
│                                                 │
│ Authentication Module                           │
│ Task Module                                     │
│ Project Module                                  │
│ Platform Module                                 │
│ Reports Module                                  │
│ Settings Module                                 │
│ Logging Module                                  │
└─────────────────────┬───────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────┐
│                    MYSQL                        │
│                                                 │
│ Tasks                                            │
│ Worklogs                                         │
│ Projects                                         │
│ Users                                            │
│ Reports                                          │
│ Audit Logs                                       │
└─────────────────────────────────────────────────┘
Recommended Technology Stack
Frontend
React 19
React Router
Axios
Material UI (MUI)
AG Grid
Chart.js
React Query
Backend

I recommend FastAPI instead of Flask.

Python 3.12

FastAPI

SQLAlchemy

Pydantic

JWT Authentication

Passlib

Uvicorn

OpenPyXL

ReportLab

Pandas
Database
MySQL 8
Project Structure
Backend
backend/

├── app.py

├── config/
│   ├── database.py
│   ├── settings.py
│   └── logger.py

├── models/
│   ├── user.py
│   ├── task.py
│   ├── project.py
│   ├── platform.py
│   ├── worklog.py
│   ├── report.py
│   └── logs.py

├── schemas/
│   ├── task_schema.py
│   ├── project_schema.py
│   ├── user_schema.py
│   └── report_schema.py

├── services/
│   ├── auth_service.py
│   ├── task_service.py
│   ├── project_service.py
│   ├── report_service.py
│   ├── export_service.py
│   └── logging_service.py

├── routers/
│   ├── auth_router.py
│   ├── task_router.py
│   ├── project_router.py
│   ├── platform_router.py
│   ├── report_router.py
│   ├── settings_router.py
│   └── dashboard_router.py

├── middleware/
│   ├── jwt_middleware.py
│   └── audit_middleware.py

├── exports/
│   ├── excel/
│   ├── pdf/
│   └── csv/

├── uploads/
│   └── attachments/

└── logs/
    ├── 2026-06-03.log
    ├── 2026-06-04.log
    └── ...

Frontend Structure
frontend/

src/

├── pages/

│   ├── LoginPage.jsx

│   ├── DashboardPage.jsx

│   ├── TaskListPage.jsx

│   ├── ReportsPage.jsx

│   ├── SettingsPage.jsx

│   └── ProfilePage.jsx

├── components/

│   ├── layout/

│   │   ├── Header.jsx

│   │   ├── Sidebar.jsx

│   │   └── Footer.jsx

│   ├── dashboard/

│   │   ├── StatsCards.jsx

│   │   ├── TaskStatusChart.jsx

│   │   ├── ProjectChart.jsx

│   │   ├── PlatformChart.jsx

│   │   └── HoursChart.jsx

│   ├── tasks/

│   │   ├── TaskList.jsx

│   │   ├── TaskCard.jsx

│   │   ├── TaskForm.jsx

│   │   ├── TaskView.jsx

│   │   └── TaskFilters.jsx

│   ├── masters/

│   │   ├── ProjectForm.jsx

│   │   ├── PlatformForm.jsx

│   │   ├── StatusForm.jsx

│   │   ├── SourceForm.jsx

│   │   └── TypeForm.jsx

│   └── common/

│       ├── ConfirmDialog.jsx

│       ├── Loader.jsx

│       └── Notification.jsx

├── api/

│   ├── authApi.js

│   ├── taskApi.js

│   ├── projectApi.js

│   ├── dashboardApi.js

│   └── reportApi.js

├── context/

│   └── AuthContext.js

├── hooks/

│   └── useAuth.js

├── utils/

│   ├── constants.js

│   ├── helpers.js

│   └── exportHelpers.js

└── App.jsx

Screen Flow
Login
Login
  │
  ▼
Dashboard
Dashboard
Dashboard

├── Statistics
├── Task Summary
├── Quick Filters
├── Recent Activities
└── Charts
Tasks
Tasks

├── Search
├── Filters
├── Export
├── View
├── Edit
├── Delete
└── Action
API Structure
Authentication
POST   /api/auth/login

POST   /api/auth/logout

GET    /api/auth/profile
Dashboard
GET /api/dashboard/stats

GET /api/dashboard/charts

GET /api/dashboard/recent-activities
Tasks
GET     /api/tasks

GET     /api/tasks/{id}

POST    /api/tasks

PUT     /api/tasks/{id}

DELETE  /api/tasks/{id}

PATCH   /api/tasks/{id}/status
Projects
GET

POST

PUT

DELETE

Same pattern for:

Platforms

Task Status

Task Sources

Task Types

Users
Dashboard Statistics

Top cards should display:

Total Tasks

Weekly Tasks

Monthly Tasks

Yearly Tasks

Weekly Hours

Monthly Hours

Yearly Hours

New Tasks

Pending Tasks

In Progress Tasks

Finished Tasks

Dropped Tasks

Jira Logged

Not Logged
Analytics Section

Below task list:

Task Status Distribution

Project Distribution

Task Source Distribution

Platform Distribution

Task Type Distribution

Weekly Trend

Monthly Trend

Hours Trend

Jira Analysis
Export Module

Supported formats:

Excel (.xlsx)

CSV (.csv)

PDF (.pdf)

Libraries:

Pandas

OpenPyXL

ReportLab
Logging Strategy

Every API call passes through:

Audit Middleware

Example:

User Created Task

↓

Task Service

↓

Save Task

↓

Write Audit Log

↓

Return Response

Recorded in:

system_logs

error_logs

application log files
Future Enhancements (Already Supported)
Email Notifications

Task Reminders

Jira Sync

LDAP Login

Multi-Team Support

Department Support

Attachment Upload

Role-Based Permissions

Mobile App
Deployment Architecture
Ubuntu 24.04

Nginx

React Build

FastAPI (Uvicorn/Gunicorn)

MySQL 8

Systemd Services
Internet
    │
    ▼
Nginx
    │
    ├── React Frontend
    │
    └── FastAPI Backend
            │
            ▼
         MySQL


Recommended Roadmap
Phase 1 - Foundation (Mandatory)
Step 1: Finalize Database Schema

Deliverables:

Complete MySQL schema
Foreign keys
Indexes
Default master data
Audit tables
Login history
Settings table

Output:

database/
├── 001_create_tables.sql
├── 002_master_data.sql
├── 003_indexes.sql

Status:
✅ Almost completed

Step 2: API Specification

Before writing any code, define all APIs.

Example:

POST /api/auth/login

GET /api/tasks

POST /api/tasks

PUT /api/tasks/{id}

DELETE /api/tasks/{id}

PATCH /api/tasks/{id}/status

Deliverable:

api-documentation.md

Why?

Because React and Python can be developed independently afterward.

Step 3: React UI Wireframes

Convert the ideas into actual screen layouts.

Login Screen
+-----------------------+
| WorkLog Management    |
+-----------------------+

Username

Password

[ Login ]
Dashboard
Header

Sidebar + Task List

Analytics
Add Task Popup
Edit Task Popup
View Task Popup
Settings Screen
Reports Screen

This is where we decide:

colors
fonts
card style
menu behavior
popup behavior

before coding.

Phase 2 - Backend Development
Step 4: Backend Project Setup

Create:

backend/

config/
models/
routers/
services/
middleware/

Install:

pip install fastapi
pip install uvicorn
pip install sqlalchemy
pip install pymysql
pip install python-jose
pip install passlib
Step 5: Authentication Module

Features:

Login
Logout
JWT Token
User Profile

Tables used:

users
user_login_history
Step 6: Master Modules

Create CRUD APIs for:

Projects

Platforms

Task Status

Task Types

Task Sources

Users

Settings
Step 7: Task Module

Most important module.

Features:

Create Task

Edit Task

Delete Task

View Task

Change Status

Add Worklog

Attachments

Tables:

tasks

task_worklogs

task_history

task_attachments
Step 8: Logging Middleware

Automatically log:

Login

Logout

Create

Update

Delete

Export

Errors

Tables:

system_logs

error_logs
Phase 3 - Frontend Development
Step 9: React Layout

Create:

Header

Sidebar

Task Area

Analytics Area

No API integration yet.

Only UI.

Step 10: Authentication UI
Login Page

Protected Routes

Session Handling
Step 11: Task Module UI
Task List

Add Task

Edit Task

View Task

Delete Task
Step 12: Filters
Project

Status

Platform

Task Type

Task Source

Assigned To

Date Range
Step 13: Dashboard Cards
Total Tasks

Weekly Tasks

Monthly Tasks

Hours

Jira Counts
Step 14: Charts
Pie Charts

Bar Charts

Line Charts

Donut Charts
Phase 4 - Reporting
Step 15: Export Module

Generate:

Excel

CSV

PDF

Filtered or selected records.

Step 16: Reports
Daily Report

Weekly Report

Monthly Report

Yearly Report

Custom Report
Phase 5 - Production
Step 17: Deployment
Ubuntu

Nginx

FastAPI

MySQL
Step 18: Backup

Daily:

Database Backup

Application Logs Backup
Step 19: Monitoring
Application Health

API Response Time

Database Health

Disk Usage
What I Would Do Next

If this were my project, I would proceed with:

Option 1 (Recommended)

Create the complete API specification first.

Reason:

Backend and frontend can then be developed in parallel.
No confusion about request/response formats.
Prevents rework later.
Option 2

Design the React UI screens in detail (component-by-component).

Reason:

You already have a React prototype (App.js).
We can redesign it into the final professional layout before touching backend code.
Option 3

Create the complete MySQL SQL script package (001_create_tables.sql, 002_master_data.sql, 003_indexes.sql) ready to run on MySQL.

Reason:

Gives you the database immediately and locks the data model.

My recommendation is:

Next Step → Option 3 → Option 1 → Option 2


Commands to run the application:
--------------------------------
cd /tnq/web/Learning/worklog_management/ui/
npm run dev

cd /tnq/web/Learning/Worklog_management/api# 
uvicorn app.main:app --reload
