import UserForm from "./Components/Users/UserForm";
import UserTable from "./Components/Users/UserTable";

export default function Home() {
  return (
    <main style={{ padding: "20px", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <header style={{ marginBottom: "30px", borderBottom: "2px solid #333", paddingBottom: "15px" }}>
        <h1 style={{ margin: "0 0 10px 0", fontSize: "28px" }}>👤 User Management</h1>
        <p style={{ margin: "0", color: "#666", fontSize: "14px" }}>Manage users and their expenses</p>
      </header>

      <section style={{ marginBottom: "40px" }}>
        <h2 style={{ fontSize: "20px", marginBottom: "15px" }}>Add New User</h2>
        <div style={{ 
          border: "1px solid #ddd", 
          padding: "20px", 
          borderRadius: "8px", 
          backgroundColor: "#f9f9f9" 
        }}>
          <UserForm />
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: "20px", marginBottom: "15px" }}>Users List</h2>
        <div style={{ 
          overflowX: "auto", 
          border: "1px solid #ddd", 
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}>
          <UserTable />
        </div>
      </section>
    </main>
  );
}
