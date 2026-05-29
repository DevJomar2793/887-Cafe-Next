import { RecentOrder } from "./dashboard-data";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchRecentOrders(): Promise<RecentOrder[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("response: ", response);

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching recent orders:", error);
    throw error;
  }
}
