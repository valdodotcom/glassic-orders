import { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getAuth } from '@firebase/auth';
import styles from '../components/ui/Card.module.css';
import Card from '../components/ui/Card';

const firebaseConfig = {
    apiKey: "AIzaSyDT73fQFTFvAYT_LK55fYLsUQpL60uf0eI",
    authDomain: "glassic-site.firebaseapp.com",
    databaseURL: "https://glassic-site-default-rtdb.firebaseio.com",
    projectId: "glassic-site",
    storageBucket: "glassic-site.appspot.com"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
var idToken = "";

export default function LoginPage({ onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCloseModal = () => {
        if (isModalOpen) setIsModalOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                // User authenticated successfully
                handleCloseModal();
                if (onLoginSuccess) {
                    onLoginSuccess();
                    idToken = firebase.auth().currentUser.getIdToken();
                }
            })

            .catch((error) => {
                // Error occurred while authenticating user
                setErrorMessage(error.message);
            });
    };

    return (
        <Card>
        <div className={styles.loginSection}>
            <h1>Login</h1>
            {errorMessage && <p>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div className={styles.gridGap}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                </div>
                <div className={styles.actions}>
                <button type="submit">Log in</button>
                </div>
            </form>
        </div>
        </Card>
    );
};

export { firebaseAuth, idToken };