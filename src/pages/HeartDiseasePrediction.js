import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProjectPage.css';

function HeartDiseasePrediction() {
  const [activeSection, setActiveSection] = useState('overview');
  const [menuVisible, setMenuVisible] = useState(false);

  const sections = [
    { id: 'overview', title: 'Overview' },
    { id: 'implementation', title: 'Implementation' },
    { id: 'data-preprocessing', title: 'Data Preprocessing' },
    { id: 'exploratory-analysis', title: 'Exploratory Data Analysis' },
    { id: 'feature-engineering', title: 'Feature Engineering' },
    { id: 'scaling-model', title: 'Scaling and Model' },
    { id: 'further-exploration', title: 'Further Exploration' },
    { id: 'results', title: 'Results & Impact' }
  ];

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
          
          // Show menu only after overview section
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

    // Hide menu when scrolling above overview
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
              <h1 className="project-title">Heart Disease<br />Prediction Model</h1>
              <div className="project-subtitle">
                <p>Data Science & Machine Learning</p>
                <p>2024</p>
              </div>
            </div>

            <div className="media-section">
              <div className="project-image-container">
                <img 
                  src={`${process.env.PUBLIC_URL}/heart_cover.png`}
                  alt="Heart Disease Prediction Project"
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
                  This project involves cleaning, exploring, and analyzing a heart disease dataset to build a predictive model using logistic regression. The dataset is preprocessed by encoding categorical variables, handling missing values, and resampling to address class imbalance. The final model predicts the likelihood of heart disease, and the project includes performance evaluation metrics like ROC-AUC, precision, and recall. Visualizations and feature engineering insights are also included to support the analysis.
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
                  The project was implemented in Python, following these steps:
                </p>
                <p className="section-text">
                  <strong>Data Loading and Preprocessing:</strong>
                </p>
                <p className="section-text">
                  The dataset was loaded into Pandas and preprocessed by handling missing values, encoding categorical variables (one-hot encoding), and addressing class imbalance with SMOTE.
                </p>
                <p className="section-text">
                  <strong>Feature Engineering and Scaling:</strong>
                </p>
                <p className="section-text">
                  New features (e.g., cholesterol/rest_bp) and interaction terms were added. Irrelevant features were removed based on EDA and correlation analysis. Numeric features were standardized using StandardScaler.
                </p>
                <p className="section-text">
                  <strong>Model Training and Evaluation:</strong>
                </p>
                <p className="section-text">
                  A logistic regression model was trained with Scikit-learn, and hyperparameters were tuned using grid search. The model was evaluated using metrics like ROC-AUC, precision, recall, and F1-score, with results visualized through ROC and precision-recall curves.
                </p>
                <p className="section-text">
                  <strong>Tools and Organization:</strong>
                </p>
                <p className="section-text">
                  Python libraries such as Pandas, Scikit-learn, and Seaborn were used for implementation and visualization. The project includes a Jupyter Notebook (Heart_Disease_Prediction.ipynb) and dataset files in an organized folder structure.
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
                  I used the data set from the University of California, Irvine Machine Learning Repository, and it provided me with 330 entries of patients with varying features. The following are some of the features from the data set: chest pain, resting heart rate, cholesterol level, and max heart rate.
                </p>
                <p className="section-text">
                  The first problem I encountered was missing values in the num_vessels feature. I considered either removing those five rows or the feature as a whole but found that there was already an imbalance in the distribution of the class labels, and removing these would remove more points for the 'sick' class. Therefore, I used median imputation to fill in the five missing values.
                </p>
                <p className="section-text">
                  To fix the imbalance in the class distribution, I used randomized undersampling which randomly selects the maximum number of instances from both classes so that the distribution is equal. This will ensure that the model isn't biased towards one of the classes which may lead to over prediction of one outcome over the other.
                </p>
                <p className="section-text">
                  The data had categorical variables that would not work with the logistic regression model. To overcome this issue I enumerated all the categorical variables that had values of true or false to 0 and 1. For features with more than two categories, I created new columns that would describe the presence of values through 0 and 1 values. This way the regression model can interact with these features.
                </p>
              </div>

              <div id="exploratory-analysis" className="content-section section-anchor">
                <div className="section-header">
                  <div className="line"></div>
                  <h2>Exploratory Data Analysis</h2>
                  <div className="line"></div>
                </div>
                <div className="underline"></div>
                <p className="section-text">
                  In my analysis, I investigated the distributions of all features to identify their variance and potential influence on heart disease prediction. I observed that features such as age, resting blood pressure (rest_bp), cholesterol, and maximum heart rate (max_hr) exhibit sufficient variance, which suggests that these variables could meaningfully contribute to the model. For example, the distribution of max_hr shows a clear difference in ranges for patients with and without heart disease, as reflected in the violin plot.
                </p>
                <div className="analysis-image-container">
                  <img 
                    src={`${process.env.PUBLIC_URL}/feature_distribution.png`}
                    alt="Feature Distribution Analysis"
                    className="analysis-image"
                  />
                </div>
                <p className="section-text">
                  The correlation matrix indicates moderate correlations between the target variable (class) and features like old peak, num_vessels, and max_hr, with num_vessels being the strongest positive correlate. This suggests that these features might carry predictive power. However, many features, such as cholesterol and rest_bp, show weaker correlations, implying limited linear relationships with the target, though they may still have non-linear impacts.
                </p>
                <div className="analysis-image-container">
                  <img 
                    src={`${process.env.PUBLIC_URL}/correlation_matrix.png`}
                    alt="Correlation Matrix"
                    className="analysis-image"
                  />
                </div>
                <p className="section-text">
                  From scatterplots like age vs cholesterol and rest_bp vs max_hr, I observed no strong clustering patterns that directly separate the two classes. However, certain trends suggest subtle distinctions that could help the model identify heart disease cases when combined with other features.
                </p>
                <p className="section-text">
                  Finally, the violin plots highlight distinctions in the distributions of features like max_hr and cholesterol between classes. For example, patients with heart disease tend to have lower max_hr, while cholesterol shows overlapping distributions, indicating that its predictive value might be less significant.
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
                  I began to explore the creation of new impactful features and investigate whether they had valuable predictive power. A potential feature I identified was the ratio between cholesterol and resting blood pressure. Although the feature holds relevance to the model, I found through an analysis of its interaction with other variables that it was not valuable for prediction. The feature had a very low correlation with the target variable which disregards the possibility of a linear correlation. I considered the existence of a non-linear correlation through the average cholesterol of blood pressure ratio in both classes and found that the averages were very close. This implied that the feature has low predictive power.
                </p>
              </div>

              <div id="scaling-model" className="content-section section-anchor">
                <div className="section-header">
                  <div className="line"></div>
                  <h2>Scaling and Model</h2>
                  <div className="line"></div>
                </div>
                <div className="underline"></div>
                <p className="section-text">
                  Prior to fitting the data to a model I scaled all the numerical values to make them more comparable. I fitted the training data into a logistic regression model imported from Sklearn and made predictions that resulted in an 84% accuracy and a 93% ROC-AUC value. The ROC-AUC value implied that the model was running into a few instances of false positives.
                </p>
              </div>

              <div id="further-exploration" className="content-section section-anchor">
                <div className="section-header">
                  <div className="line"></div>
                  <h2>Further Exploration</h2>
                  <div className="line"></div>
                </div>
                <div className="underline"></div>
                <p className="section-text">
                  This project could be expanded by exploring more advanced machine learning models such as Random Forests, Gradient Boosting (e.g., XGBoost), or Neural Networks, which can capture non-linear relationships between features and the target variable more effectively than logistic regression. Incorporating additional data sources, such as family medical history, lifestyle factors (e.g., smoking or exercise habits), or more detailed clinical measurements, could provide additional predictive power.
                </p>
                <p className="section-text">
                  Feature engineering could also be enhanced by creating more interaction terms or leveraging dimensionality reduction techniques like PCA to eliminate redundant features. Improving model accuracy could further involve hyperparameter optimization using grid search or Bayesian optimization and evaluating ensemble methods, such as stacking or bagging.
                </p>
                <p className="section-text">
                  Finally, cross-validation with a larger, more diverse dataset could ensure generalizability, while leveraging explainable AI techniques (e.g., SHAP values) could provide insights into feature importance and guide targeted refinements.
                </p>
              </div>

              <div id="results" className="content-section section-anchor">
                <div className="section-header">
                  <div className="line"></div>
                  <h2>Results & Impact</h2>
                  <div className="line"></div>
                </div>
                <div className="underline"></div>
                <p className="section-text">
                  The logistic regression model achieved robust performance in predicting heart disease, with evaluation metrics such as ROC-AUC, precision, and recall indicating a well-balanced trade-off between sensitivity and specificity. Addressing class imbalance through oversampling significantly improved the model's ability to detect the minority class (patients with heart disease), reducing the likelihood of false negatives.
                </p>
                <p className="section-text">
                  Exploratory data analysis and feature engineering helped identify key predictors, refining the model's accuracy while eliminating irrelevant features. The project demonstrates the importance of preprocessing techniques such as scaling, encoding, and handling imbalances in developing reliable predictive models.
                </p>
                <p className="section-text">
                  Beyond its technical accomplishments, this project highlights the practical utility of machine learning in healthcare, showcasing how data-driven approaches can aid in early detection and prevention of heart disease, ultimately improving patient outcomes.
                </p>
              </div>

              <div className="content-section">
                <div className="section-header">
                  <div className="line"></div>
                  <h2>Visual Gallery</h2>
                  <div className="line"></div>
                </div>
                <div className="underline"></div>
                <div className="gallery-grid">
                  {/* Images/charts will go here */}
                </div>
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

export default HeartDiseasePrediction; 