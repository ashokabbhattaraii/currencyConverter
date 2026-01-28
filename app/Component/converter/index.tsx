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

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 to-gray-800 flex justify-center items-center p-4">
      <div className="bg-gray-800 rounded-lg shadow-2xl p-10 w-full max-w-md border border-gray-700">
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
      </div>
    </div>
  );
}
