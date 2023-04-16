import { useState, useEffect } from 'react';
import OrderList from '../components/orders/OrderList';
import OrderItem from '../components/orders/OrderItem';
import LoginPage from './Login';

export default function Orders() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedOrders, setLoadedOrders] = useState([]);
  const [isLoginPageVisible, setIsLoginPageVisible] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  useEffect(() => {
    if (isLoggedIn) {
      setIsLoading(true);
      fetch('https://glassic-site-default-rtdb.firebaseio.com/orders.json')
        .then(response => response.json())
        .then(data => {
          const orders = [];
          for (const key in data) {
            const order = {
              id: key,
              ...data[key]
            };
            orders.push(order)
          }
          setIsLoading(false);
          setLoadedOrders(orders);
        });
    }
  }, [isLoggedIn])

  return (
    <section>
      <h2>Your Orders</h2>
      {!isLoggedIn && (
        <>
          <button onClick={() => setIsLoginPageVisible(true)}>
            Login to view orders
          </button>
          {isLoginPageVisible && (
            <LoginPage onLoginSuccess={handleLoginSuccess} />
          )}
        </>
      )}
      {isLoggedIn && isLoading && (
        <p>Loading...</p>
      )}
      {isLoggedIn && !isLoading && (
        <div>
          <OrderList orders={loadedOrders}>
            <OrderItem />
          </OrderList>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </section>
  );
}
