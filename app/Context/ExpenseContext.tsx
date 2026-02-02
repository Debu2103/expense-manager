"use client";

import { createContext, useContext, useState } from "react";
import { Expense } from "../Types/Expense";

type ExpenseState = {
  [userId: string]: Expense[];
};

interface ExpenseContextType {
  expensesByUser: ExpenseState;
  addExpense: (userId: string, expense: Omit<Expense, "id">) => void;
  updateExpense: (userId: string, expense: Expense) => void;
  deleteExpense: (userId: string, expenseId: string) => void;
  selectedExpense: Expense | null;
  selectExpense: (expense: Expense | null) => void;
}

const ExpenseContext = createContext<ExpenseContextType | null>(null);

export function ExpenseProvider({ children }: { children: React.ReactNode }) {
  const [expensesByUser, setExpensesByUser] = useState<ExpenseState>({});
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

  const addExpense = (userId: string, expense: Omit<Expense, "id">) => {
    setExpensesByUser((prev) => ({
      ...prev,
      [userId]: [
        ...(prev[userId] || []),
        { ...expense, id: crypto.randomUUID() },
      ],
    }));
  };

  const updateExpense = (userId: string, expense: Expense) => {
    setExpensesByUser((prev) => ({
      ...prev,
      [userId]:
        prev[userId]?.map((e) => (e.id === expense.id ? expense : e)) || [],
    }));
    setSelectedExpense(null);
  };

  const deleteExpense = (userId: string, expenseId: string) => {
    setExpensesByUser((prev) => ({
      ...prev,
      [userId]: prev[userId]?.filter((e) => e.id !== expenseId) || [],
    }));
  };

  const selectExpense = (expense: Expense | null) => {
    setSelectedExpense(expense);
  };

  return (
    <ExpenseContext.Provider
      value={{
        expensesByUser,
        addExpense,
        updateExpense,
        deleteExpense,
        selectedExpense,
        selectExpense,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export const useExpenses = () => {
  const ctx = useContext(ExpenseContext);
  if (!ctx) throw new Error("useExpenses must be inside ExpenseProvider");
  return ctx;
};
