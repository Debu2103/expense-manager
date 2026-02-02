"use client";

import { useState } from "react";
import { useExpenses } from "../../Context/ExpenseContext";
import ExpenseForm from "./ExpenseForm";

interface ExpenseTableProps {
  userId: string;
}

export default function ExpenseTable({ userId }: ExpenseTableProps) {
  const { expensesByUser, deleteExpense, selectExpense } = useExpenses();
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [editingExpense, setEditingExpense] = useState<any>(null);

  const userExpenses = expensesByUser[userId] || [];

  const handleDelete = (expenseId: string) => {
    if (deleteConfirm === expenseId) {
      deleteExpense(userId, expenseId);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(expenseId);
    }
  };

  const handleEdit = (expense: any) => {
    selectExpense(expense);
    setEditingExpense(expense);
  };

  const handleCloseEdit = () => {
    setEditingExpense(null);
    selectExpense(null);
  };

  if (!userExpenses.length) {
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "#999" }}>
        <p style={{ fontSize: "14px", margin: "0" }}>No expenses found. Add a new expense to get started.</p>
      </div>
    );
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Description</th>
            <th style={{ width: "180px" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {userExpenses.map((e) => {
            const isConfirming = deleteConfirm === e.id;
            return (
              <tr key={e.id}>
                <td>{e.title}</td>
                <td>${e.amount.toFixed(2)}</td>
                <td>{e.date}</td>
                <td>{e.description || "-"}</td>
                <td>
                  <button 
                    onClick={() => handleEdit(e)}
                    style={{ marginRight: "8px", padding: "8px 12px", fontSize: "13px" }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(e.id)}
                    style={{ 
                      padding: "8px 12px", 
                      fontSize: "13px",
                      color: isConfirming ? "white" : "#1a1a1a",
                      backgroundColor: isConfirming ? "#d32f2f" : "#f0f0f0",
                      border: isConfirming ? "none" : "1px solid #e0e0e0"
                    }}
                  >
                    {isConfirming ? "Confirm?" : "Delete"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {editingExpense && (
        <ExpenseForm userId={userId} isModal onClose={handleCloseEdit} />
      )}
    </>
  );
}
