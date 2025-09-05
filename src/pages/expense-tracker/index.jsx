import { useState } from "react";
import useAddTransaction from "../../hooks/useAddTransaction";
import useGetTransactions from "../../hooks/useGetTransactions";
import useGetUserInfo from "../../hooks/useGetUserInfo";
import { Navigate, useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import "./styles.css";

function ExpenseTracker() {
  const { addTransaction } = useAddTransaction();
  const { transactions, balanceTransactions } = useGetTransactions();
  const { name, profilePhoto } = useGetUserInfo();
  const navigate = useNavigate();

  const { balance, totalExpense, totalIncome } = balanceTransactions;

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");
  const [transactionType, setTransactionType] = useState("expense");

  const handleSubmit = async (e) => {
    e.preventDefault();

    addTransaction({ description, transactionAmount, transactionType });

    setDescription("");
    setTransactionAmount("");
    setTransactionType("expense");
  };

  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (!localStorage.getItem("auth")) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="expense-tracker">
        <div className="container">
          <h1>{name}'s Expense Tracker</h1>

          <div className="balance">
            <h3>Your balance</h3>
            {balance >= 0 ? (
              <h2 style={{ color: "green" }}>${balance}</h2>
            ) : (
              <h2 style={{ color: "red" }}>-${balance*-1}</h2>
            )}
          </div>

          <div className="summary">
            <div className="income">
              <h4>Income</h4>
              <p>${totalIncome}</p>
            </div>

            <div className="expenses">
              <h4>Expenses</h4>
              <p>${totalExpense}</p>
            </div>
          </div>

          <form className="add-transaction" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Description"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="number"
              placeholder="Amount"
              value={transactionAmount}
              required
              onChange={(e) => setTransactionAmount(Number(e.target.value))}
            />

            <input
              type="radio"
              id="expense"
              value="expense"
              checked={transactionType === "expense"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="expense">Expense</label>

            <input
              type="radio"
              id="income"
              value="income"
              checked={transactionType === "income"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="income">Income</label>

            <button type="submit">Add Transaction</button>
          </form>
        </div>

        {profilePhoto && (
          <div className="profile">
            {" "}
            <img className="profile-photo" src={profilePhoto} />
            <button className="sign-out-button" onClick={signUserOut}>
              Sign Out
            </button>
          </div>
        )}
      </div>

      <div className="transactions">
        <h3>Transactions</h3>
        <ul>
          {transactions.map((transaction, index) => {
            const { description, transactionAmount, transactionType } =
              transaction;
            return (
              <li key={index}>
                <h4> {description} </h4>
                <p>
                  ${transactionAmount} •{" "}
                  <label
                    style={{
                      color: transactionType === "expense" ? "red" : "green",
                    }}
                  >
                    {" "}
                    {transactionType}{" "}
                  </label>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default ExpenseTracker;
