"use client";

import { createContext, useContext, useState } from "react";
import { Expense } from "../Types/Expense";

type ExpenseState = {
  [userId: string]: Expense[];
};

interface ExpenseContextType {
  expensesByUser: ExpenseState;
  addExpense: (userId: string, expense: Omit<Expense, "id">) => void;
  deleteExpense: (userId: string, expenseId: string) => void;
}

const ExpenseContext = createContext<ExpenseContextType | null>(null);

export function ExpenseProvider({ children }: { children: React.ReactNode }) {
  const [expensesByUser, setExpensesByUser] = useState<ExpenseState>({});

  const addExpense = (userId: string, expense: Omit<Expense, "id">) => {
    setExpensesByUser((prev) => ({
      ...prev,
      [userId]: [
        ...(prev[userId] || []),
        { ...expense, id: crypto.randomUUID() },
      ],
    }));
  };

  const deleteExpense = (userId: string, expenseId: string) => {
    setExpensesByUser((prev) => ({
      ...prev,
      [userId]: prev[userId]?.filter((e) => e.id !== expenseId) || [],
    }));
  };

  return (
    <ExpenseContext.Provider
      value={{ expensesByUser, addExpense, deleteExpense }}
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
