import { Link } from 'react-router-dom';
import './LoginPage.css';

export default function WelcomePage() {
  return (
    <main className="login-page-container">
      <div className="login-content-wrapper">
        <section className="login-card">
          <img src="/logo.png" alt="IntellixAI" className="login-logo" />
          <h1 className="login-heading">Welcome to IntellixAI</h1>
          <p className="login-subtext">Sign in to access your intelligent chat workspace.</p>
          <Link className="login-google-btn" to="/login" state={{ backTo: '/' }}>Go to sign in</Link>
        </section>
      </div>
    </main>
  );
}
