Description: The Task Service is responsible for managing tasks within the task management application. It provides functionality to create, read, update, and delete tasks. Tasks represent actionable items or work items that users need to track and manage.

Responsibilities:

1.Task Creation: Allow users to create new tasks with details such as title, description, due date, and assignment.
2.Task Retrieval: Provide endpoints to retrieve task details by task ID, user, or other criteria. Users should be able to view their own tasks and tasks assigned to them.
3.Task Update: Enable users to update task information, including modifying task details, changing due dates, and marking tasks as completed.
4.Task Deletion: Allow users to delete tasks they no longer need.
5.Task Listing: Provide endpoints to list tasks, allowing users to filter tasks by various criteria, such as status, due date, and assignment.
6.User Authentication: Implement user authentication to ensure that only authorized users can create, update, or delete tasks. Users should be authenticated using secure methods, such as tokens or session management.

Attributes of Tasks:
1.Title : A brief, descriptive title that summarizes the task's purpose or objective.
2.Description : A more detailed explanation or notes about the task. This can include additional context, instructions, or comments related to the task.
3.Due Date : The date and time when the task is expected to be completed. This attribute helps users prioritize tasks and meet deadlines.
4.Status:The current state of the task. Common statuses include "To Do," "In Progress," "Completed," "Deferred," and "Canceled." Task status provides an overview of task progress.
5.Assignee:The person or team responsible for completing the task. Assigning tasks helps distribute work among team members and ensures accountability.
6.Creator:The person who created or initiated the task. This attribute can be useful for tracking task ownership and origin.

dummy data:
[
  {
    "title": "Task 1",
    "description": "Complete the project proposal",
    "due_date": "2023-10-15",
    "status": "In Progress",
    "assignee": "John Doe",
    "creator": "Alice Smith"
  },
  {
    "title": "Task 2",
    "description": "Review client contracts",
    "due_date": "2023-09-30",
    "status": "To Do",
    "assignee": "Jane Brown",
    "creator": "Bob Johnson"
  },
  {
    "title": "Task 3",
    "description": "Prepare presentation slides",
    "due_date": "2023-10-05",
    "status": "Completed",
    "assignee": "Eva Wilson",
    "creator": "Grace Davis"
  },
  {
    "title": "Task 4",
    "description": "Update website content",
    "due_date": "2023-10-20",
    "status": "In Progress",
    "assignee": "Charlie Lee",
    "creator": "David Kim"
  },
  {
    "title": "Task 5",
    "description": "Conduct market research",
    "due_date": "2023-10-10",
    "status": "To Do",
    "assignee": "Sophia Clark",
    "creator": "Emma Wilson"
  },
  {
    "title": "Task 6",
    "description": "Submit expense reports",
    "due_date": "2023-10-25",
    "status": "To Do",
    "assignee": "Oliver Taylor",
    "creator": "Ava Martinez"
  }
]


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

