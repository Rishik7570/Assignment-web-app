'use client'
import { Button, Container, Typography, Box } from "@mui/material";
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from "firebase/auth";
import { auth, provider } from "../lib/firebaseConfig";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box textAlign="center" mt={10}>
        <Typography variant="h4" gutterBottom>
          {user ? `Welcome, ${user.displayName}` : "Sign in with Google"}
        </Typography>

        {user ? (
          <>
            <img
              src={user.photoURL || ""}
              alt="User Avatar"
              width={80}
              height={80}
              style={{ borderRadius: "50%", marginTop: 16 }}
            />
            <Typography variant="body1" mt={2}>
              {user.email}
            </Typography>
            <Button variant="contained" color="secondary" onClick={handleLogout} sx={{ mt: 3 }}>
              Sign Out
            </Button>
          </>
        ) : (
          <Button variant="contained" onClick={handleGoogleSignIn}>
            Sign in with Google
          </Button>
        )}
      </Box>
    </Container>
  );
}
