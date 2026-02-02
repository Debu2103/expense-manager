"use client";

import Link from "next/link";
import ExpenseForm from "../../Components/Expenses/ExpenseForm";
import ExpenseTable from "../../Components/Expenses/ExpenseTable";
import { useUsers } from "../../Context/UserContext";
import { useEffect, useState } from "react";
import { use } from "react";

export default function ExpenseManager({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = use(params);
  const { users } = useUsers();
  const [user, setUser] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const foundUser = users.find((u) => u.id === userId);
    setUser(foundUser);
  }, [userId, users]);

  return (
    <main
      style={{
        padding: "24px",
        backgroundColor: "#f8f8f8",
        minHeight: "100vh",
      }}
    >
      <header style={{ marginBottom: "32px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <div>
            <h1
              style={{
                margin: "0 0 8px 0",
                fontSize: "28px",
                fontWeight: "600",
                color: "#1a1a1a",
              }}
            >
              Expenses
            </h1>
            <p style={{ margin: "0", color: "#666", fontSize: "14px" }}>
              {user ? `For ${user.fname} ${user.lname}` : "Expense Management"}
            </p>
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={() => setShowModal(true)}
              style={{
                padding: "10px 20px",
                backgroundColor: "#1a1a1a",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "600",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              + Add Expense
            </button>
            <Link
              href="/"
              style={{
                padding: "10px 20px",
                backgroundColor: "#f0f0f0",
                color: "#1a1a1a",
                textDecoration: "none",
                border: "1px solid #e0e0e0",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "600",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                display: "inline-block",
              }}
            >
              Back to Users
            </Link>
          </div>
        </div>
      </header>

      <section
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          overflow: "hidden",
        }}
      >
        <ExpenseTable userId={userId} />
      </section>

      {showModal && (
        <ExpenseForm
          userId={userId}
          isModal
          onClose={() => setShowModal(false)}
        />
      )}
    </main>
  );
}
