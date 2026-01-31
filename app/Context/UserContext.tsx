"use client";

import { createContext, useContext, useState } from "react";
import { User } from "../Types/Users";

interface UserContextType {
  users: User[];
  selectedUser: User | null;
  addUser: (user: Omit<User, "id">) => void;
  updateUser: (user: User) => void;
  deleteUser: (id: string) => void;
  selectUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const addUser = (user: Omit<User, "id">) => {
    setUsers((prev) => [...prev, { ...user, id: crypto.randomUUID() }]);
  };

  const updateUser = (user: User) => {
    setUsers((prev) => prev.map((u) => (u.id === user.id ? user : u)));
    setSelectedUser(null);
  };

  const deleteUser = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const selectUser = (user: User | null) => {
    setSelectedUser(user);
  };

  return (
    <UserContext.Provider
      value={{
        users,
        selectedUser,
        addUser,
        updateUser,
        deleteUser,
        selectUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUsers = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUsers must be inside UserProvider");
  return ctx;
};
