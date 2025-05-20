"use client";

// pages/login.tsx (in your NextJS app)
import { useState, useEffect } from "react";
import { loginWithGoogle, auth } from "../lib/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, redirect to dashboard or home
        router.push("/dashboard");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      await loginWithGoogle();
      // AuthStateChanged effect will handle redirect
    } catch (err) {
      setError("Failed to sign in with Google. Please try again.");
      console.error("Google login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1>Login to Your App</h1>

      <button
        onClick={handleGoogleLogin}
        disabled={loading}
        className="google-login-button"
      >
        {loading ? "Signing in..." : "Sign in with Google"}
      </button>

      {error && <p className="error-message">{error}</p>}

      <style jsx>{`
        .login-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 2rem;
        }

        .google-login-button {
          background-color: #4285f4;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          margin-top: 20px;
        }

        .google-login-button:hover {
          background-color: #357ae8;
        }

        .google-login-button:disabled {
          background-color: #cccccc;
          cursor: not-allowed;
        }

        .error-message {
          color: #d32f2f;
          margin-top: 16px;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
