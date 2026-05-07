import { useTransactionsContext } from "../../context/transactionsContext.js";
import SummaryCard from "./SummaryCard.js";

export default function Summary() {
    const { totals } = useTransactionsContext();

    return (
        <div className="flex flex-wrap md:flex-nowrap gap-6">
            <div className="w-full md:w-1/3">
                <SummaryCard title="Balance" amount={totals.balance} type="balance" />
            </div>
            <SummaryCard title="Income" amount={totals.income} type="income" />
            <SummaryCard title="Outcome" amount={totals.outcome} type="outcome" />
        </div>
    )
}