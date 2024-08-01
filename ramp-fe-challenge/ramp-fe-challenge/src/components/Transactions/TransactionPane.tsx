import { useState, useEffect } from "react";
import { fetchTransactions, fetchMoreTransactions } from "../api";
import { TransactionPane } from "./TransactionPane";

export const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const initialTransactions = await fetchTransactions();
      setTransactions(initialTransactions);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleViewMore = async () => {
    setLoading(true);
    const newTransactions = await fetchMoreTransactions();
    setTransactions((prevTransactions) => [
      ...prevTransactions,
      ...newTransactions,
    ]);
    setLoading(false);
  };

  return (
    <div>
      {transactions.map((transaction) => (
        <TransactionPane
          key={transaction.id}
          transaction={transaction}
          loading={loading}
          setTransactionApproval={setTransactionApproval}
        />
      ))}
      <button onClick={handleViewMore} disabled={loading}>
        {loading ? "Loading..." : "View More"}
      </button>
    </div>
  );
};

const setTransactionApproval = async ({ transactionId, newValue }) => {
  
  console.log(`Setting transaction ${transactionId} approval to ${newValue}`);
};
