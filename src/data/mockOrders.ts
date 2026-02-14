export interface OrderTimeline {
  status: string;
  time: string;
  description: string;
}

export interface Order {
  id: string;
  customerId: string;
  restaurantId: string;
  restaurantName: string;
  deliveryPartnerId?: string;
  deliveryPartnerName?: string;
  items: { name: string; qty: number; price: number }[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  discount: number;
  total: number;
  paymentMethod: string;
  paymentStatus: "paid" | "pending" | "refunded";
  orderStatus: "placed" | "accepted" | "preparing" | "picked" | "delivered" | "cancelled";
  refundStatus?: "none" | "requested" | "processed";
  timeline: OrderTimeline[];
  createdAt: string;
  deliveryAddress: string;
  rating?: number;
  deliveryRating?: number;
  review?: string;
}

export interface Address {
  id: string;
  label: string;
  full: string;
  lat: number;
  lng: number;
}

export const mockAddresses: Address[] = [
  { id: "a1", label: "Home", full: "123 MG Road, Bangalore 560001", lat: 12.97, lng: 77.59 },
  { id: "a2", label: "Work", full: "456 Whitefield, Bangalore 560066", lat: 12.98, lng: 77.75 },
  { id: "a3", label: "Other", full: "789 Koramangala, Bangalore 560034", lat: 12.93, lng: 77.62 },
];

export const mockOrders: Order[] = [
  {
    id: "ORD001",
    customerId: "u1",
    restaurantId: "r1",
    restaurantName: "Meghana Foods",
    deliveryPartnerId: "u3",
    deliveryPartnerName: "Amit Kumar",
    items: [
      { name: "Chicken Biryani", qty: 2, price: 299 },
      { name: "Butter Naan", qty: 4, price: 59 },
    ],
    subtotal: 834,
    tax: 42,
    deliveryFee: 0,
    discount: 100,
    total: 776,
    paymentMethod: "UPI",
    paymentStatus: "paid",
    orderStatus: "delivered",
    refundStatus: "none",
    timeline: [
      { status: "placed", time: "2025-02-10 12:00", description: "Order placed" },
      { status: "accepted", time: "2025-02-10 12:02", description: "Restaurant accepted" },
      { status: "preparing", time: "2025-02-10 12:05", description: "Preparing your food" },
      { status: "picked", time: "2025-02-10 12:25", description: "Picked up by Amit" },
      { status: "delivered", time: "2025-02-10 12:45", description: "Delivered!" },
    ],
    createdAt: "2025-02-10T12:00:00",
    deliveryAddress: "123 MG Road, Bangalore 560001",
    rating: 5,
    deliveryRating: 4,
    review: "Excellent biryani, loved it!",
  },
  {
    id: "ORD002",
    customerId: "u1",
    restaurantId: "r2",
    restaurantName: "Pizza Hut",
    deliveryPartnerId: "u3",
    deliveryPartnerName: "Amit Kumar",
    items: [
      { name: "Margherita Pizza", qty: 1, price: 249 },
      { name: "Garlic Bread", qty: 1, price: 149 },
    ],
    subtotal: 398,
    tax: 20,
    deliveryFee: 40,
    discount: 0,
    total: 458,
    paymentMethod: "Card",
    paymentStatus: "paid",
    orderStatus: "preparing",
    refundStatus: "none",
    timeline: [
      { status: "placed", time: "2025-02-14 10:00", description: "Order placed" },
      { status: "accepted", time: "2025-02-14 10:03", description: "Restaurant accepted" },
      { status: "preparing", time: "2025-02-14 10:05", description: "Preparing your food" },
    ],
    createdAt: "2025-02-14T10:00:00",
    deliveryAddress: "456 Whitefield, Bangalore 560066",
  },
  {
    id: "ORD003",
    customerId: "u1",
    restaurantId: "r3",
    restaurantName: "Burger King",
    items: [
      { name: "Whopper", qty: 2, price: 199 },
      { name: "Oreo Shake", qty: 2, price: 139 },
    ],
    subtotal: 676,
    tax: 34,
    deliveryFee: 0,
    discount: 135,
    total: 575,
    paymentMethod: "UPI",
    paymentStatus: "refunded",
    orderStatus: "cancelled",
    refundStatus: "processed",
    timeline: [
      { status: "placed", time: "2025-02-08 18:00", description: "Order placed" },
      { status: "accepted", time: "2025-02-08 18:02", description: "Restaurant accepted" },
      { status: "cancelled", time: "2025-02-08 18:10", description: "Cancelled by customer" },
    ],
    createdAt: "2025-02-08T18:00:00",
    deliveryAddress: "123 MG Road, Bangalore 560001",
  },
  {
    id: "ORD004",
    customerId: "u1",
    restaurantId: "r4",
    restaurantName: "Saravana Bhavan",
    deliveryPartnerId: "u3",
    deliveryPartnerName: "Amit Kumar",
    items: [
      { name: "Masala Dosa", qty: 3, price: 120 },
      { name: "Filter Coffee", qty: 3, price: 49 },
    ],
    subtotal: 507,
    tax: 25,
    deliveryFee: 0,
    discount: 101,
    total: 431,
    paymentMethod: "Cash",
    paymentStatus: "paid",
    orderStatus: "delivered",
    refundStatus: "none",
    timeline: [
      { status: "placed", time: "2025-02-05 08:00", description: "Order placed" },
      { status: "accepted", time: "2025-02-05 08:01", description: "Restaurant accepted" },
      { status: "preparing", time: "2025-02-05 08:03", description: "Preparing your food" },
      { status: "picked", time: "2025-02-05 08:20", description: "Picked up" },
      { status: "delivered", time: "2025-02-05 08:35", description: "Delivered!" },
    ],
    createdAt: "2025-02-05T08:00:00",
    deliveryAddress: "789 Koramangala, Bangalore 560034",
    rating: 4,
    deliveryRating: 5,
  },
];

export const mockAllUsers = [
  { id: "u1", name: "Rahul Sharma", email: "customer@swigato.com", role: "customer", status: "active", orders: 15 },
  { id: "u2", name: "Priya Patel", email: "restaurant@swigato.com", role: "restaurant", status: "active", orders: 0 },
  { id: "u3", name: "Amit Kumar", email: "delivery@swigato.com", role: "delivery", status: "active", orders: 42 },
  { id: "u4", name: "Neha Singh", email: "instamart@swigato.com", role: "instamart", status: "active", orders: 0 },
  { id: "u5", name: "Admin User", email: "admin@swigato.com", role: "admin", status: "active", orders: 0 },
  { id: "u6", name: "Ravi Verma", email: "ravi@example.com", role: "customer", status: "blocked", orders: 3 },
  { id: "u7", name: "Sanjay Gupta", email: "sanjay@example.com", role: "delivery", status: "active", orders: 28 },
];
