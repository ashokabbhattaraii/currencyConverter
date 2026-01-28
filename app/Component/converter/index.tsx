"use client";
import { currencies } from "../currency/currency";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export default function CurrencyConverter({ rate }: { rate: any }) {
  const { register, watch, setValue } = useForm({
    defaultValues: {
      fromAmount: 1,
      fromCurrency: "USD",
      toCurrency: "INR",
      toAmount: "",
    },
  });

  const fromAmount = watch("fromAmount");
  const fromCurrency = watch("fromCurrency");
  const toCurrency = watch("toCurrency");

  // Quick access
  const quickAccess = (from: string, to: string) => {
    setValue("fromCurrency", from);
    setValue("toCurrency", to);
  };

  useEffect(() => {
    if (rate && rate.data && fromAmount && fromCurrency && toCurrency) {
      const fromRate = rate.data[fromCurrency];
      const toRate = rate.data[toCurrency];

      if (fromRate && toRate) {
        const amount = parseFloat(String(fromAmount));
        if (isNaN(amount)) return;

        const convertedAmount = (toRate / fromRate) * amount;
        setValue("toAmount", convertedAmount.toFixed(2));
      }
    }
  }, [fromAmount, fromCurrency, toCurrency, rate, setValue]);

  const currencyRates = rate?.data ? Object.entries(rate.data).slice(0, 8) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Floating Currency Rates */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-gray-800 to-transparent overflow-hidden">
        <div className="animate-scroll flex gap-8 whitespace-nowrap py-2 px-4">
          {currencyRates.map(([code, value]: any, index) => (
            <div key={index} className="text-white font-semibold flex-shrink-0">
              <span className="text-blue-400">{code}:</span> {value.toFixed(2)}
            </div>
          ))}
          {currencyRates.map(([code, value]: any, index) => (
            <div
              key={`repeat-${index}`}
              className="text-white font-semibold flex-shrink-0"
            >
              <span className="text-blue-400">{code}:</span> {value.toFixed(2)}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>

      <div className="bg-gray-800 rounded-lg shadow-2xl p-10 w-full max-w-md border border-gray-700 mt-20">
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          Currency Converter
        </h1>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            From:
          </label>
          <div className="flex gap-3">
            <input
              type="number"
              {...register("fromAmount")}
              placeholder="Enter amount"
              min="0"
              className="flex-1 px-4 py-3 border-2 border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition"
            />
            <select
              {...register("fromCurrency")}
              className="w-24 px-3 py-3 border-2 border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              {currencies.map((curr) => (
                <option key={curr.code} value={curr.code}>
                  {curr.code}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setValue("fromCurrency", toCurrency);
            setValue("toCurrency", fromCurrency);
          }}
          className="w-full py-3 mb-6 bg-gray-700 rounded-lg text-2xl hover:bg-gray-600 transition"
        >
          ⇅
        </button>

        <div className="mb-8">
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            To:
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              {...register("toAmount")}
              placeholder="Converted rate"
              readOnly
              className="flex-1 px-4 py-3 border-2 border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition"
            />
            <select
              {...register("toCurrency")}
              className="w-24 px-3 py-3 border-2 border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              {currencies.map((curr) => (
                <option key={curr.code} value={curr.code}>
                  {curr.code}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Access */}
        <div className="border-t border-gray-700 pt-4">
          <h2 className="text-sm font-semibold text-gray-300 mb-3">
            Quick Access
          </h2>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => quickAccess("USD", "EUR")}
              className="bg-gray-700 text-white text-xs py-2 rounded-lg hover:bg-gray-600 transition"
            >
              USD→EUR
            </button>
            <button
              onClick={() => quickAccess("USD", "GBP")}
              className="bg-gray-700 text-white text-xs py-2 rounded-lg hover:bg-gray-600 transition"
            >
              USD→GBP
            </button>
            <button
              onClick={() => quickAccess("USD", "INR")}
              className="bg-gray-700 text-white text-xs py-2 rounded-lg hover:bg-gray-600 transition"
            >
              USD→INR
            </button>
            <button
              onClick={() => quickAccess("EUR", "USD")}
              className="bg-gray-700 text-white text-xs py-2 rounded-lg hover:bg-gray-600 transition"
            >
              EUR→USD
            </button>
            <button
              onClick={() => quickAccess("GBP", "USD")}
              className="bg-gray-700 text-white text-xs py-2 rounded-lg hover:bg-gray-600 transition"
            >
              GBP→USD
            </button>
            <button
              onClick={() => quickAccess("INR", "USD")}
              className="bg-gray-700 text-white text-xs py-2 rounded-lg hover:bg-gray-600 transition"
            >
              INR→USD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
