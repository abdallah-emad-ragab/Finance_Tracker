import React, { createContext, useContext } from "react";
import type { Transaction } from "../types/transactions.js";
import useLocalStorage from "../hooks/useLocalStorage.js";

interface TransactionsContextType {
    myTransactions: Transaction[];
    addTransaction: (transaction: Transaction) => void;
    deleteTransaction: (id: number) => void;
    totals: {
        income: number;
        outcome: number;
        balance: number;
    }
};

export const TransactionsContext = createContext<TransactionsContextType | undefined>(undefined);

// Provider component
export function TransactionsProvider({ children }: { children: React.ReactNode }) {
    const { myTransactions, addTransaction, deleteTransaction, totals } = useLocalStorage();

    return React.createElement(
        TransactionsContext.Provider,
        { value: { myTransactions, addTransaction, deleteTransaction, totals } },
        children
    );
};

// Custom hook to use the TransactionsContext
export function useTransactionsContext() {
    const context = useContext(TransactionsContext);

    if (context === undefined) {
        throw new Error("useTransactionsContext must be used inside TransactionsProvider");
    }

    return context;
};