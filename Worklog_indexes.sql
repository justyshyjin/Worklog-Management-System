CREATE INDEX idx_tasks_project
ON tasks(project_id);

CREATE INDEX idx_tasks_status
ON tasks(task_status_id);

CREATE INDEX idx_tasks_type
ON tasks(task_type_id);

CREATE INDEX idx_tasks_platform
ON tasks(platform_id);

CREATE INDEX idx_tasks_assigned
ON tasks(assigned_to);

CREATE INDEX idx_tasks_created_date
ON tasks(created_date);

CREATE INDEX idx_tasks_deleted
ON tasks(is_deleted);

CREATE INDEX idx_task_worklogs_date
ON task_worklogs(work_date);

CREATE INDEX idx_system_logs_user
ON system_logs(user_id);

CREATE INDEX idx_system_logs_module
ON system_logs(module_name);

CREATE INDEX idx_system_logs_created
ON system_logs(created_at);

CREATE INDEX idx_error_logs_created
ON error_logs(created_at);

CREATE INDEX idx_login_history_user
ON user_login_history(user_id);

CREATE INDEX idx_task_history_task_id
ON task_history(task_id);