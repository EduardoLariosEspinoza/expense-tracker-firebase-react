import React, { useState } from "react";
import useAddTransaction from "../../hooks/useAddTransaction";

function ExpenseTracker() {
  const { addTransaction } = useAddTransaction();

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");

  return (
    <>
      <div className="expense-tracker">
        <div className="container">
          <h1>Expense Tracker</h1>

          <div className="balance">
            <h3>Your balance</h3>
            <h2>$0.00</h2>
          </div>

          <div className="summary">
            <div className="income">
              <h4>Income</h4>
              <p>$0.00</p>
            </div>

            <div className="expenses">
              <h4>Expenses</h4>
              <p>$0.00</p>
            </div>
          </div>

          <form className="add-transaction">
            <input
              type="text"
              placeholder="Description"
              required
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="number"
              placeholder="Amount"
              required
              onChange={(e) => setTransactionAmount(Number(e.target.value))}
            />

            <input
              type="radio"
              id="expense"
              value="expense"
              defaultChecked
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="expense">Expense</label>

            <input
              type="radio"
              id="income"
              value="income"
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="income">Income</label>

            <button type="submit">Add Transaction</button>
          </form>
        </div>
      </div>

      <div className="transactions">
        <h3>Transactions</h3>
      </div>
    </>
  );
}

export default ExpenseTracker;
