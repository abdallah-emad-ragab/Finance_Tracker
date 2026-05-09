import Header from "./components/Header/Header.js";
import Summary from "./components/Summary/Summary.js";
import TransactionForm from "./components/TransactionsForm/TransactionForm.js";
import TransactionsSummary from "./components/TransactionsSummary/TransactionsSummary.js";
import TransactionsChart from "./components/TransactionsChart/TransactionsChart.js";
import { TransactionsProvider } from "./context/transactionsContext.js";
import Footer from "./components/Footer/Footer.js";

function App() {
  return (
    <div className="bg-gray-100 min-h-screen w-full">
      <div className="min-h-screen p-6 pb-0 max-w-3xl mx-auto space-y-6">
        <TransactionsProvider>
          <Header />
          <Summary />
          <TransactionForm />
          <TransactionsSummary />
          <TransactionsChart />
          <Footer />
        </TransactionsProvider>
      </div>
    </div>
  )
}

export default App;