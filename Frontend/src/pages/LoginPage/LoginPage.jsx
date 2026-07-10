import "./LoginPage.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginWithGoogle } from "../../services/firebase.js";
import { Sparkles } from "lucide-react";
import LightRays from "../../components/LightRays/LightRays.jsx";
import DotField from "../../components/DotField/DotField.jsx";

export default function LoginPage({ user, authLoading }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !authLoading) {
      navigate("/", { replace: true });
    }
  }, [user, authLoading, navigate]);

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  if (authLoading || user) {
    return (
      <div className="login-page-loader" />
    );
  }

  return (
    <div className="login-page-container">
      <div className="login-page-bg-layer">
        <LightRays
          raysOrigin="top-center"
          raysColor="#A855F7"
          raysSpeed={1.5}
          lightSpread={0.3}
          rayLength={2.5}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0}
          distortion={0}
        />
      </div>

      <div className="login-page-bg-layer">
        <DotField
          dotRadius={1.5}
          dotSpacing={14}
          bulgeStrength={67}
          glowRadius={160}
          sparkle={false}
          waveAmplitude={0}
        />
      </div>

      <div className="login-content-wrapper">
        
        <div className="group login-card">
          <div className="login-card-inner">
            <div className="login-logo-wrapper">
              <img 
                src="/logo.png" 
                alt="IntellixAI Logo" 
                className="login-logo" 
              />
            </div>
            <h1 className="login-heading">
              Welcome Back
            </h1>
            <p className="login-subtext">
              Sign in to access your intelligent chat workspace.
            </p>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="login-google-btn"
          >
            <svg className="login-google-icon" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}
