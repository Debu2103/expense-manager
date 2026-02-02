"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
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

interface UserFormProps {
  isModal?: boolean;
  onClose?: () => void;
}

export default function UserForm({ isModal = false, onClose }: UserFormProps) {
  const { addUser, updateUser, selectedUser } = useUsers();

  const handleSubmit = (values: any, { resetForm }: any) => {
    if (selectedUser) {
      updateUser({ ...values, id: selectedUser.id });
    } else {
      addUser(values);
    }
    resetForm();
    if (onClose) onClose();
  };

  const formContent = (
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
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="form-group">
            <label className="form-label">First Name</label>
            <Field name="fname" placeholder="Enter first name" />
            <ErrorMessage
              name="fname"
              component="div"
              style={{ color: "#d32f2f", fontSize: "12px", marginTop: "4px" }}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Last Name</label>
            <Field name="lname" placeholder="Enter last name" />
            <ErrorMessage
              name="lname"
              component="div"
              style={{ color: "#d32f2f", fontSize: "12px", marginTop: "4px" }}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <Field
              name="email"
              type="email"
              placeholder="Enter email address"
            />
            <ErrorMessage
              name="email"
              component="div"
              style={{ color: "#d32f2f", fontSize: "12px", marginTop: "4px" }}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Role</label>
            <Field name="role" as="select">
              <option value="">Select a role</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
              <option value="Manager">Manager</option>
            </Field>
            <ErrorMessage
              name="role"
              component="div"
              style={{ color: "#d32f2f", fontSize: "12px", marginTop: "4px" }}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Gender (Optional)</label>
            <Field name="gender" placeholder="Enter gender" />
          </div>

          <div className="form-group">
            <label className="form-label">Address (Optional)</label>
            <Field name="address" placeholder="Enter address" />
          </div>

          <div className="form-group">
            <label className="form-label">Phone (Optional)</label>
            <Field name="phno" placeholder="Enter phone number" />
          </div>

          <div className="form-actions">
            {isModal && onClose && (
              <button type="button" className="btn-secondary" onClick={onClose}>
                Cancel
              </button>
            )}
            <button type="submit">
              {selectedUser ? "Update User" : "Create Profile"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );

  if (isModal) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2 className="modal-title">Add New User</h2>
            <button className="modal-close" onClick={onClose}>
              ×
            </button>
          </div>
          {formContent}
        </div>
      </div>
    );
  }

  return formContent;
}
