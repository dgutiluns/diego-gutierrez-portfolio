import React, { useEffect, useState } from 'react';
import '../styles/theme.css';
import { Link } from 'react-router-dom';
import '../styles/ProjectPage.css';
import ThemeToggle from '../components/ThemeToggle';
import FloatingOrbs from '../components/FloatingOrbs';

function CustomerChurn() {
  const [activeSection, setActiveSection] = useState('overview');
  const [menuVisible, setMenuVisible] = useState(false);

  const sections = [
    { id: 'overview', title: 'Overview' },
    { id: 'implementation', title: 'Implementation' },
    { id: 'data-preprocessing', title: 'Data Preprocessing' },
    { id: 'exploratory-analysis', title: 'Exploratory Analysis' },
    { id: 'feature-engineering', title: 'Feature Engineering' },
    { id: 'model', title: 'Model' },
    { id: 'further-exploration', title: 'Further Exploration' }
  ];

  // Same useEffect logic as HeartDiseasePrediction
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
          if (entry.target.id === 'overview' || menuVisible) {
            setMenuVisible(true);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    const handleScroll = () => {
      const overviewSection = document.getElementById('overview');
      if (overviewSection) {
        const rect = overviewSection.getBoundingClientRect();
        if (rect.top > window.innerHeight) {
          setMenuVisible(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [menuVisible]);

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({
      behavior: 'smooth'
    });
  };

  const getItemClassName = (itemId) => {
    const currentIndex = sections.findIndex(section => section.id === activeSection);
    const itemIndex = sections.findIndex(section => section.id === itemId);
    const distance = Math.abs(currentIndex - itemIndex);
    
    let className = 'side-menu-item';
    
    if (itemId === activeSection) {
      className += ' active';
    } else if (distance === 1) {
      className += ' distance-1';
    } else if (distance === 2) {
      className += ' distance-2';
    } else {
      className += ' distance-3';
    }
    
    return className;
  };

  return (
    <div className="project-page">
      {/* Theme Toggle - Top Left */}
      <ThemeToggle />
      
      {/* Floating Orbs Background - Covers entire page */}
      <div className="full-page-background">
        <FloatingOrbs />
      </div>
      
      <div className="project-container">
        <nav className={`side-menu ${menuVisible ? 'visible' : ''}`}>
          <ul className="side-menu-list">
            {sections.map(({ id, title }) => (
              <li
                key={id}
                className={getItemClassName(id)}
                onClick={() => scrollToSection(id)}
              >
                {title}
              </li>
            ))}
          </ul>
        </nav>

        <div className="main-content">
          <div className="dashboard-container">
            <div className="title-section">
              <h1 className="project-title">Customer Churn<br />Prediction Model</h1>
              <div className="project-subtitle">
                <p>Data Science & Machine Learning</p>
                <p>2024</p>
              </div>
            </div>

            <div className="media-section">
              <div className="project-image-container">
                <img 
                  src={`${process.env.PUBLIC_URL}/churn_pic.png`}
                  alt="Customer Churn Prediction Project"
                  className="project-header-image"
                />
              </div>
            </div>

            <div className="content-section">
              <div id="overview" className="content-section section-anchor">
                <div className="section-header">
                  <div className="line"></div>
                  <h2>Overview</h2>
                  <div className="line"></div>
                </div>
                <div className="underline"></div>
                <p className="section-text">
                  Predicting customer churn is critical for businesses aiming to improve retention strategies. 
                  This project implements a churn prediction model using machine learning, refining the approach 
                  across four iterations to enhance accuracy and balance between precision and recall. Initially, 
                  a basic logistic regression model was deployed, and through iterative improvements—including 
                  data balancing, feature engineering, imputation strategies, and model selection—the final model 
                  achieved an accuracy of 93% using XGBoost.
                </p>
              </div>

              <div id="implementation" className="content-section section-anchor">
                <div className="section-header">
                  <div className="line"></div>
                  <h2>Implementation</h2>
                  <div className="line"></div>
                </div>
                <div className="underline"></div>
                <p className="section-text">
                  The project follows a structured machine learning pipeline:
                </p>
                <p className="section-text">
                  <strong>Data Preprocessing:</strong> Handling missing values, balancing dataset, encoding categorical variables.
                </p>
                <p className="section-text">
                  <strong>Exploratory Data Analysis (EDA):</strong> Understanding feature distributions, correlations, and importance.
                </p>
                <p className="section-text">
                  <strong>Feature Engineering:</strong> Dropping low-importance features, introducing relevant interactions.
                </p>
                <p className="section-text">
                  <strong>Modeling & Evaluation:</strong> Starting with logistic regression, transitioning to XGBoost, and fine-tuning with cross-validation.
                </p>
              </div>

              <div id="data-preprocessing" className="content-section section-anchor">
                <div className="section-header">
                  <div className="line"></div>
                  <h2>Data Preprocessing</h2>
                  <div className="line"></div>
                </div>
                <div className="underline"></div>
                <p className="section-text">
                  In the first iteration, all 1856 rows containing missing values were dropped, categorical features were encoded, and a simple logistic regression model was trained. However, the imbalance in churn vs. non-churn entries (173 vs. 892) caused misleading accuracy.
                </p>
                <p className="section-text">
                  The model achieved 87.14% accuracy, but the precision for churn was only 72%, and recall was 34%, meaning the model was biased towards predicting non-churn cases. To address this, the second iteration aimed to retain missing values and apply an undersampling strategy.
                </p>
                <div className="analysis-image-container">
                  <img 
                    src={`${process.env.PUBLIC_URL}/correlation_matrix_churn.png`}
                    alt="Correlation Matrix for Churn Analysis"
                    className="analysis-image hover-shadow"
                  />
                </div>
                <p className="section-text">
                  Churned and non-churned instances were separated, and non-churned cases with fewer missing values were selected. Imputation techniques were applied based on distributions and correlations, followed by one-hot encoding of categorical variables.
                </p>
                <p className="section-text">
                  This approach balanced the dataset and led to a more reliable model, achieving an accuracy of 81.58%, with precision for churn at 83% and recall at 82%. The first model presented high accuracy but more so by coincidence. The accuracy was high but the precision was low (34%), meaning that the model would predict most cases as non-churners correctly because most data points are non-chruners so the chance of getting it wrong is low.
                </p>
              </div>

              <div id="exploratory-analysis" className="content-section section-anchor">
                <div className="section-header">
                  <div className="line"></div>
                  <h2>Exploratory Analysis</h2>
                  <div className="line"></div>
                </div>
                <div className="underline"></div>
                <p className="section-text">
                  The dataset initially had a churn rate of 16.84%. Dropping missing values in the first iteration removed 33.4% of churned customers, which significantly affected the model's ability to predict churn. Feature correlation analysis helped determine which variables were useful for imputation and model prediction.
                </p>
                <p className="section-text">
                  Having run basic models through the iterative process allowed me to get a gauge of what features hold the most importance. Following the third model I found the feature importance as shown below and tuned the parameters to exclude variables that hold a less than 0.1 importance rating. Through changing this parameter I noticed a decrease in accuracy when i excluded too many but 0.1 created the best balance.
                </p>
              </div>

              <div id="feature-engineering" className="content-section section-anchor">
                <div className="section-header">
                  <div className="line"></div>
                  <h2>Feature Engineering</h2>
                  <div className="line"></div>
                </div>
                <div className="underline"></div>
                <p className="section-text">
                  With a balanced dataset in place, the third iteration focused on model selection. XGBoost was chosen over logistic regression due to its ability to capture non-linear relationships. Unlike logistic regression, XGBoost does not require scaling and can handle raw feature values effectively.
                </p>
                <p className="section-text">
                  This change significantly improved performance, achieving an accuracy of 92.63%, with precision and recall for churn at 92% and 94%, respectively. In the fourth iteration, feature optimization was performed by analyzing XGBoost's feature importance scores.
                </p>
                <div className="analysis-image-container">
                  <img 
                    src={`${process.env.PUBLIC_URL}/feature_importance.png`}
                    alt="Feature Importance Analysis"
                    className="analysis-image hover-shadow"
                  />
                </div>
                <p className="section-text">
                  Features below a 0.1 threshold were removed. While this did not change the model's performance, removing more features led to a drop in accuracy. To further improve robustness, 5-fold cross-validation was implemented, ensuring the model generalizes well across different subsets of the data.
                </p>
              </div>

              <div id="model" className="content-section section-anchor">
                <div className="section-header">
                  <div className="line"></div>
                  <h2>Model</h2>
                  <div className="line"></div>
                </div>
                <div className="underline"></div>
                <p className="section-text">
                  The final XGBoost model was optimized through hyperparameter tuning using GridSearchCV to find the best parameters. Cross-validation confirmed the model's consistency across different data splits. Feature selection ensured only relevant variables contributed to predictions, reducing noise and enhancing interpretability.
                </p>
                <div className="image-grid">
                  <div className="grid-image-container">
                    <img 
                      src={`${process.env.PUBLIC_URL}/confusion_1.png`}
                      alt="Confusion Matrix 1"
                      className="grid-image hover-shadow"
                    />
                  </div>
                  <div className="grid-image-container">
                    <img 
                      src={`${process.env.PUBLIC_URL}/confusion_2.png`}
                      alt="Confusion Matrix 2"
                      className="grid-image hover-shadow"
                    />
                  </div>
                  <div className="grid-image-container">
                    <img 
                      src={`${process.env.PUBLIC_URL}/confusion_4.png`}
                      alt="Confusion Matrix 4"
                      className="grid-image hover-shadow"
                    />
                  </div>
                </div>
              </div>

              <div id="further-exploration" className="content-section section-anchor">
                <div className="section-header">
                  <div className="line"></div>
                  <h2>Further Exploration</h2>
                  <div className="line"></div>
                </div>
                <div className="underline"></div>
                <p className="section-text">
                  Future improvements could include additional feature engineering, such as creating ratio-based features like orderCount/Tenure, testing alternative sampling methods like SMOTE, and using SHAP values for interpretability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="back-button-container">
        <Link to="/" className="back-button">
          <span className="back-arrow">←</span> Back to Home
        </Link>
      </div>
    </div>
  );
}

export default CustomerChurn; 