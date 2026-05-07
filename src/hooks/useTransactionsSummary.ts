import { useState } from "react";
import { useTransactionsContext } from "../context/transactionsContext.js";

export default function useTransactionsSummary() {
    const [showModal, setShowModal] = useState(false);
    const [transactionIdToDelete, setTransactionIdToDelete] = useState<number | null>(null);

    const { myTransactions, deleteTransaction } = useTransactionsContext();

    return { showModal, setShowModal, transactionIdToDelete, setTransactionIdToDelete, myTransactions, deleteTransaction };
}