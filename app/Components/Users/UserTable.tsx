"use client";

import Link from "next/link";
import { useUsers } from "../../Context/UserContext";

export default function UserTable() {
  const { users, deleteUser, selectUser } = useUsers();

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {users.map((u) => {
          const name = `${u.fname} ${u.lname}`;

          return (
            <tr key={u.id}>
              <td>{name}</td>
              <td>{u.email}</td>
              <td>
                <button onClick={() => selectUser(u)}>Edit</button>
                <button onClick={() => deleteUser(u.id)}>Delete</button>
                <Link href={`/expense-manager/${u.id}`}>Expense</Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
