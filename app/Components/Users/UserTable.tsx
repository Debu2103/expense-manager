"use client";

import Link from "next/link";
import { useUsers } from "../../Context/UserContext";
import { useState } from "react";
import UserForm from "./UserForm";

export default function UserTable() {
  const { users, deleteUser, selectUser } = useUsers();
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<any>(null);

  const handleDelete = (id: string) => {
    if (deleteConfirm === id) {
      deleteUser(id);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(id);
    }
  };

  const handleEdit = (user: any) => {
    selectUser(user);
    setEditingUser(user);
  };

  const handleCloseEdit = () => {
    setEditingUser(null);
    selectUser(null);
  };

  if (users.length === 0) {
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "#999" }}>
        <p style={{ fontSize: "14px", margin: "0" }}>
          No users found. Add a new user to get started.
        </p>
      </div>
    );
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th style={{ width: "250px" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => {
            const name = `${u.fname} ${u.lname}`;
            const isConfirming = deleteConfirm === u.id;

            return (
              <tr key={u.id}>
                <td>{name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  <button
                    onClick={() => handleEdit(u)}
                    style={{
                      marginRight: "8px",
                      padding: "8px 12px",
                      fontSize: "13px",
                    }}
                  >
                    Edit
                  </button>
                  <Link
                    href={`/expense-manager/${u.id}`}
                    style={{
                      display: "inline-block",
                      padding: "8px 12px",
                      marginRight: "8px",
                      fontSize: "13px",
                      backgroundColor: "#f0f0f0",
                      border: "1px solid #e0e0e0",
                      borderRadius: "6px",
                      color: "#1a1a1a",
                      cursor: "pointer",
                    }}
                  >
                    Expenses
                  </Link>
                  <button
                    onClick={() => handleDelete(u.id)}
                    style={{
                      padding: "8px 12px",
                      fontSize: "13px",
                      color: isConfirming ? "white" : "#1a1a1a",
                      backgroundColor: isConfirming ? "#d32f2f" : "#f0f0f0",
                      border: isConfirming ? "none" : "1px solid #e0e0e0",
                    }}
                  >
                    {isConfirming ? "Confirm Delete?" : "Delete"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {editingUser && <UserForm isModal onClose={handleCloseEdit} />}
    </>
  );
}
