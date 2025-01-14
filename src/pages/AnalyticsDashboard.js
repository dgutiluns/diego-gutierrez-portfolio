import React, { useEffect } from 'react';
import './AnalyticsDashboard.css';

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
          entry.target.classList.add('fade-in');
          entry.target.classList.remove('fade-out');
        } else {
          entry.target.classList.add('fade-out');
          entry.target.classList.remove('fade-in');
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
      observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="project-page">
      <div className="project-content">
        <div className="project-header">
          <div className="title-section">
            <h1>Internal Analytics<br />Dashboard</h1>
            <p className="company">Apollo Studios</p>
          </div>
        </div>

        <div className="project-media">
          <video autoPlay loop muted playsInline className="project-video">
            <source src="/Apollo_Dashboard.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="content-section fade-section">
          <div className="section-header">
            <h2>Goal</h2>
            <div className="section-line"></div>
          </div>
          <p>The primary goal of this project was to improve the accessibility and usability of Apollo Studios' RPA data for both executives and clients. This involved designing a streamlined, intuitive solution that could simplify the process of analysing and understanding performance metrics stored in the company's MongoDB database.</p>
        </div>

        <div className="content-section fade-section problem-section">
          <div className="section-header">
            <h2>Problem With Old Software</h2>
            <div className="section-line"></div>
          </div>
          <p>Apollo Studios operated on a MongoDB database that was accessed through MongoDB Compass. This software was beneficial in searching for client names, bot names, and a time period, although it was very inaccessible to understand. The software also did not provide easy, comprehensive analysis that one could just glance at and understand the data. Both the client and executives at the company wanted a solution to this problem, whereupon customers could easily understand how their RPAs were performing, and the executives could isolate which areas they would like to work on. Overall, the main problem was accessible understanding of the database. It needed a clean, frontend interface.</p>
        </div>

        <div className="content-section fade-section users-section">
          <div className="section-header">
            <h2>Who's This Made For</h2>
            <div className="section-line"></div>
          </div>
          
          <div className="users-grid">
            <div className="user-group">
              <h3>Executives at Apollo</h3>
              <ul>
                <li>Understanding their company's data, both on a high and low level.</li>
                <li>Previously could not easily understand the MongoDB database without downloading software and going through an onboarding experience.</li>
                <li>Could not gain insight into a lot of data very quickly, as it required them to do long searches that didn't provide comprehensive analysis. Was unable to easily see which bots were performing well or underperforming to figure out where work was needed.</li>
              </ul>
            </div>

            <div className="user-group">
              <h3>Clients</h3>
              <ul>
                <li>Quick and simple way of understanding how their RPA service is performing</li>
                <li>Previously, the client was forced to just accept data presented in inaccessible email formats, often in manually created spreadsheets. There was a lack of customization in the date ranges and individual bot insights.</li>
                <li>Clients faced difficulty in quickly understanding the statuses and performance of their bots. They also were dependent on Apollo Studios to provide insights, rather than easily accessing them whenever.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="content-section fade-section video-showcase">
          <div className="video-container">
            <video autoPlay loop muted playsInline className="showcase-video">
              <source src="/your-video-file.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        <div className="content-section fade-section solution-section">
          <div className="section-header">
            <h2>Developing a Solution</h2>
            <div className="section-line"></div>
          </div>
          
          <div className="solution-grid">
            <div className="solution-group">
              <div className="tech-icons">
                <img src="/mongo.png" alt="MongoDB" className="tech-icon" />
                <img src="/python.png" alt="Python" className="tech-icon with-border" />
              </div>
              <h3>Backend</h3>
              <p>We needed to first develop the python script that could analyze the MongoDB database. This involved some iterations in generating insights although this is irrelevant to the current design process. Myself and one other intern developed a python script that could iterate through all of the data points in the MongoDB. It collected unique statuses and grouped them alongside generating aggregate data insights.</p>
            </div>

            <div className="solution-group">
              <div className="tech-icons">
                <img src="/javascript.png" alt="JavaScript" className="tech-icon" />
                <img src="/react.png" alt="React" className="tech-icon with-border" />
              </div>
              <h3>Frontend</h3>
              <p>We decided the front end should be accessed through a web browser, so clients need not download software. This led us to using React, as it was a great library for accessible and beautiful interfaces. I decided to use React since I knew it best and it would be able to create beautiful frontend UI. I learned a lot about how difficult it can be to turn these design dreams into realities.</p>
            </div>
          </div>
        </div>

        <div className="content-section takeaways-section">
          <div className="section-header">
            <h2>Main Takeaways</h2>
            <div className="section-line"></div>
          </div>
          
          <div className="solution-grid">
            <div className="solution-group">
              <h3>Design Takeaways</h3>
              <p>This was my first industry design experience. I learned what it meant to design in a team, and receive feedback from supervisors and peers.</p>
              <p>I also learned how to design with a clear business objective. It was very enjoyable to have a clear problem and goal, and work my way to a solution.</p>
            </div>

            <div className="solution-group">
              <h3>Technical Takeaways</h3>
              <p>Empathy for your fellow developer. As I had to build anything I dreamt up, I learned what it takes to actually program something - and make sure it works in many edge cases.</p>
              <p>One of the most important design / technical mechanics I learned more about are micro interactions. They should be used sparingly, and only in places where they unexpectedly delight a user. And of course, don't make them impossible to code.</p>
            </div>
          </div>
        </div>

        <div className="back-home-container">
          <button 
            className="back-home-button"
            onClick={() => window.location.href = '/'}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsDashboard; 