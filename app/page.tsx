"use client";
import Image from "next/image";

import CurrencyConverter from "./Component/converter";
import { getConversionRate } from "./api/convert/route";
import { useEffect, useState } from "react";
export default function Home() {
  const [conversionData, setConversionData] = useState<null>();
  useEffect(() => {
    async function fetchData() {
      const data = await getConversionRate();
      console.log(data);
      setConversionData(data);
    }
    fetchData();
  }, []);
  console.log("Conversion Data:", conversionData);
  return <CurrencyConverter rate={conversionData} />;
}
