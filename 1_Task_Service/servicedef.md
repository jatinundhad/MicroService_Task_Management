Description: The Task Service is responsible for managing tasks within the task management application. It provides functionality to create, read, update, and delete tasks. Tasks represent actionable items or work items that users need to track and manage.

Responsibilities:

Task Creation: Allow users to create new tasks with details such as title, description, due date, and assignment.

Task Retrieval: Provide endpoints to retrieve task details by task ID, user, or other criteria. Users should be able to view their own tasks and tasks assigned to them.

Task Update: Enable users to update task information, including modifying task details, changing due dates, and marking tasks as completed.

Task Deletion: Allow users to delete tasks they no longer need.

Task Listing: Provide endpoints to list tasks, allowing users to filter tasks by various criteria, such as status, due date, and assignment.

User Authentication: Implement user authentication to ensure that only authorized users can create, update, or delete tasks. Users should be authenticated using secure methods, such as tokens or session management.

API Endpoints:

POST /tasks: Create a new task.
GET /tasks/{taskId}: Retrieve task details by task ID.
GET /tasks?user={userId}: Retrieve tasks assigned to a specific user.
PUT /tasks/{taskId}: Update task details by task ID.
DELETE /tasks/{taskId}: Delete a task by task ID.
GET /tasks/list: List tasks with various filtering options.

Create Task Request:
{
    "title": "Task Title",
    "description": "Task description goes here",
    "due_date": "2023-12-31",
    "assignee_id": "user123"
}

Task Response:
{
    "id": "task123",
    "title": "Task Title",
    "description": "Task description goes here",
    "due_date": "2023-12-31",
    "status": "in_progress",
    "assignee_id": "user123"
}

