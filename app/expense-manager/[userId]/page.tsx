import ExpenseForm from "../../Components/Expenses/ExpenseForm";
import ExpenseTable from "../../Components/Expenses/ExpenseTable";

export default async function ExpenseManager({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;

  return (
    <main>
      <h2>Expense Manager</h2>

      {/* User-specific expense actions */}
      <ExpenseForm userId={userId} />
      <ExpenseTable userId={userId} />
    </main>
  );
}
