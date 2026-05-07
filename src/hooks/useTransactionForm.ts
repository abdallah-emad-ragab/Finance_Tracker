import { useEffect, useState } from "react";
import { useTransactionsContext } from "../context/transactionsContext.js";
import { categories } from "../utils/categories.js";

export default function useTransactionForm() {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [transactionType, setTransactionType] = useState<"income" | "outcome">("income");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const [note, setNote] = useState("");
    const [messageAlert, setMessageAlert] = useState({ type: "", message: "" });

    const { addTransaction, totals } = useTransactionsContext();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            // Check if balance is sufficient for outcome transactions
            const amountValue = Number(amount);
            if (transactionType === "outcome" && amountValue > totals.balance) {
                throw new Error("Insufficient balance!")
            }

            // Handle form submission logic here using local storage
            const newTransaction = {
                id: Date.now(),
                title: title.trim(),
                amount: Number(amount),
                type: transactionType,
                category: `${transactionType} : ${category}`,
                date,
                note: note.trim(),
            };
            addTransaction(newTransaction);

            // Show success message
            setMessageAlert({ type: "success", message: "Transaction added successfully!" });

            // Reset form fields after submission
            setTitle("");
            setAmount("");
            setTransactionType("income");
            setCategory("");
            setDate("");
            setNote("");

        } catch (error: any) {
            const errorMessage = error.message === "Insufficient balance!" ? "You don't have enough balance for this transaction." : "Failed to add transaction.";
            setMessageAlert({ type: "error", message: errorMessage });
        }
    };

    useEffect(() => {
        // Set default category based on transaction type
        if (transactionType && categories[transactionType]) {
            const firstCategory = categories[transactionType][0];
            if (firstCategory) {
                setCategory(firstCategory.value);
            }
        }
    }, [transactionType]);

    return { transactionType, setTransactionType, handleSubmit, title, setTitle, amount, setAmount, category, setCategory, date, setDate, note, setNote, messageAlert, setMessageAlert };
};