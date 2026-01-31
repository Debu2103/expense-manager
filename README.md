# Expense Manager

A modern web application for managing users and tracking their expenses. Built with Next.js, React, and TypeScript with real-time state management and form validation.

## Features

### User Management

- **Add Users**: Create new users with detailed information (name, email, gender, address, phone number)
- **View Users**: Display all users in a responsive table format
- **Edit Users**: Update existing user information
- **Delete Users**: Remove users from the system
- **User Navigation**: Quick access to individual user expense managers

### Expense Management

- **Add Expenses**: Create expense entries for specific users with title, amount, date, and description
- **View Expenses**: Display all expenses for a specific user in an organized table
- **User-Isolated View**: Each user sees only their own expenses when accessing the expense manager
- **Delete Expenses**: Remove expense entries
- **Expense Tracking**: Track expenses by user ID with proper data organization

### Technical Features

- Built with **Next.js 16** with App Router
- **React Context API** for state management (UserContext and ExpenseContext)
- **Form Validation** using Formik and Yup
- **TypeScript** for type safety
- **Tailwind CSS** for responsive styling
- **Dynamic Routing** for user-specific expense pages

## Project Structure

```
├── app/
│   ├── Components/
│   │   ├── Expenses/
│   │   │   ├── ExpenseForm.tsx      # Add/Edit expense form
│   │   │   └── ExpenseTable.tsx     # Display user expenses
│   │   └── Users/
│   │       ├── UserForm.tsx         # Add/Edit user form
│   │       └── UserTable.tsx        # Display all users with navigation
│   ├── Context/
│   │   ├── UserContext.tsx          # User state management
│   │   └── ExpenseContext.tsx       # Expense state management (organized by userId)
│   ├── Providers/
│   │   └── AppProviders.tsx         # Context providers wrapper
│   ├── Types/
│   │   ├── Users.ts                 # User interface
│   │   └── Expense.ts               # Expense interface
│   ├── expense-manager/
│   │   └── [userId]/
│   │       └── page.tsx             # User-specific expense manager page
│   ├── layout.tsx                   # Root layout
│   └── page.tsx                     # Home/User management page
└── package.json
```

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Debu2103/expense-manager.git
   cd expense-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## Running the Project

### Development Mode

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Production Build

Build for production:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

## Usage

### 1. Create Users

- Navigate to the home page (`/`)
- Fill in the user form with first name, last name, email, gender, address, and phone number
- Click "Add User" to create a new user
- The user will appear in the users table below

### 2. Manage Expenses

- Click on a user's name in the table to navigate to their expense manager
- The URL will be `/expense-manager/[userId]`
- Add expenses using the expense form with title, amount, date, and optional description
- View all expenses for that specific user in the expense table
- Delete expenses as needed

### 3. View All Users

- Return to the home page to see all users
- Edit or delete user information directly from the table

## Technologies Used

- **Framework**: [Next.js 16](https://nextjs.org) - React framework with App Router
- **UI Library**: [React 19.2.3](https://react.dev)
- **Language**: [TypeScript](https://www.typescriptlang.org)
- **State Management**: React Context API
- **Form Validation**: [Formik](https://formik.org) + [Yup](https://github.com/jquense/yup)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com)
- **Linting**: [ESLint](https://eslint.org)

## Data Storage

The application uses React Context API for state management. All user and expense data is stored in memory and will be reset when the page is refreshed.

**Note**: For production use, consider integrating a backend database (PostgreSQL, MongoDB, Firebase, etc.) to persist data.

## Key Implementation Details

- **Expense Filtering**: Expenses are organized by userId in the context, ensuring each user only sees their own expenses
- **Dynamic Routes**: The expense manager uses dynamic routing (`[userId]`) to create user-specific pages
- **Form Validation**: Both user and expense forms use Formik with Yup schemas for client-side validation
- **Type Safety**: Full TypeScript implementation ensures type safety across components

## Future Enhancements

- Database integration (PostgreSQL, MongoDB, or Supabase) for persistent data storage
- User authentication and authorization
- Expense categories and advanced filtering
- Expense statistics, charts, and analytics
- Export expenses to PDF/CSV
- Multi-currency support
- Recurring expenses
- Expense sharing and splitting
- Mobile app version

## License

This project is open source and available under the MIT License.

## Author

[Debu2103](https://github.com/Debu2103)

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.
