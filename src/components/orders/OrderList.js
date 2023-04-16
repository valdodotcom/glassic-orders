import OrderItem from "./OrderItem";

export default function OrderList({ orders }) {

  if (orders.length === 0) {
    return <p>No orders found.</p>;
  }

  return (
    <ul>
      {orders.map((order) => (
        <OrderItem key={order.id} order={order} />
      ))}
    </ul>
  );
}
