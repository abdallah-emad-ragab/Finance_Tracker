import { useEffect } from "react";
import useTransactionForm from "../../hooks/useTransactionForm.js";
import { categories } from "../../utils/categories.js";

function TransactionForm() {
    const { handleSubmit, transactionType, setTransactionType, title, setTitle, amount, setAmount, category, setCategory, date, setDate, note, setNote, messageAlert, setMessageAlert } = useTransactionForm();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (messageAlert) {
                setMessageAlert({ type: "", message: "" });
            }
        }, 3000);
        return () => clearTimeout(timer);
    }, [messageAlert]);

    return (
        <div className="space-y-3">
            <form className="transactionForm" onSubmit={handleSubmit}>
                {/* Transaction Title */}
                <div className="transactionContainer">
                    <label className="transactionLabel">Title</label>
                    <input type="text" className="transactionInput" placeholder="e.g. Grocery Shopping" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>

                {/* Transaction Amount */}
                <div className="transactionContainer">
                    <label className="transactionLabel">Amount</label>
                    <input type="number" className="transactionInput" placeholder="e.g. 10.00" value={amount} onChange={(e) => setAmount(e.target.value)} required />
                </div>

                {/* Transaction Type */}
                <div className="transactionContainer">
                    <label className="transactionLabel">Type</label>
                    <select id="transactionType" className="transactionInput" value={transactionType} onChange={(e) => setTransactionType(e.target.value as "income" | "outcome")}>
                        <option value="income">Income</option>
                        <option value="outcome">Outcome</option>
                    </select>
                </div>

                {/* Transaction Category */}
                <div className="transactionContainer">
                    <label className="transactionLabel">Category</label>
                    <select id="transactionCategory" className="transactionInput" value={category} onChange={(e) => setCategory(e.target.value)}>
                        {categories[transactionType].map((category) => (
                            <option key={category.value} value={category.value}>
                                {category.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Transaction Date */}
                <div className="transactionContainer transactionFullWidth">
                    <label className="transactionLabel">Date</label>
                    <input type="date" className="transactionInput" value={date} onChange={(e) => setDate(e.target.value)} required />
                </div>

                {/* Transaction Note */}
                <div className="transactionContainer transactionFullWidth">
                    <label className="transactionLabel">Note</label>
                    <input type="text" className="transactionInput" placeholder="e.g. Grocery Shopping" value={note} onChange={(e) => setNote(e.target.value)} />
                </div>

                {/* Transaction Button */}
                <button className="transactionButton transactionFullWidth">Add Transaction</button>
            </form>

            {/* Modal Message After Submit */}
            {messageAlert.message && (
                <div className={`fixed top-4 right-4 bg-${messageAlert.type === "success" ? "green" : "red"}-500 text-white px-4 py-2 rounded shadow`}>
                    {messageAlert.message}
                </div>
            )}
        </div>
    )
}

export default TransactionForm;