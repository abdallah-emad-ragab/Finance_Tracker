import { useMemo, useState } from "react";
import { useTransactionsContext } from "../context/transactionsContext.js";

export type Tsort = "newest" | "oldest" | "highest" | "lowest";

export default function useTransactionsSummary() {
    const { myTransactions, deleteTransaction } = useTransactionsContext();

    // Search, Filter & Sort
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("all");
    const [sortBy, setSortBy] = useState<Tsort>("newest");

    // Other States
    const [showModal, setShowModal] = useState(false);
    const [transactionIdToDelete, setTransactionIdToDelete] = useState<number | null>(null);

    // Search, Filter & Sort Logic, We used useMemo for performance
    const filteredTransactions = useMemo(() => {
        return myTransactions
            // Search Logic
            .filter((item) => item.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
            // Filter Logic
            .filter((item) => (filterType === "all" ? true : filterType === "income" ? item.type === "income" : item.type === "outcome"))
            // Sort Logic
            .sort((a, b) => {
                if (sortBy === "newest") return new Date(b.date).getTime() - new Date(a.date).getTime();
                if (sortBy === "oldest") return new Date(a.date).getTime() - new Date(b.date).getTime();
                if (sortBy === "highest") return b.amount - a.amount;
                if (sortBy === "lowest") return a.amount - b.amount;
                return 0;
            })
    }, [myTransactions, searchTerm, filterType, sortBy]);

    return { showModal, setShowModal, transactionIdToDelete, setTransactionIdToDelete, myTransactions, deleteTransaction, searchTerm, setSearchTerm, filterType, setFilterType, sortBy, setSortBy, filteredTransactions };
};