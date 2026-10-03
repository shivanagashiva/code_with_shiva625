import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import "../App.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      console.log("1. Starting login...");

      const {
        data: authData,
        error: authError,
      } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log("2. Auth response:", authData);

      if (authError) {
        console.error("Auth error:", authError);
        throw new Error(authError.message);
      }

      const user = authData.user;

      if (!user) {
        throw new Error("Login failed. No user returned.");
      }

      console.log("3. Logged in user:", user.id);

      const {
        data: profile,
        error: profileError,
      } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();

      console.log("4. Profile:", profile);
      console.log("5. Profile error:", profileError);

      if (profileError) {
        throw new Error(
          "Unable to check admin profile: " +
          profileError.message
        );
      }

      if (!profile) {
        throw new Error(
          "Admin profile not found. Please add this user to the profiles table."
        );
      }

      if (profile.role !== "admin") {
        throw new Error(
          "This account is not an admin account."
        );
      }

      console.log("6. Admin verified!");

      navigate("/admin");
    } catch (error) {
      console.error("LOGIN ERROR:", error);

      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">

      <div className="auth-card">

        <h1>Admin Login</h1>

        <p className="auth-subtitle">
          Login to manage CodeWithShiva Jobs
        </p>

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>

          <div className="form-group">
            <label>Admin Email</label>

            <input
              type="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="auth-btn"
            disabled={loading}
          >
            {loading
              ? "Checking..."
              : "Login as Admin"}
          </button>

        </form>

      </div>

    </main>
  );
}

export default AdminLogin;