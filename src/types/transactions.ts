export type Transaction = {
    id: number;
    type: "income" | "outcome";
    title: string;
    amount: number;
    category: string;
    date: string;
    note?: string;
}