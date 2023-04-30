import Card from "../ui/Card";
import styles from "../ui/Card.module.css";

export default function OrderItem({ order }) {
  return (
    <Card>
      <li className={styles.orderItem}>
        <div className="billing">
          <h4>Billing Info</h4>
          <div className={styles.billingItem}>First Name: {order.billing.firstName}</div>
          <div className={styles.billingItem}>Last Name: {order.billing.lastName}</div>
          <div className={styles.billingItem}>Address: {order.billing.address}</div>
          <div className={styles.billingItem}>City: {order.billing.city}</div>
          <div className={styles.billingItem}>Email: {order.billing.email}</div>
          <div className={styles.billingItem}>Region: {order.billing.region}</div>
        </div>
        <div className={styles.items}>
          <h4>Items</h4>
          <div>
            <ul>
              {order.items.map((item) => (
                <li key={item.id}>
                  <div>Name: {item.name}</div>
                  <div>Price: {item.price}</div>
                  <div>Amount: {item.amount}</div>
                </li>
              ))}
            </ul>
          </div>
          <div>Total Price: {order.totalPrice}</div>
        </div>
      </li>
    </Card>
  );
}
