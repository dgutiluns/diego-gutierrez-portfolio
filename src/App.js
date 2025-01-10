import './App.css';

function App() {
  return (
    <div className="App">
      <div className="content">
        <h1>Diego Guiterriez</h1>
        <p className="subtitle">Data Science and Economics @Berkeley</p>
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
                <span className="header-link">Diego Guiterriez</span>
                <a href="https://linkedin.com" className="header-link">LinkedIn</a>
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
                      Analyzed large datasets to identify patterns and trends, developing machine learning models to optimize business processes and improve decision-making efficiency.
                    </p>
                    <p className="back-description experience-item">
                      <a href="https://www.vodacom.co.za/" className="company-link">Summer 2024, Vodacom</a> - 
                      Implemented advanced fraud detection algorithms and developed real-time monitoring systems to protect customer transactions and prevent financial losses.
                    </p>
                  </div>
                </div>

                <div className="section-content">
                  <span className="back-title">Other Activities</span>
                  <div className="description-frame">
                    <p className="back-description">
                      <span className="company-link">2023-Present, Berkeley Data Science Society</span> - 
                      Led weekly workshops on machine learning applications and organized hackathons for 100+ students.
                    </p>
                    <p className="back-description experience-item">
                      <span className="company-link">2022-2023, Economics Research Club</span> - 
                      Conducted research on market trends and presented findings at undergraduate research symposium.
                    </p>
                  </div>
                </div>

                <div className="section-content">
                  <span className="back-title">Skills</span>
                  <div className="description-frame">
                    <p className="back-description">
                      Python, R, SQL, Machine Learning, Data Visualization, Statistical Analysis, TensorFlow, PyTorch, Git, AWS, Excel, Power BI
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
