import useTransactionsSummary, { type Tsort } from "../../hooks/useTransactionsSummary.js";

export default function TransactionsSummary() {
    const { showModal, setShowModal, transactionIdToDelete, setTransactionIdToDelete, myTransactions, deleteTransaction, searchTerm, setSearchTerm, filterType, setFilterType, sortBy, setSortBy, filteredTransactions } = useTransactionsSummary();

    return (
        <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Transactions Summary</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {/* Search */}
                <input type="text" className="p-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search transactions..." />
                {/* Filter */}
                <select className="p-2 border rounded-xl outline-none" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                    <option value={"all"}>All Types</option>
                    <option value={"income"}>Income Only</option>
                    <option value={"outcome"}>Outcome Only</option>
                </select>
                {/* Sort */}
                <select className="p-2 border rounded-xl outline-none" value={sortBy} onChange={(e) => setSortBy(e.target.value as Tsort)}>
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="highest">Highest Amount</option>
                    <option value="lowest">Lowest Amount</option>
                </select>
            </div>

            <div className="space-y-4">
                {myTransactions.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-3">
                        <i className="fa-solid fa-file-invoice-dollar text-3xl text-gray-300 mx-auto" />
                        <p className="text-gray-500 text-center py-10">No transactions.</p>
                    </div>
                ) : filteredTransactions.length === 0 ? (
                    <p className="text-gray-500 text-center py-10">No transactions match your search.</p>
                ) : filteredTransactions.map((transaction) => (
                    <div key={transaction.id} className={`flex flex-col bg-gray-200 ${transaction.type === "income" ? "border-l-4 border-green-500" : "border-l-4 border-red-500"} p-4 my-2 rounded-2xl`}>
                        {/* Upper Row: Title, Amount, and Trash */}
                        <div className="flex justify-between items-center w-full">
                            {/* Title and Date */}
                            <div className="flex-1">
                                <p className="font-bold text-gray-800">{transaction.title}</p>
                                <p className="text-xs text-gray-500 uppercase tracking-wider">{transaction.date}</p>
                            </div>

                            {/* Amount and Category */}
                            <div className="flex-1 text-center">
                                <p className={`font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                                    {transaction.amount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                                </p>
                                <p className="text-xs text-gray-500 uppercase tracking-wider">
                                    {transaction.category.split(":")[1]?.trim()}
                                </p>
                            </div>

                            {/* Trash Button */}
                            <div className="flex-none ml-4">
                                <button
                                    className="w-10 h-10 flex items-center justify-center bg-white text-red-500 hover:bg-red-50 hover:text-red-700 rounded-full shadow-sm transition-colors cursor-pointer"
                                    onClick={() => {
                                        setShowModal(true);
                                        setTransactionIdToDelete(transaction.id);
                                    }}
                                >
                                    <i className="fa-solid fa-trash-can"></i>
                                </button>
                            </div>
                        </div>

                        {/* Note (Bottom) */}
                        {transaction.note && (
                            <div className="mt-3 bg-white/50 p-3 rounded-xl border border-gray-100">
                                <div className="flex items-start gap-2 text-gray-600">
                                    <i className="fa-solid fa-quote-left text-[10px] mt-1 opacity-50"></i>
                                    <p className="text-sm italic flex-1">{transaction.note}</p>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>


            {/* Modal for deleting a transaction */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop with subtle blur effect */}
                    <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity cursor-default"
                        onClick={() => setShowModal(false)} />

                    {/* Modal Content Container */}
                    <div className="relative bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl transform transition-all scale-100">

                        {/* Warning Icon Container */}
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 mb-6">
                            <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                            </svg>
                        </div>

                        {/* Text Content Section */}
                        <div className="text-center">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Transaction?</h3>
                            <p className="text-sm text-gray-500 mb-8 leading-relaxed">
                                Are you sure you want to delete this transaction? This action is permanent and cannot be undone.
                            </p>
                        </div>

                        {/* Action Buttons Section */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:justify-center">
                            <button className="order-2 sm:order-1 flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors cursor-pointer"
                                onClick={() => setShowModal(false)}> Cancel </button>
                            <button className="order-1 sm:order-2 flex-1 px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 shadow-lg shadow-red-200 transition-all active:scale-95 cursor-pointer"
                                onClick={() => {
                                    deleteTransaction(transactionIdToDelete!);
                                    setShowModal(false);
                                }}>Delete Now</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}