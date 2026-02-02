"use client";

import Link from "next/link";
import { useUsers } from "../../Context/UserContext";
import { useState } from "react";

export default function UserTable() {
  const { users, deleteUser, selectUser } = useUsers();
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    if (deleteConfirm === id) {
      deleteUser(id);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(id);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
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
                <button onClick={() => selectUser(u)}>Edit</button>
                <Link href={`/expense-manager/${u.id}`}>Expenses</Link>
                <button
                  onClick={() => handleDelete(u.id)}
                  style={{ color: isConfirming ? "red" : "black" }}
                >
                  {isConfirming ? "Confirm Delete?" : "Delete"}
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
