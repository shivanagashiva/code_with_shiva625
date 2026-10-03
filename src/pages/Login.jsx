import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Login() {
  return (
    <div>

      <Navbar />

      <main className="auth-page">

        <div className="auth-card">

          <h1>
            Welcome Back
          </h1>

          <p>
            Login to your CodeWithShiva Jobs account.
          </p>

          <form>

            <input
              type="email"
              placeholder="Email address"
            />

            <input
              type="password"
              placeholder="Password"
            />

            <button type="submit">
              Login
            </button>

          </form>

        </div>

      </main>

      <Footer />

    </div>
  );
}

export default Login;