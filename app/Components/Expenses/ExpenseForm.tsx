"use client";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useExpenses } from "../../Context/ExpenseContext";

const schema = Yup.object({
  title: Yup.string().required("Title is required"),
  amount: Yup.number().required("Amount is required").positive("Amount must be positive"),
  date: Yup.string().required("Date is required"),
  description: Yup.string(),
});

export default function ExpenseForm({ userId }: { userId: string }) {
  const { addExpense, updateExpense, selectedExpense, selectExpense } = useExpenses();

  return (
    <Formik
      enableReinitialize
      initialValues={{
        title: selectedExpense?.title || "",
        amount: selectedExpense?.amount || "",
        date: selectedExpense?.date || "",
        description: selectedExpense?.description || "",
      }}
      validationSchema={schema}
      onSubmit={(values, { resetForm }) => {
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
      }}
    >
      <Form>
        <Field name="title" placeholder="Title" />
        <Field name="amount" placeholder="Amount" type="number" />
        <Field name="date" type="date" />
        <Field name="description" placeholder="Description" />
        <button type="submit">
          {selectedExpense ? "Update Expense" : "Add Expense"}
        </button>
        {selectedExpense && (
          <button
            type="button"
            onClick={() => {
              selectExpense(null);
            }}
          >
            Cancel
          </button>
        )}
      </Form>
    </Formik>
  );
}
