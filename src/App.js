import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { HashRouter as Router, Routes, Route, useNavigate, Link } from 'react-router-dom';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import AutomatedEmail from './pages/AutomatedEmail';
import HeartDiseasePrediction from './pages/HeartDiseasePrediction';
import CustomerChurn from './pages/CustomerChurn';
/*import FadeInSection from './components/FadeInSection'; */

// Create a separate component for your main content
function MainContent() {
  const navigate = useNavigate();
  
  return (
    <div className="App">
      <FadeInSection>
        <div className="main-content-section">
          <div className="content">
            <h1>Diego Gutierrez</h1>
            <p className="subtitle">Data Science and Economics @ UC Berkeley</p>
            <a href="mailto:dgutiluns@gmail.com" className="button">Contact Me</a>
          </div>
          <div className="image-wrapper">
            <div className="image-flipper">
              <span className="hover-label">Hover me</span>
              <img 
                src={`${process.env.PUBLIC_URL}/tree.png`} 
                alt="Scenic landscape with tree" 
                className="background-image"
              />
              <div className="image-back">
                <div className="back-content">
                  <div className="resume-header">
                    <span className="header-link">Diego Gutierrez</span>
                    <a href="https://www.linkedin.com/in/diego-gutierrez-06487020a/" className="header-link">LinkedIn</a>
                    <a href="mailto:dgutiluns@gmail.com" className="header-link">Email</a>
                    <a href="https://github.com" className="header-link">Github</a>
                  </div>

                  <div className="resume-content">
                    <div className="section-content">
                      <span className="back-title">About me</span>
                      <div className="description-frame">
                        <p className="back-description">
                          I'm passionate about leveraging data science to solve real-world problems. 
                          Currently studying at Berkeley, focusing on the intersection of economics and technology.
                        </p>
                      </div>
                    </div>
                    
                    <div className="section-content">
                      <span className="back-title">Work Experience</span>
                      <div className="description-frame">
                        <p className="back-description">
                          <a href="https://apollostudios.co.za/" className="company-link">Summer 2024, Apollo Studios</a> - 
                          Developed an automated email system to streamline communication processes and developed and intern anlicts dasboard to visualize and analyze key business metrics.
                        </p>
                        <p className="back-description experience-item">
                          <a href="https://www.vodacom.co.za/" className="company-link">Summer 2024, Vodacom</a> - 
                          Worked alongside industry experts to develop machine learning models to predict customer churn and improve customer retention.
                        </p>
                      </div>
                    </div>

                    <div className="section-content">
                      <span className="back-title">Other Activities</span>
                      <div className="description-frame">
                        <p className="back-description">
                          <span className="company-link">2024-Present, Open Project</span> - 
                          Developed an app used by UC Berkeley students to monitor study room availability, resulting in 30% fewer scheduling conflicts and 40% increased room utilization across campus discovered through student surveys.
                        </p>
                        <p className="back-description experience-item">
                          <span className="company-link">2023-Present, Latino Business Student Association</span> - 
                          Analysed club-wide survey data using Excel's data visualization tools and statistical functions to identify trends and provide actionable recommendations.
                        </p>
                      </div>
                    </div>

                    <div className="section-content">
                      <span className="back-title">Skills</span>
                      <div className="description-frame">
                        <p className="back-description">
                          Python, R, SQL, Data Visualization, JavaScript, React, Automation, Statistical Analysis, TensorFlow, PyTorch, Git, AWS, Excel, Power BI, Figma.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>

      <FadeInSection>
        <div className="projects-section">
          <h1>Projects</h1>
          <h2 className="section-subtitle-software">Software</h2>
          <div className="projects-container">
            <div className="project-card">
              <div className="project-content">
                <div className="project-image">
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="project-video-App"
                  >
                    <source src={`${process.env.PUBLIC_URL}/Apollo_Dashboard.mp4`} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <h2>Internal Analytics Dashboard</h2>
                <p>Developing a convenient and pleasing manner of presenting data</p>
              </div>
              <div className="expanded-content">
                <h2>Internal Analytics Dashboard</h2>
                <p>Full Stack Web Development</p>
                <p>Summer 2024</p>
                <p>A comprehensive analytics dashboard built to visualize and track key business metrics. Features interactive charts, real-time data updates, and customizable views for different user roles.</p>
                <Link 
                  to="/analytics-dashboard" 
                  className="view-button"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  View
                </Link>
              </div>
            </div>
            <div className="project-card">
              <div className="project-content">
                <div className="project-image">
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="project-video-App"
                  >
                    <source src={`${process.env.PUBLIC_URL}/auto_email.mp4`} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <h2>Automated Email System</h2>
                <p>Streamlines communication through automation</p>
              </div>
              <div className="expanded-content">
                <h2>Automated Email System</h2>
                <p>Backend Development & Automation</p>
                <p>Summer 2024</p>
                <p>An intelligent email automation system that handles scheduling, personalization, and delivery of mass communications. Includes template management, analytics tracking, and integration with existing workflows.</p>
                <Link 
                  to="/automated-email" 
                  className="view-button"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  View
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="projects-section">
          <h2 className="section-subtitle-data">Data Science</h2>
          <div className="projects-container">
            <div className="project-card">
              <div className="project-content">
                <div className="project-image">
                  <img 
                    src={process.env.PUBLIC_URL + '/heart_cover.png'}
                    alt="Heart Disease Prediction Project"
                    className="project-image-App"
                  />
                </div>
                <h2>Heart Disease Prediction Model</h2>
                <p>Data-driven healthcare insights through machine learning</p>
              </div>
              <div className="expanded-content">
                <h2>Heart Disease Prediction Model</h2>
                <p>Data Science & Machine Learning</p>
                <p>2024</p>
                <p>A comprehensive analysis of heart disease data using logistic regression. Features include data preprocessing, feature engineering, and model evaluation with ROC-AUC curves. The project demonstrates practical applications of statistical methods in healthcare predictions.</p>
                <Link 
                  to="/heart-disease-prediction" 
                  className="view-button"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  View
                </Link>
              </div>
            </div>
            <div className="project-card">
              <div className="project-content">
                <div className="project-image">
                  <img 
                    src={process.env.PUBLIC_URL + '/churn_pic.png'}
                    alt="Customer Churn Prediction Project"
                    className="project-image-App"
                  />
                </div>
                <h2>Customer Churn Model</h2>
                <p>Machine learning for customer retention optimization</p>
              </div>
              <div className="expanded-content">
                <h2>Customer Churn Model</h2>
                <p>Data Science & Machine Learning</p>
                <p>2024</p>
                <p>A comprehensive churn prediction system using XGBoost, achieving 93% accuracy through iterative model improvements and advanced feature engineering techniques.</p>
                <Link 
                  to="/customer-churn" 
                  className="view-button"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  View
                </Link>
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>

      <section className="about-section">
        <div className="about-content">
          <h1>Me</h1>
          <p>
            Hi, I am an aspiring data scientist and passionate for identifying and 
            solving challenging problems through data driven insights. I am 
            currently studying at UC Berkeley and am continuing to gain skills in 
            programming, data science, machine learning.
          </p>
          <p>
            I'm an international student born in Bolivia but grew up in Ghana, 
            Tanzania, and South Africa. My life is currently fuelled by golf, guitar, 
            and gym.
          </p>
          <p>
            I've built this portfolio to showcase the projects that I am most 
            proud of and that demonstrate my ability to apply technological, 
            statistical, analytical, and organisational skills.
          </p>
        </div>
        
        <div className="about-images">
          <div className="profile-image">
            <div className="image-flipper">
              <span className="hover-label">Hover me</span>
              <img 
                src={`${process.env.PUBLIC_URL}/couple.png`}
                alt="Couple" 
                className="background-image"
              />
              <div className="image-back">
                <div className="back-content">
                  <div className="resume-content">
                    <h2>Relevant Coursework</h2>
                    <p className="university">UC Berkeley</p>
                    <div className="courses-container">
                      <p>Foundations of Data Science</p>
                      <p>Intro to Programming</p>
                      <p>Data Structures and Algorithms</p>
                      <p>Calculus 1 and 2</p>
                      <p>Linear Algebra</p>
                      <p>Introduction to Probability and Statistics</p>
                      <p>Technology, Innovation, and Entrepreneurship</p>
                    </div>
                    <p className="university">Johns Hopkins University</p>
                    <div className="courses-container">
                      <p>Data Science Tool Box</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="profile-image">
            <div className="image-flipper">
              <img 
                src={`${process.env.PUBLIC_URL}/farm.png`}
                alt="Farm" 
                className="background-image"
              />
              <div className="image-back">
                <div className="back-content">
                  <div className="frog-message">
                    <h2>I didn't say "Hover Me"</h2>
                    <img 
                      src={`${process.env.PUBLIC_URL}/frog.png`}
                      alt="Frog" 
                      className="frog-image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FadeInSection(props) {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        setVisible(entry.isIntersecting);
      });
    }, {
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5],
      rootMargin: "-50px"
    });
    
    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
      ref={domRef}
    >
      {props.children}
    </div>
  );
}

// Main App component with routing
function App() {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/analytics-dashboard" element={<AnalyticsDashboard />} />
        <Route path="/automated-email" element={<AutomatedEmail />} />
        <Route path="/heart-disease-prediction" element={<HeartDiseasePrediction />} />
        <Route path="/customer-churn" element={<CustomerChurn />} />
      </Routes>
    </Router>
  );
}

export default App;