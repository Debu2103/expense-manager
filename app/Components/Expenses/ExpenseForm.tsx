"use client";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useExpenses } from "../../Context/ExpenseContext";

const schema = Yup.object({
  title: Yup.string().required(),
  amount: Yup.number().required(),
  date: Yup.string().required(),
});

export default function ExpenseForm({ userId }: { userId: string }) {
  const { addExpense } = useExpenses();

  return (
    <Formik
      initialValues={{ title: "", amount: "", date: "", description: "" }}
      validationSchema={schema}
      onSubmit={(values, { resetForm }) => {
        addExpense(userId, {
          title: values.title,
          amount: Number(values.amount),
          date: values.date,
          description: values.description,
        });
        resetForm();
      }}
    >
      <Form>
        <Field name="title" placeholder="Title" />
        <Field name="amount" placeholder="Amount" />
        <Field name="date" type="date" />
        <Field name="description" placeholder="Description" />
        <button type="submit">Add Expense</button>
      </Form>
    </Formik>
  );
}
