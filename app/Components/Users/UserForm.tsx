"use client";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useUsers } from "../../Context/UserContext";

const schema = Yup.object({
  fname: Yup.string().required("First name is required"),
  lname: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  role: Yup.string().required("Role is required"),
  gender: Yup.string(),
  address: Yup.string(),
  phno: Yup.string(),
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
        gender: selectedUser?.gender || "",
        address: selectedUser?.address || "",
        phno: selectedUser?.phno || "",
      }}
      validationSchema={schema}
      onSubmit={(values, { resetForm }) => {
        selectedUser
          ? updateUser({ ...values, id: selectedUser.id })
          : addUser(values);
        resetForm();
      }}
    >
      <Form>
        <Field name="fname" placeholder="First Name" />
        <Field name="lname" placeholder="Last Name" />
        <Field name="email" placeholder="Email" type="email" />
        <Field name="role" placeholder="Role" as="select">
          <option value="">Select Role</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
          <option value="Manager">Manager</option>
        </Field>
        <Field name="gender" placeholder="Gender" />
        <Field name="address" placeholder="Address" />
        <Field name="phno" placeholder="Phone" />
        <button type="submit">
          {selectedUser ? "Update User" : "Add User"}
        </button>
      </Form>
    </Formik>
  );
}
