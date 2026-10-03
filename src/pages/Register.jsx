import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Register() {
  return (
    <div>

      <Navbar />

      <main className="auth-page">

        <div className="auth-card">

          <h1>
            Create Account
          </h1>

          <p>
            Join the CodeWithShiva Jobs community.
          </p>

          <form>

            <input
              type="text"
              placeholder="Full name"
            />

            <input
              type="email"
              placeholder="Email address"
            />

            <input
              type="password"
              placeholder="Password"
            />

            <button type="submit">
              Create Account
            </button>

          </form>

        </div>

      </main>

      <Footer />

    </div>
  );
}

export default Register;