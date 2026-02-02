import AppProviders from "./Providers/AppProviders";

export const metadata = {
  title: "Expense Manager",
  description: "User Management & Expense Manager Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <style>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: system-ui, -apple-system, sans-serif;
            background-color: #f5f5f5;
            color: #333;
          }
          
          table {
            width: 100%;
            border-collapse: collapse;
            background: white;
          }
          
          table thead {
            background-color: #f0f0f0;
          }
          
          table th, table td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
          }
          
          table tbody tr:hover {
            background-color: #f9f9f9;
          }
          
          form {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }
          
          input, select, textarea {
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-family: inherit;
            font-size: 14px;
          }
          
          input:focus, select:focus, textarea:focus {
            outline: none;
            border-color: #0066cc;
            box-shadow: 0 0 0 2px rgba(0, 102, 204, 0.1);
          }
          
          button {
            padding: 10px 16px;
            background-color: #0066cc;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            transition: background-color 0.2s;
          }
          
          button:hover {
            background-color: #0052a3;
          }
          
          button:active {
            transform: scale(0.98);
          }
          
          a {
            text-decoration: none;
            color: #0066cc;
          }
          
          a:hover {
            text-decoration: underline;
          }
        `}</style>
      </head>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
