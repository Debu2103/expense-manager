"use client";

import { useState } from "react";
import { useExpenses } from "../../Context/ExpenseContext";

export default function ExpenseTable({ userId }: { userId: string }) {
  const { expensesByUser, deleteExpense, selectExpense } = useExpenses();
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const userExpenses = expensesByUser[userId] || [];

  const handleDelete = (expenseId: string) => {
    if (deleteConfirm === expenseId) {
      deleteExpense(userId, expenseId);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(expenseId);
    }
  };

  if (!userExpenses.length) return <p>No expenses</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {userExpenses.map((e) => {
          const isConfirming = deleteConfirm === e.id;
          return (
            <tr key={e.id}>
              <td>{e.title}</td>
              <td>${e.amount}</td>
              <td>{e.date}</td>
              <td>{e.description || "-"}</td>
              <td>
                <button onClick={() => selectExpense(e)}>Edit</button>
                <button
                  onClick={() => handleDelete(e.id)}
                  style={{ color: isConfirming ? "red" : "black" }}
                >
                  {isConfirming ? "Confirm?" : "Delete"}
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
