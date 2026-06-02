import { RecentOrder } from "./dashboard-data";

//LETS WORK ON THIS LATER
const API_BASE_URL = "http://localhost:8000";

export async function fetchRecentOrders(): Promise<RecentOrder[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

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
