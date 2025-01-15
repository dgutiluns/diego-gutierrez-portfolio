import React, { useEffect } from 'react';
import './AnalyticsDashboard.css';
import { Link } from 'react-router-dom';

function AnalyticsDashboard() {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, observerOptions);

    // Observe all sections that should fade in
    const sections = document.querySelectorAll('.content-section, .media-section, .video-placeholder');
    sections.forEach(section => {
      section.classList.add('fade-in'); // Add initial fade-in class
      observer.observe(section);
    });

    // Cleanup
    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="dashboard-container">
      {/* Title Section */}
      <div className="title-section">
        <h1>Internal Analytics<br />Dashboard</h1>
        <p className="company-name">Apollo Studios</p>
      </div>

      {/* First Video Section */}
      <div className="media-section">
        <div className="project-media">
          <video className="project-video" autoPlay loop muted playsInline>
            <source src="/Apollo_Dashboard.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Goal Section */}
      <div className="content-section">
        <h2>Goal</h2>
        <div className="underline"></div>
        <p>
          The primary goal of this project was to improve the accessibility and usability of Apollo Studios' RPA data 
          for both executives and clients. This involved designing a streamlined, intuitive solution that could simplify 
          the process of analysing and understanding performance metrics stored in the company's MongoDB database.
        </p>
      </div>

      {/* Problem Section */}
      <div className="content-section">
        <h2>Problem With Old Software</h2>
        <div className="underline"></div>
        <p>
          Apollo Studios operated on a MongoDB database that was accessed through MongoDB Compass. This 
          software was beneficial in searching for client names, bot names, and a time period, although it was very 
          inaccessible to understand. The software also did not provide easy, comprehensive analysis that one could 
          just glance at and understand the data. Both the client and executives at the company wanted a solution 
          to this problem, whereupon customers could easily understand how their RPAs were performing, and the 
          executives could isolate which areas they would like to work on. Overall, the main problem was accessible 
          understanding of the database. It needed a clean, frontend interface.
        </p>
      </div>

      {/* Who's This Made For Section */}
      <div className="content-section">
        <h2>Target User</h2>
        <div className="underline"></div>
        <div className="two-column-content">
          <div className="column">
            <h3>Executives at Apollo</h3>
            <p>Understanding their company's data, both on a high and low level.</p>
            <p>Previously could not easily understand the MongoDB database without downloading software and going through an onboarding experience.</p>
            <p>Could not gain insight into a lot of data very quickly, as it required them to do long searches that didn't provide comprehensive analysis. Was unable to easily see which bots were performing well or underperforming to figure out where work was needed.</p>
          </div>
          <div className="column">
            <h3>Clients</h3>
            <p>Quick and simple way of understanding how their RPA service is performing</p>
            <p>Previously, the client was forced to just accept data presented in inaccessible email formats, often in manually created spreadsheets. There was a lack of customization in the date ranges and individual bot insights.</p>
            <p>Clients faced difficulty in quickly understanding the statuses and performance of their bots. They also were dependent on Apollo Studios to provide insights, rather than easily accessing them whenever.</p>
          </div>
        </div>
      </div>

      {/* Second Video Section (before Developing a Solution) */}
      <div className="content-section">
        <div className="video-placeholder">
          <video className="project-video" autoPlay loop muted playsInline>
            <source src="/Apollo_Graphs.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Developing a Solution Section */}
      <div className="content-section">
        <h2>Developing a Solution</h2>
        <div className="underline"></div>
        <div className="two-column-content">
          <div className="column">
            <div className="tech-icons">
              <img src="/mongo.png" alt="MongoDB" className="tech-icon" />
              <img src="/python.png" alt="Python" className="tech-icon" />
            </div>
            <h3>Backend</h3>
            <p>
              The Backend: We needed to first develop the python script that could analyze the MongoDB database. This involved some iterations in generating insights although this is irrelevant to the current design process. Myself and one other intern developed a python script that could iterate through all of the data points in the MongoDB. It collected unique statuses and grouped them alongside generating aggregate data insights.
            </p>
          </div>
          <div className="column">
            <div className="tech-icons">
              <img src="/javascript.png" alt="JavaScript" className="tech-icon" />
              <img src="/react.png" alt="React" className="tech-icon" />
            </div>
            <h3>Frontend</h3>
            <p>
              We decided the front end should be accessed through a web browser, so clients need not download software. This led us to using React, as it was a great library for accessible and beautiful interfaces. I decided to use React since I knew it best and it would be able to create beautiful frontend UI. I learned a lot about how difficult it can be to turn these design dreams into realities.
            </p>
          </div>
        </div>
      </div>

      {/* Main Takeaways Section */}
      <div className="content-section">
        <h2>Main Takeaways</h2>
        <div className="underline"></div>
        <div className="two-column-content">
          <div className="column">
            <h3>Design Takeaways</h3>
            <p>
              <strong>Team Collaboration and Feedback:</strong> This project provided my first exposure to industry-level design processes. I gained valuable experience working collaboratively in a team setting, incorporating feedback from supervisors and peers to refine the solution.
            </p>
            <p>
              <strong>Business-Oriented Design:</strong> I learned the importance of aligning design choices with clear business objectives. The process of addressing a well-defined problem and working toward a solution was both challenging and rewarding.
            </p>
          </div>
          <div className="column">
            <h3>Technical Takeaways</h3>
            <p>
              <strong>Empathy for Developers:</strong> Building the features I envisioned taught me to appreciate the complexity of development, particularly ensuring functionality across edge cases. This deepened my understanding of creating practical, implementable designs.
            </p>
            <p>
              <strong>Micro-Interactions:</strong> I developed a better understanding of micro-interactions and their role in design. They should enhance the user experience in subtle, delightful ways without adding unnecessary complexity to the development process.
            </p>
          </div>
        </div>
      </div>

      {/* Back Button Section */}
      <div className="back-button-container">
        <Link to="/" className="back-button">
          Back to Projects
        </Link>
      </div>
    </div>
  );
}

export default AnalyticsDashboard;
