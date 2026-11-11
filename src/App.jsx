import { useState } from 'react'

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

function App() {
  const [amount, setAmount] = useState('')
  const [percent, setPercent] = useState('')

  const amountValue = parseFloat(amount)
  const percentValue = parseFloat(percent)

  const hasAmount = Number.isFinite(amountValue) && amountValue >= 0
  const hasPercent = Number.isFinite(percentValue) && percentValue >= 0
  const canCalculate = hasAmount && hasPercent

  // Clamp the discount to a sensible 0–100% range.
  const safePercent = canCalculate ? Math.min(percentValue, 100) : 0
  const discount = canCalculate ? amountValue * (safePercent / 100) : 0
  const finalPrice = canCalculate ? amountValue - discount : 0

  const reset = () => {
    setAmount('')
    setPercent('')
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 p-6 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg dark:bg-slate-800">
        <h1 className="text-2xl font-bold tracking-tight">Discount Calculator</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Enter the price and the discount to see what you save.
        </p>

        <div className="mt-6 space-y-4">
          <label className="block">
            <span className="text-sm font-medium">Original amount</span>
            <div className="mt-1 flex items-center rounded-lg border border-slate-300 bg-white px-3 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-200 dark:border-slate-600 dark:bg-slate-900">
              <span className="text-slate-400">$</span>
              <input
                type="number"
                min="0"
                step="0.01"
                inputMode="decimal"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder="0.00"
                className="w-full bg-transparent p-2 outline-none"
              />
            </div>
          </label>

          <label className="block">
            <span className="text-sm font-medium">Discount</span>
            <div className="mt-1 flex items-center rounded-lg border border-slate-300 bg-white px-3 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-200 dark:border-slate-600 dark:bg-slate-900">
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                inputMode="decimal"
                value={percent}
                onChange={(event) => setPercent(event.target.value)}
                placeholder="0"
                className="w-full bg-transparent p-2 outline-none"
              />
              <span className="text-slate-400">%</span>
            </div>
          </label>
        </div>

        <div className="mt-6 rounded-xl bg-slate-50 p-5 dark:bg-slate-900/60">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500 dark:text-slate-400">You save</span>
            <span className="font-semibold text-green-600 dark:text-green-400">
              {canCalculate ? currency.format(discount) : '—'}
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-3 dark:border-slate-700">
            <span className="font-medium">Final price</span>
            <span className="text-2xl font-bold">
              {canCalculate ? currency.format(finalPrice) : '—'}
            </span>
          </div>
        </div>

        <button
          onClick={reset}
          className="mt-4 w-full rounded-lg bg-red-600 px-5 py-2.5 font-medium text-white shadow transition hover:bg-red-500 active:scale-95"
        >
          Reset
        </button>
      </div>
    </main>
  )
}

export default App
