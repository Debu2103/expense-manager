"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useExpenses } from "../../Context/ExpenseContext";

const schema = Yup.object({
  title: Yup.string().required("Title is required"),
  amount: Yup.number().required("Amount is required").positive("Amount must be positive"),
  date: Yup.string().required("Date is required"),
  description: Yup.string(),
});

interface ExpenseFormProps {
  userId: string;
  isModal?: boolean;
  onClose?: () => void;
}

export default function ExpenseForm({ userId, isModal = false, onClose }: ExpenseFormProps) {
  const { addExpense, updateExpense, selectedExpense, selectExpense } = useExpenses();

  const handleSubmit = (values: any, { resetForm }: any) => {
    if (selectedExpense) {
      updateExpense(userId, {
        id: selectedExpense.id,
        title: values.title,
        amount: Number(values.amount),
        date: values.date,
        description: values.description,
      });
    } else {
      addExpense(userId, {
        title: values.title,
        amount: Number(values.amount),
        date: values.date,
        description: values.description,
      });
    }
    resetForm();
    if (onClose) onClose();
  };

  const formContent = (
    <Formik
      enableReinitialize
      initialValues={{
        title: selectedExpense?.title || "",
        amount: selectedExpense?.amount || "",
        date: selectedExpense?.date || "",
        description: selectedExpense?.description || "",
      }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="form-group">
            <label className="form-label">Title</label>
            <Field name="title" placeholder="Enter expense title" />
            <ErrorMessage name="title" component="div" style={{ color: "#d32f2f", fontSize: "12px", marginTop: "4px" }} />
          </div>

          <div className="form-group">
            <label className="form-label">Amount</label>
            <Field name="amount" type="number" placeholder="Enter amount" step="0.01" />
            <ErrorMessage name="amount" component="div" style={{ color: "#d32f2f", fontSize: "12px", marginTop: "4px" }} />
          </div>

          <div className="form-group">
            <label className="form-label">Date</label>
            <Field name="date" type="date" />
            <ErrorMessage name="date" component="div" style={{ color: "#d32f2f", fontSize: "12px", marginTop: "4px" }} />
          </div>

          <div className="form-group">
            <label className="form-label">Description (Optional)</label>
            <Field name="description" placeholder="Enter description" as="textarea" style={{ minHeight: "80px", fontFamily: "inherit" }} />
          </div>

          <div className="form-actions">
            {isModal && onClose && (
              <button type="button" className="btn-secondary" onClick={onClose}>
                Cancel
              </button>
            )}
            <button type="submit">
              {selectedExpense ? "Update Expense" : "Add Expense"}
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
            <h2 className="modal-title">{selectedExpense ? "Edit Expense" : "Add Expense"}</h2>
            <button className="modal-close" onClick={onClose}>×</button>
          </div>
          {formContent}
        </div>
      </div>
    );
  }

  return formContent;
}
