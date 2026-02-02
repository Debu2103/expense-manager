"use client";

import Link from "next/link";
import { useState } from "react";
import { useUsers } from "../../Context/UserContext";
import { User } from "../../Types/Users";

export default function UserTable() {
  const { users, deleteUser, selectUser } = useUsers();
  const [selectedUserDetails, setSelectedUserDetails] = useState<User | null>(
    null
  );
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    deleteUser(id);
    setConfirmDelete(null);
  };

  return (
    <>
      <table className="w-full border-collapse border border-gray-300 mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Role</th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => {
            const name = `${u.fname} ${u.lname}`;

            return (
              <tr key={u.id}>
                <td className="border border-gray-300 px-4 py-2">{name}</td>
                <td className="border border-gray-300 px-4 py-2">{u.email}</td>
                <td className="border border-gray-300 px-4 py-2">{u.role}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => setSelectedUserDetails(u)}
                    className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600"
                  >
                    View
                  </button>
                  <button
                    onClick={() => selectUser(u)}
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setConfirmDelete(u.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded mr-2 hover:bg-red-600"
                  >
                    Delete
                  </button>
                  <Link
                    href={`/expense-manager/${u.id}`}
                    className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600 inline-block"
                  >
                    Expense Manager
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* View User Details Modal */}
      {selectedUserDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
            <h2 className="text-2xl font-bold mb-4">User Details</h2>
            <p className="mb-2">
              <strong>Name:</strong> {selectedUserDetails.fname}{" "}
              {selectedUserDetails.lname}
            </p>
            <p className="mb-2">
              <strong>Email:</strong> {selectedUserDetails.email}
            </p>
            <p className="mb-4">
              <strong>Role:</strong> {selectedUserDetails.role}
            </p>
            <button
              onClick={() => setSelectedUserDetails(null)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
            <h2 className="text-2xl font-bold mb-4">Confirm Delete</h2>
            <p className="mb-6">
              Are you sure you want to delete this user? This action cannot be
              undone.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => handleDelete(confirmDelete)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex-1"
              >
                Delete
              </button>
              <button
                onClick={() => setConfirmDelete(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 flex-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
