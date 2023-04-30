import { useState, useEffect } from 'react';
import OrderList from '../components/orders/OrderList';
import OrderItem from '../components/orders/OrderItem';
import LoginPage from './Login';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import { idToken } from './Login';
import styles from '../components/ui/Card.module.css';

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
          const ref = firebase.database().ref('orders');
          if (ref) {
            ref.auth = { idToken };
            ref.once('value')
              .then(snapshot => {
                const orders = [];
                snapshot.forEach(childSnapshot => {
                  const order = {
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                  };
                  orders.push(order);
                });
                setIsLoading(false);
                setLoadedOrders(orders);
              })
              .catch(error => {
                console.error(error);
                setIsLoading(false);
              });
          }
    }
  }, [isLoggedIn]);

  return (
    <section>
      <h1>Orders Received</h1>
      {!isLoggedIn && (
        <>
          <div className={styles.actions}>
            <button onClick={() => setIsLoginPageVisible(true)}>
              Login to view orders
            </button>
          </div>
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
          <div className={styles.actions}>
          <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      )}
    </section>
  );
}
