import { useTransactionsContext } from "../../context/transactionsContext.js";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function TransactionsVisuals() {
    const { myTransactions } = useTransactionsContext();

    // Helper function to process data based on transaction type
    const prepareData = (type: "income" | "outcome") => {
        return myTransactions
            .filter((t) => t.type === type)
            .reduce((acc: any[], curr) => {
                const categoryName = curr.category.split(":")[1]?.trim() || "Other";
                const existing = acc.find((item) => item.name === categoryName);
                if (existing) {
                    existing.value += curr.amount;
                } else {
                    acc.push({ name: categoryName, value: curr.amount });
                }
                return acc;
            }, []);
    };

    const incomeData = prepareData("income");
    const expenseData = prepareData("outcome");

    // Professional Color Palettes
    const INCOME_COLORS = ["#10b981", "#34d399", "#6ee7b7", "#059669"]; // Green Shades
    const EXPENSE_COLORS = ["#ef4444", "#f87171", "#fb923c", "#fca5a5"]; // Red/Orange Shades

    // Custom Tooltip for a better Look
    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-100">
                    <p className="font-bold text-gray-800">{payload[0].name}</p>
                    <p className="text-blue-600">${payload[0].value.toLocaleString()}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Financial Analytics</h2>
            
            {/* Grid Layout: Side by Side on large screens, Stacked on mobile */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                {/* Income Chart Section */}
                <div className="flex flex-col items-center">
                    <h3 className="text-lg font-semibold text-green-600 mb-4">Income Distribution</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={incomeData}
                                    innerRadius={70}
                                    outerRadius={90}
                                    paddingAngle={8}
                                    dataKey="value"
                                >
                                    {incomeData.map((_, index) => (
                                        <Cell key={`income-cell-${index}`} fill={INCOME_COLORS[index % INCOME_COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                                <Legend verticalAlign="bottom" height={36}/>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Vertical Divider for Large Screens */}
                <div className="hidden lg:block absolute left-1/2 h-64 border-l border-gray-100"></div>

                {/* Expense Chart Section */}
                <div className="flex flex-col items-center">
                    <h3 className="text-lg font-semibold text-red-600 mb-4">Expense Breakdown</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={expenseData}
                                    innerRadius={70}
                                    outerRadius={90}
                                    paddingAngle={8}
                                    dataKey="value"
                                >
                                    {expenseData.map((_, index) => (
                                        <Cell key={`expense-cell-${index}`} fill={EXPENSE_COLORS[index % EXPENSE_COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                                <Legend verticalAlign="bottom" height={36}/>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Bottom Note or Summary can go here */}
            {incomeData.length === 0 && expenseData.length === 0 && (
                <p className="text-center text-gray-400 mt-4 italic">Add transactions to generate your visual report.</p>
            )}
        </div>
    );
}