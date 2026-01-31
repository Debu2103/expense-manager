"use client";

import { useExpenses } from "../../Context/ExpenseContext";

export default function ExpenseTable({ userId }: { userId: string }) {
  const { expensesByUser, deleteExpense } = useExpenses();

  const userExpenses = expensesByUser[userId] || [];

  if (!userExpenses.length) return <p>No expenses</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {userExpenses.map((e) => (
          <tr key={e.id}>
            <td>{e.title}</td>
            <td>{e.amount}</td>
            <td>{e.date}</td>
            <td>
              <button onClick={() => deleteExpense(userId, e.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
