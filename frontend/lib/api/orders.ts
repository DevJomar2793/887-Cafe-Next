import { apiRequest } from "./client";

export interface PlaceOrderRequest {
  customer_name: string;
  total_amount: number;
}

export interface OrderResponse {
  id: number;
  order_number: string;
  customer_name: string;
  total_amount: number;
  order_time: string;
  status: string;
  created_at?: string | null;
}

interface PlaceOrderResponse {
  message: string;
  order: OrderResponse;
}

export async function placeOrder(order: PlaceOrderRequest): Promise<OrderResponse> {
  try {
    const response = await apiRequest<PlaceOrderResponse>("/api/add_order", {
      method: "POST",
      body: JSON.stringify(order),
    });
    return response.order;
  } catch {
    throw new Error("We could not send your order. Please try again.");
  }
}

export async function fetchOrders(): Promise<OrderResponse[]> {
  return apiRequest<OrderResponse[]>("/api/orderlist");
}
