import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";
import useGetUserInfo from "./useGetUserInfo";

function useGetTransactions() {
  const transactionCollectionRef = collection(db, "transactions");
  const [transactions, setTransactions] = useState([]);
  const [balanceTransactions, setBalanceTransactions] = useState({});

  const { userID } = useGetUserInfo();

  const getTransactions = async () => {
    let unsubscribe;

    try {
      const queryTransactions = query(
        transactionCollectionRef,
        where("userID", "==", userID),
        orderBy("createdAt")
      );

      // onSnapshot sets up a real-time listener to the query
      // When an element that matches the query (in this case: where userID == userID) is added, removed or modified,
      //            the callback is called with a snapshot of the current documents that match the query
      // onSnapshot(query, callback)
      unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
        const docs = [];
        let totalIncome = 0;
        let totalExpense = 0;

        // snapshot contains a lot of metadata about the documents, we just want the data and id
        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;

          if (data.transactionType === "income") {
            totalIncome += data.transactionAmount;
          } else {
            totalExpense += data.transactionAmount;
          }

          docs.push({ ...data, id });
        });

        setTransactions(docs);
        setBalanceTransactions({
          balance: totalIncome - totalExpense,
          totalIncome,
          totalExpense,
        });
      });
    } catch (error) {
      console.error("Error fetching transactions: ", error);
    }

    // Cleanup function to unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return { transactions, balanceTransactions };
}

export default useGetTransactions;
