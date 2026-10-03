import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import "./CategorySection.css";

const categories = [
  {
    name: "Software Development",
    match: ["Software Development"],
    icon: "💻",
  },
  {
    name: "Full Stack Development",
    match: ["Full Stack Development"],
    icon: "💻",
  },
  {
    name: "Java",
    match: ["Java"],
    icon: "☕",
  },
  {
    name: "Python",
    match: ["Python"],
    icon: "🐍",
  },
  {
    name: "React",
    match: ["React"],
    icon: "⚛️",
  },
  {
    name: "Cloud",
    match: ["Cloud"],
    icon: "☁️",
  },
  {
    name: "AI / ML",
    match: ["AI / ML", "AI", "Machine Learning"],
    icon: "🤖",
  },
  {
    name: "Data & SQL",
    match: ["Data & SQL", "Data", "SQL"],
    icon: "🗄️",
  },
  {
    name: "Internships",
    match: ["Internships", "Internship"],
    icon: "🎓",
  },
];

function CategorySection() {
  const navigate = useNavigate();

  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategoryCounts();
  }, []);

  const fetchCategoryCounts = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("jobs")
        .select("category")
        .eq("is_published", true);

      if (error) {
        console.error("Error loading category counts:", error);
        return;
      }

      const categoryCounts = {};

      categories.forEach((category) => {
        const count = (data || []).filter((job) => {
          if (!job.category) return false;

          return category.match.some(
            (value) =>
              job.category.trim().toLowerCase() === value.toLowerCase()
          );
        }).length;

        categoryCounts[category.name] = count;
      });

      setCounts(categoryCounts);
    } catch (error) {
      console.error("Category count error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (category) => {
    navigate(
      `/jobs?category=${encodeURIComponent(category)}`
    );
  };

  return (
    <section className="category-section">
      <div className="category-header">
        <span className="category-label">
          EXPLORE OPPORTUNITIES
        </span>

        <h2>Find Jobs By Category</h2>

        <p>
          Explore opportunities based on your skills and career interests.
        </p>
      </div>

      <div className="category-grid">
        {categories.map((category) => {
          const count = counts[category.name] || 0;

          return (
            <button
              key={category.name}
              className="category-card"
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="category-icon">
                {category.icon}
              </div>

              <div className="category-info">
                <h3>{category.name}</h3>

                <span>
                  {loading
                    ? "Loading..."
                    : `${count} ${count === 1 ? "Job" : "Jobs"}`}
                </span>
              </div>

              <div className="category-arrow">
                →
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default CategorySection;