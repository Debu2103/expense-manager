"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useUsers } from "../../Context/UserContext";

const schema = Yup.object({
  fname: Yup.string().required("First Name is required"),
  lname: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  role: Yup.string().required("Role is required"),
});

export default function UserForm() {
  const { addUser, updateUser, selectedUser } = useUsers();

  return (
    <Formik
      enableReinitialize
      initialValues={{
        fname: selectedUser?.fname || "",
        lname: selectedUser?.lname || "",
        email: selectedUser?.email || "",
        role: selectedUser?.role || "",
      }}
      validationSchema={schema}
      onSubmit={(values, { resetForm }) => {
        selectedUser
          ? updateUser({ ...values, id: selectedUser.id })
          : addUser(values);
        resetForm();
      }}
    >
      {({ errors, touched }) => (
        <Form className="space-y-4">
          <div>
            <Field
              name="fname"
              placeholder="First Name"
              className="w-full px-3 py-2 border rounded-md"
            />
            <ErrorMessage
              name="fname"
              component="p"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div>
            <Field
              name="lname"
              placeholder="Last Name"
              className="w-full px-3 py-2 border rounded-md"
            />
            <ErrorMessage
              name="lname"
              component="p"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div>
            <Field
              name="email"
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2 border rounded-md"
            />
            <ErrorMessage
              name="email"
              component="p"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div>
            <Field
              as="select"
              name="role"
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">Select a Role</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="User">User</option>
            </Field>
            <ErrorMessage
              name="role"
              component="p"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            {selectedUser ? "Update User" : "Add User"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
