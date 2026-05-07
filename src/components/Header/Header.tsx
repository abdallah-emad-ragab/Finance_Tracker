export default function Header() {
    return (
        <div className="flex flex-start items-center gap-2 border-b border-gray-300 pb-4 mb-4">
            <i className="fa-solid fa-coins text-2xl text-green-500"></i>
            <div className="flex flex-col">
                <h1 className="text-2xl font-bold">FinanceTracker</h1>
                <p className="text-sm text-gray-500">Track your expenses and income</p>
            </div>
        </div>
    )
}