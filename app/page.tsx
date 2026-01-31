import UserForm from "./Components/Users/UserForm";
import UserTable from "./Components/Users/UserTable";

export default function Home() {
  return (
    <main>
      <h1>User Management</h1>
      <UserForm />
      <UserTable />
    </main>
  );
}
