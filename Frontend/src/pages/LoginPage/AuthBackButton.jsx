import { ArrowLeft } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { authBackDestination } from '../../services/authFlow.js';

export default function AuthBackButton() {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <button type="button" className="auth-back-button" aria-label="Back"
      onClick={() => {
        const destination = authBackDestination(location.state, window.history.state?.idx);
        if (destination === -1) navigate(-1);
        else navigate(destination, { replace: true });
      }}>
      <ArrowLeft size={24} aria-hidden="true" />
      <span>Back</span>
    </button>
  );
}
