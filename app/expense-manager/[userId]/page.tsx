"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import ExpenseForm from "../../Components/Expenses/ExpenseForm";
import ExpenseTable from "../../Components/Expenses/ExpenseTable";
import { useUsers } from "../../Context/UserContext";
import { useEffect, useState } from "react";

export default function ExpenseManager({
  params,
}: {
  params: { userId: string };
}) {
  const router = useRouter();
  const { users } = useUsers();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const foundUser = users.find((u) => u.id === params.userId);
    setUser(foundUser);
  }, [params.userId, users]);

  if (!user) {
    return (
      <main style={{ padding: "20px", fontFamily: "system-ui, -apple-system, sans-serif" }}>
        <p>User not found</p>
        <Link href="/" style={{ color: "#0066cc" }}>
          Back to Users
        </Link>
      </main>
    );
  }

  return (
    <main style={{ padding: "20px", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <header style={{ marginBottom: "30px", borderBottom: "2px solid #333", paddingBottom: "15px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ margin: "0 0 10px 0", fontSize: "28px" }}>💰 Expense Manager</h1>
            <p style={{ margin: "0", color: "#666", fontSize: "14px" }}>
              Managing expenses for <strong>{user.fname} {user.lname}</strong>
            </p>
          </div>
          <Link 
            href="/" 
            style={{ 
              padding: "8px 16px", 
              backgroundColor: "#0066cc", 
              color: "white", 
              textDecoration: "none",
              borderRadius: "4px"
            }}
          >
            ← Back to Users
          </Link>
        </div>
      </header>

      <section style={{ marginBottom: "40px" }}>
        <h2 style={{ fontSize: "20px", marginBottom: "15px" }}>Add New Expense</h2>
        <div style={{ 
          border: "1px solid #ddd", 
          padding: "20px", 
          borderRadius: "8px", 
          backgroundColor: "#f9f9f9" 
        }}>
          <ExpenseForm userId={params.userId} />
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: "20px", marginBottom: "15px" }}>Expenses History</h2>
        <div style={{ 
          overflowX: "auto", 
          border: "1px solid #ddd", 
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}>
          <ExpenseTable userId={params.userId} />
        </div>
      </section>
    </main>
  );
}
