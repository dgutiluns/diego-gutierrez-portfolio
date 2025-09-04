import React, { useEffect } from 'react';
import './AutomatedEmail.css';
import '../styles/theme.css';
import { Link } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import FloatingOrbs from '../components/FloatingOrbs';

function AutomatedEmail() {
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
      section.classList.add('fade-in');
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
      {/* Theme Toggle - Top Left */}
      <ThemeToggle />
      
            
      {/* Floating Orbs Background - Covers entire page */}
      <div className="full-page-background">
        <FloatingOrbs />
      </div>
      
      {/* Title Section */}
      <div className="title-section">
        <h1>Automated Email<br />System</h1>
        <p className="company-name">Apollo Studios</p>
      </div>

      {/* First Video Section */}
      <div className="media-section">
        <div className="project-media">
          <video className="project-video" autoPlay loop muted playsInline>
            <source src={`${process.env.PUBLIC_URL}/auto_email.mp4`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Goal Section */}
      <div className="content-section">
        <h2>Goal</h2>
        <div className="underline"></div>
        <p>
          During my internship at Apollo Studios, I was tasked with another intern to develop an automated email report. The primary objective of this project was to create a monthly email report for each of Apollo's customers, providing a comprehensive summary of the performance of their bots. The report included an introduction followed by a table displaying various statistics to summarize bot performance in a clear and concise manner.
        </p>
      </div>

      {/* Problem Section */}
      <div className="content-section">
        <h2>Problem With Old Software</h2>
        <div className="underline"></div>
        <p>
          Apollo began receiving inquiries from clients asking how they could evaluate whether continuing with their service was cost-efficient. Previously, clients lacked the tools to effectively assess the performance of their bots. They were unable to determine metrics such as bot activity levels, success rates, or failure rates, making it challenging to gauge the value of the service. This gap created a need for concise and comprehensible reporting that would allow clients to weigh the effectiveness of their bots. Apollo wanted to address this issue to build trust and demonstrate confidence in their service by being transparent with performance data.
        </p>
      </div>

      {/* Target User Section */}
      <div className="content-section">
        <h2>Target User</h2>
        <div className="underline"></div>
        <p>
          The primary users of this reporting system were Apollo's clients, who relied on bots to automate various tasks. These users required an easy-to-understand summary of bot performance metrics to make informed decisions about their continued use of the service. The reports needed to cater to both technical and non-technical stakeholders, ensuring clarity for all audiences.
        </p>
      </div>

      {/* Email Picture Section */}
      <div className="content-section">
        <div className="email-image-container">
          <img 
            src={`${process.env.PUBLIC_URL}/email_pic.png`} 
            alt="Email System" 
            className="email-image"
          />
        </div>
      </div>

      
      {/* Developing a Solution Section */}
      <div className="content-section">
        <h2>Developing a Solution</h2>
        <div className="underline"></div>
        <div className="two-column-content">
          <div className="column">
            <div className="tech-icons">
              <img src={`${process.env.PUBLIC_URL}/python.png`} alt="Python" className="tech-icon" />
            </div>
            <h3>Data Cleaning and Filtering</h3>
            <p>
              Filtered multiple layers of data to identify all active bots for a given company. Calculated relevant statistics such as activity rates, success rates, and failure rates.
            </p>
            <h3>Program Development</h3>
            <p>
              Created a program to automate the generation of monthly reports. Ensured the program calculated metrics accurately and displayed them in a customer-friendly table.
            </p>
          </div>
          <div className="column">
            <div className="tech-icons">
              <img src={`${process.env.PUBLIC_URL}/aws.png`} alt="AWS" className="tech-icon" />
            </div>
            <h3>Design and Presentation</h3>
            <p>
              Focused on creating a professional-looking email design that represented Apollo's brand. Incorporated clear, concise, and transparent performance summaries to build trust with clients.
            </p>
            <h3>Hosting and Automation</h3>
            <p>
              Hosted the service on AWS, enabling automated generation and emailing of reports to individual clients monthly.
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
              From a design standpoint, the emphasis on clarity and professionalism in the email layout fostered trust and transparency with clients. The project highlighted the importance of combining technical skills with thoughtful design to meet user needs effectively.
            </p>
          </div>
          <div className="column">
            <h3>Technical Takeaways</h3>
            <p>
              From a technical perspective, the process involved significant data cleaning and automation, which improved efficiency and accuracy. Ultimately, the automated email report not only solved a pressing client need but also strengthened Apollo's relationships with its customers by demonstrating confidence in the performance of its services.
            </p>
          </div>
        </div>
      </div>

      {/* Back Button Section */}
      <div className="back-button-container">
        <Link to="/" className="back-button" onClick={() => window.scrollTo(0, 0)}>
          Back to Projects
        </Link>
      </div>
    </div>
  );
}

export default AutomatedEmail; 