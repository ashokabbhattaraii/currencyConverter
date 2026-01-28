// app/api/convert/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const baseURL = "https://api.freecurrencyapi.com/";
    const endPoint = "v1/latest";
    const apiKey = "fca_live_aIwYX83YwQMvJldU5oRLVhWtj39DTwrrRt4k77jt";

    console.log("Fetching conversion rates...");

    const res = await fetch(`${baseURL}${endPoint}?apikey=${apiKey}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!res.ok) {
      throw new Error("Failed to fetch conversion rates");
    }

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching conversion rates:", error);
    return NextResponse.json(
      { error: "Failed to fetch conversion rates" },
      { status: 500 },
    );
  }
}

export async function getConversionRate() {
  const baseURL = "https://api.freecurrencyapi.com/";
  const endPoint = "v1/latest";
  const apiKey = "fca_live_aIwYX83YwQMvJldU5oRLVhWtj39DTwrrRt4k77jt";

  const res = await fetch(`${baseURL}${endPoint}?apikey=${apiKey}`);
  const data = await res.json();
  return data;
}
