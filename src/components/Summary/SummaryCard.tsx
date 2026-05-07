interface SummaryCardProps {
    title: string;
    amount: number;
    type: "balance" | "income" | "outcome";
}

export default function SummaryCard({ title, amount, type }: SummaryCardProps) {
    return (
        <div className={`grow shrink p-4 rounded-2xl text-white ${type === "balance" ? "bg-gray-900" : type === "income" ? "bg-green-500" : "bg-red-500"}`}>
            <h3 className={"text-sm font-medium text-white mb-1"}>{title}</h3>
            <p className="text-3xl font-bold">{amount.toLocaleString("en-US", { style: "currency", currency: "USD" })}</p>
        </div>
    )
}