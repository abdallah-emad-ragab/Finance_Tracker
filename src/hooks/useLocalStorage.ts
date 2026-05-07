import { useEffect, useMemo, useState } from "react";
import type { Transaction } from "../types/transactions.js";

export default function useLocalStorage() {
    const [myTransactions, setMyTransactions] = useState<Transaction[] | []>(() => {
        const transactions = localStorage.getItem("myTransactions");
        return transactions ? JSON.parse(transactions) : [];
    });

    const addTransaction = (transaction: Transaction) => {
        setMyTransactions((prev) => [transaction, ...prev]);
    }
    const deleteTransaction = (id: number) => {
        setMyTransactions((prev) => prev.filter((transaction) => transaction.id !== id));
    }

    // useMemo to calculate totals only when myTransactions changes so increase performance
    const totals = useMemo(() => {
        return myTransactions.reduce((acc, curr) => {
            if (curr.type === "income") {
                acc.income += Number(curr.amount);
            } else {
                acc.outcome += Number(curr.amount);
            }
            acc.balance = acc.income - acc.outcome;
            return acc;
        }, { income: 0, outcome: 0, balance: 0 });
    }, [myTransactions]);

    useEffect(() => {
        localStorage.setItem("myTransactions", JSON.stringify(myTransactions));
    }, [myTransactions]);

    return { myTransactions, addTransaction, deleteTransaction, totals };
};