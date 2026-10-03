 import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";

function Hero() {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (keyword.trim()) {
      params.set("search", keyword.trim());
    }

    if (location.trim()) {
      params.set("location", location.trim());
    }

    navigate(
      params.toString()
        ? `/jobs?${params.toString()}`
        : "/jobs"
    );
  };

  const handlePopularSearch = (value) => {
    navigate(
      `/jobs?search=${encodeURIComponent(value)}`
    );
  };

  return (
    <section className="hero">

      <div className="hero-content">

        <div className="hero-badge">
          🚀 Built for Developers & Freshers
        </div>

        <h1>
          Find Your{" "}
          <span>Dream Job</span>
        </h1>

        <p>
          Discover internships, fresher jobs and
          software development opportunities shared
          by CodeWithShiva.
        </p>

        {/* SEARCH */}

        <form
          className="hero-search"
          onSubmit={handleSearch}
        >

          {/* KEYWORD */}

          <div className="search-field keyword-field">

            <span className="search-icon">
              🔍
            </span>

            <input
              type="text"
              value={keyword}
              onChange={(e) =>
                setKeyword(e.target.value)
              }
              placeholder="Job title, skills or company"
              aria-label="Job title, skills or company"
            />

          </div>

          {/* LOCATION */}

          <div className="search-field location-field">

            <span className="search-icon">
              📍
            </span>

            <input
              type="text"
              value={location}
              onChange={(e) =>
                setLocation(e.target.value)
              }
              placeholder="Location"
              aria-label="Location"
            />

          </div>

          <button
            type="submit"
            className="search-jobs-btn"
          >
            Search Jobs
          </button>

        </form>

        {/* POPULAR */}

        <div className="popular-searches">

          <strong>
            Popular:
          </strong>

          {[
            "Java Developer",
            "Python Developer",
            "React Developer",
            "Fresher",
            "Internship",
          ].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() =>
                handlePopularSearch(item)
              }
              className="popular-btn"
            >
              {item}
            </button>
          ))}

        </div>

      </div>

    </section>
  );
}

export default Hero;