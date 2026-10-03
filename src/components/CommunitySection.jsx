import "./CommunitySection.css";

function CommunitySection() {
  return (
    <section className="community-section">

      <div className="community-container">

        <div className="community-content">

          <span className="community-label">
            CODEWITHSHIVA COMMUNITY
          </span>

          <h2>
            Your Next Opportunity
            <br />
            Could Be Here.
          </h2>

          <p>
            Follow CodeWithShiva for job updates, internships,
            coding opportunities, career tips and developer content.
          </p>

          <div className="community-actions">

            <a
              href="#"
              className="instagram-btn"
            >
              📸 Follow on Instagram
            </a>

            <a
              href="#"
              className="community-btn"
            >
              Join Our Community →
            </a>

          </div>

        </div>

        <div className="community-stats">

          <div className="community-stat">
            <strong>1000+</strong>
            <span>Community Members</span>
          </div>

          <div className="community-stat">
            <strong>100+</strong>
            <span>Job Opportunities</span>
          </div>

          <div className="community-stat">
            <strong>50+</strong>
            <span>Companies</span>
          </div>

        </div>

      </div>

    </section>
  );
}

export default CommunitySection;