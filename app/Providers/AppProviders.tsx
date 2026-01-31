"use client";

import { UserProvider } from "../Context/UserContext";
import { ExpenseProvider } from "../Context/ExpenseContext";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <ExpenseProvider>{children}</ExpenseProvider>
    </UserProvider>
  );
}
