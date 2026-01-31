"use client";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useUsers } from "../../Context/UserContext";

const schema = Yup.object({
  fname: Yup.string().required(),
  lname: Yup.string().required(),
  email: Yup.string().email().required(),
  gender: Yup.string().required(),
  address: Yup.string().required(),
  phno: Yup.string().required(),
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
        <Field name="email" placeholder="Email" />
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
