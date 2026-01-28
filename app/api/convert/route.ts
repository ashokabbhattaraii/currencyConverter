import { env } from "process";
export async function getConversionRate() {
  const baseURl = "https://api.freecurrencyapi.com/";
  const endPoint = "v1/latest";
  const apiKey = "fca_live_aIwYX83YwQMvJldU5oRLVhWtj39DTwrrRt4k77jt";
  console.log("API Key:", apiKey);
  const res = await fetch(`${baseURl}${endPoint}?apikey=${apiKey}`);
  const data = await res.json();
  return data;
}
