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
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
            background-color: #f8f8f8;
            color: #1a1a1a;
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
            padding: 14px 12px;
            text-align: left;
            border-bottom: 1px solid #e0e0e0;
            font-size: 14px;
          }
          
          table tbody tr:hover {
            background-color: #f9f9f9;
          }
          
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
          }
          
          .modal-content {
            background: white;
            border-radius: 8px;
            padding: 32px;
            max-width: 480px;
            width: 90%;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            position: relative;
          }
          
          .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24px;
          }
          
          .modal-title {
            font-size: 18px;
            font-weight: 600;
            color: #1a1a1a;
            margin: 0;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          
          .modal-close {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #999;
            padding: 0;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .modal-close:hover {
            color: #333;
          }
          
          .form-group {
            display: flex;
            flex-direction: column;
            gap: 8px;
            margin-bottom: 20px;
          }
          
          .form-label {
            font-size: 12px;
            font-weight: 600;
            color: #666;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          
          input, select, textarea {
            padding: 12px 14px;
            border: 1px solid #e0e0e0;
            border-radius: 6px;
            font-family: inherit;
            font-size: 14px;
            background-color: #f8f8f8;
            color: #1a1a1a;
            transition: border-color 0.2s;
          }
          
          input:focus, select:focus, textarea:focus {
            outline: none;
            border-color: #1a1a1a;
            background-color: white;
          }
          
          .form-actions {
            display: flex;
            gap: 12px;
            justify-content: flex-end;
            margin-top: 28px;
          }
          
          button {
            padding: 12px 24px;
            background-color: #1a1a1a;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
            transition: background-color 0.2s;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          
          button:hover {
            background-color: #333;
          }
          
          button:active {
            transform: scale(0.98);
          }
          
          .btn-secondary {
            background-color: transparent;
            color: #1a1a1a;
            border: 1px solid #e0e0e0;
          }
          
          .btn-secondary:hover {
            background-color: #f8f8f8;
          }
          
          a {
            text-decoration: none;
            color: #1a1a1a;
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
