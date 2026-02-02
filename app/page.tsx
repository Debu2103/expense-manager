"use client";

import { useState } from "react";
import UserForm from "./Components/Users/UserForm";
import UserTable from "./Components/Users/UserTable";

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  return (
    <main style={{ padding: "24px", backgroundColor: "#f8f8f8", minHeight: "100vh" }}>
      <header style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <div>
            <h1 style={{ margin: "0 0 8px 0", fontSize: "28px", fontWeight: "600", color: "#1a1a1a" }}>Users</h1>
            <p style={{ margin: "0", color: "#666", fontSize: "14px" }}>Manage users and their expenses</p>
          </div>
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
              letterSpacing: "0.5px"
            }}
          >
            + Add User
          </button>
        </div>
      </header>

      <section style={{ 
        backgroundColor: "white", 
        borderRadius: "8px", 
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        overflow: "hidden"
      }}>
        <UserTable />
      </section>

      {showModal && (
        <UserForm isModal onClose={() => setShowModal(false)} />
      )}
    </main>
  );
}
