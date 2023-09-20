import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useFetch from "../customhook/useFetch";

const TaskForm = () => {
  const { isLoading, apiData, serverError, fetchData } = useFetch();

  const initialValues = {
    title: "",
    description: "",
    duedate: "",
    priority: "Medium",
    status: "To Do",
    assignee: "",
    tags: [],
    team_id: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    duedate: Yup.date().required("Due Date is required"),
    priority: Yup.string().required("Priority is required"),
    status: Yup.string().required("Status is required"),
    assignee: Yup.string().required("Assignee is required"),
    team_id: Yup.string().required("Team ID is required"),
  });

  const onSubmit = (values) => {
    // Handle form submission here
    const headers = {
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6ImpldGFuaXZpc2h2IiwicGFzc3dvcmQiOiIkMmIkMTAkZ3RjeFdVdUtuWUJoZWVGNE5rN2JoLk9OWXBjRTh3anJrMHhMUnRzYTJ0MUFHdFZUdFl0aHUiLCJlbWFpbCI6ImpldGFuaXZpc2h2QGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJWaXNodiIsImxhc3RfbmFtZSI6IkpldGFuaSIsImNyZWF0ZWRfYXQiOiIyMDIzLTA5LTE1VDEzOjU4OjQ4LjAwMFoifSwiaWF0IjoxNjk1MDM1ODAzLCJleHAiOjE2OTUzODE0MDN9.GgFQyOFWcG74ncoen3GjlOwXjYq5tojnzG_kIY0QYGI",
      "Content-Type": "application/json",
    };

    values = { ...values, assigner: "jetanivishv" };
    fetchData("post", "http://localhost:5000/task/addtask", values, headers);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <div>
          <label htmlFor="title">Title</label>
          <Field type="text" id="title" name="title" />
          <ErrorMessage name="title" component="div" className="error" />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <Field type="text" id="description" name="description" />
          <ErrorMessage name="description" component="div" className="error" />
        </div>

        <div>
          <label htmlFor="duedate">Due Date</label>
          <Field type="date" id="duedate" name="duedate" />
          <ErrorMessage name="duedate" component="div" className="error" />
        </div>

        <div>
          <label htmlFor="priority">Priority</label>
          <Field as="select" id="priority" name="priority">
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </Field>
          <ErrorMessage name="priority" component="div" className="error" />
        </div>

        <div>
          <label htmlFor="status">Status</label>
          <Field as="select" id="status" name="status">
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Deferred">Deferred</option>
            <option value="Cancelled">Cancelled</option>
          </Field>
          <ErrorMessage name="status" component="div" className="error" />
        </div>

        <div>
          <label htmlFor="assignee">Assignee</label>
          <Field type="text" id="assignee" name="assignee" />
          <ErrorMessage name="assignee" component="div" className="error" />
        </div>

        <div>
          <label htmlFor="tags">Tags</label>
          <Field type="text" id="tags" name="tags" />
          <ErrorMessage name="tags" component="div" className="error" />
        </div>

        <div>
          <label htmlFor="team_id">Team ID</label>
          <Field type="text" id="team_id" name="team_id" />
          <ErrorMessage name="team_id" component="div" className="error" />
        </div>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default TaskForm;
