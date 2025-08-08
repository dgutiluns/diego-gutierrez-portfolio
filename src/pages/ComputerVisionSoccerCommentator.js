import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProjectPage.css';

function ComputerVisionSoccerCommentator() {
  const [activeSection, setActiveSection] = useState('overview');
  const [menuVisible, setMenuVisible] = useState(false);

  const sections = [
    { id: 'overview', title: 'Overview' },
    { id: 'objectives', title: 'Objectives' },
    { id: 'system-architecture', title: 'System Architecture' },
    { id: 'implementation', title: 'Implementation' },
    { id: 'engineering-practices', title: 'Engineering Practices' },
    { id: 'tools-libraries', title: 'Tools & Libraries' },
    { id: 'key-challenges', title: 'Key Challenges & Solutions' },
    { id: 'evaluation-deliverables', title: 'Evaluation & Visual Deliverables' },
    { id: 'results-learnings', title: 'Results & Learnings' },
    { id: 'current-status', title: 'Current Status' },
    { id: 'next-steps', title: 'Next Steps' },
    { id: 'selected-files', title: 'Selected Files' },
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
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
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
              <h1 className="project-title">Computer Vision<br />Soccer Commentator</h1>
              <div className="project-subtitle">
                <p>Computer Vision & Machine Learning</p>
                <p>2025</p>
              </div>
            </div>

            <div className="media-section">
              <div className="project-image-container">
                <img
                  src={`${process.env.PUBLIC_URL}/comm_heroimage.png`}
                  alt="Computer Vision Soccer Commentator Hero"
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
                  An end-to-end, modular computer-vision pipeline that detects players and the ball in broadcast soccer footage,
                  tracks identities across frames, segments the field, estimates homography, and lays the groundwork for event
                  understanding and AI-generated commentary with TTS. The system was built test-first, with human-interpretable
                  visual outputs and structured logs at every stage to accelerate debugging and evaluation.
                </p>
              </div>

              <div id="objectives" className="content-section section-anchor">
                <div className="section-header">
                  <div className="line"></div>
                  <h2>Objectives</h2>
                  <div className="line"></div>
                </div>
                <div className="underline"></div>
                <ul className="section-text">
                  <li>Standardize player detection and tracking across the project.</li>
                  <li>Validate a custom-trained ball detector against a Roboflow-hosted alternative.</li>
                  <li>Establish reliable field segmentation and homography estimation as prerequisites for event logic.</li>
                  <li>Produce clear, human-readable artifacts (videos, overlays, JSON logs) for rapid iteration and portfolio-ready evidence.</li>
                </ul>
              </div>

              <div id="system-architecture" className="content-section section-anchor">
                <div className="section-header">
                  <div className="line"></div>
                  <h2>System Architecture (Modular)</h2>
                  <div className="line"></div>
                </div>
                <div className="underline"></div>
                <ul className="section-text">
                  <li><strong>Player Detection & Tracking:</strong> Roboflow model + ByteTrack (standardized across project).</li>
                  <li><strong>Ball Detection:</strong> Custom YOLOv8 model integrated; Roboflow model used for comparison tests only.</li>
                  <li><strong>Field Segmentation:</strong> Classical CV pipeline with a Roboflow segmentation fallback/comparison path.</li>
                  <li><strong>Homography Estimation:</strong> Corner/line-based estimation with robust mapping and visualization utilities.</li>
                  <li><strong>Event Detector (scaffold):</strong> To consume per-frame results for passes, turnovers, etc.</li>
                  <li><strong>NLP & TTS (scaffolded):</strong> Commentary templates with gTTS/ElevenLabs interfaces.</li>
                  <li><strong>Orchestration:</strong> main_pipeline.py runs player + ball detection, annotates frames, and logs per-frame JSON.</li>
                </ul>
              </div>

              <div id="implementation" className="content-section section-anchor">
                <div className="section-header">
                  <div className="line"></div>
                  <h2>Implementation</h2>
                  <div className="line"></div>
                </div>
                <div className="underline"></div>

                <h3>Player Detection & Tracking</h3>
                <p className="section-text">
                  Adopted Roboflow-hosted player model (football-players-detection-3zvbc/12) via inference-sdk. Integrated
                  supervision.ByteTrack for stable, frame-to-frame IDs. Deprecated legacy merge_player_ids heuristics in favor
                  of ByteTrack (kept as deprecated for reference).
                </p>
                <div className="analysis-image-container">
                  <video 
                    className="analysis-image" 
                    controls 
                    preload="metadata" 
                    muted
                    onError={(e) => console.error('Video error:', e)}
                    onLoadStart={() => console.log('Video loading started')}
                    onCanPlay={() => console.log('Video can play')}
                  >
                    <source src={`${process.env.PUBLIC_URL}/player_tracking_bytetrack_comparison_portfolio_standard.mp4`} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>

                <h3>Ball Detection</h3>
                <p className="section-text">
                  Integrated custom YOLOv8 weights at runs/detect/model2/weights/best.pt via VisionDetector. Added optional
                  comparison against Roboflow ball model (football-ball-detection-rejhg/4) in unit tests.
                </p>

                <h3>Field Segmentation & Line/Corner Detection</h3>
                <p className="section-text">
                  Implemented a mask-based corner detection module with robust boundary point sampling, side grouping (image-relative),
                  RANSAC line fitting and confidence scoring, internal-line filtering, line extension to frame boundaries, and corner
                  intersection logic. Added a Roboflow-based field detector class to parse segmentation masks and polygons for comparison.
                </p>
                <div className="two-image-grid">
                  <img
                    src={`${process.env.PUBLIC_URL}/overlay_frame_0060_portfolio.png`}
                    alt="Overlay Example"
                    className="analysis-image"
                  />
                  <img
                    src={`${process.env.PUBLIC_URL}/frame_0070_mask_portfolio.png`}
                    alt="Mask Example"
                    className="analysis-image"
                  />
                </div>
                <div className="analysis-image-container">
                  <img
                    src={`${process.env.PUBLIC_URL}/frame_0010_corner_detection_portfolio.png`}
                    alt="Corner Detection"
                    className="analysis-image"
                  />
                </div>

                <h3>Homography</h3>
                <p className="section-text">
                  Fixed cv2.perspectiveTransform usage by reshaping points to (-1, 1, 2). Threaded a fallback_used flag through
                  field-corner extraction to track robustness. Added warped-grid visualization to validate homography quality.
                </p>

                <h3>Orchestration & Outputs</h3>
                <p className="section-text">
                  main_pipeline.py: sequential per-frame loop that detects players, tracks with ByteTrack, detects ball with custom model,
                  and writes an annotated MP4 and structured frame_results JSON (frame index, tracks, balls, placeholders for field/events).
                  Consistent outputs under tests/unit/outputs/ and outputs/main_pipeline/.
                </p>
              </div>

              <div id="engineering-practices" className="content-section section-anchor">
                <div className="section-header">
                  <div className="line"></div>
                  <h2>Engineering Practices</h2>
                  <div className="line"></div>
                </div>
                <div className="underline"></div>
                <ul className="section-text">
                  <li><strong>Environment:</strong> .env + python-dotenv; all commands standardized to python3.</li>
                  <li><strong>Pathing:</strong> defensive sys.path.insert in tests and robust os.path.abspath for model paths.</li>
                  <li><strong>Robust I/O:</strong> temp-file handling (flush, os.fsync) for API calls; JSON-safe serialization of NumPy types.</li>
                  <li><strong>Media:</strong> fixed green-screen/codec issues with FFmpeg-based video stitching for saved frame sequences.</li>
                </ul>
              </div>

              <div id="tools-libraries" className="content-section section-anchor">
                <div className="section-header">
                  <div className="line"></div>
                  <h2>Tools & Libraries</h2>
                  <div className="line"></div>
                </div>
                <div className="underline"></div>
                <p className="section-text">
                  Computer Vision: OpenCV (cv2), NumPy, Ultralytics YOLOv8, Supervision (ByteTrack). Cloud Inference: Roboflow
                  inference-sdk (with ROBOFLOW_API_KEY). Segmentation Utilities: pycocotools for RLE masks (with fallbacks). Aux:
                  python-dotenv, ffmpeg for reliable video assembly.
                </p>
              </div>

              <div id="key-challenges" className="content-section section-anchor">
                <div className="section-header">
                  <div className="line"></div>
                  <h2>Key Challenges and Solutions</h2>
                  <div className="line"></div>
                </div>
                <div className="underline"></div>
                <p className="section-text">
                  The development process was marked by several significant challenges that required creative solutions. Environment and import issues were among the first obstacles—the ModuleNotFoundError for the src module was a recurring problem that required systematic path management. I standardized sys.path inserts in tests and implemented absolute model paths to ensure consistent behavior across different execution contexts.
                </p>
                <p className="section-text">
                  Roboflow API integration presented multiple layers of complexity. Initial issues with malformed .env files and missing Content-Type headers required careful debugging and robust error handling. The solution involved clean key-value environment files, defensive temporary file management with proper flush and sync operations, and comprehensive error handling that gracefully degrades when API calls fail.
                </p>
                <p className="section-text">
                  Video output reliability became a significant challenge as the system grew more complex. Green frames and writer failures with certain codecs required a multi-layered approach. I experimented with multiple codec options before implementing an FFmpeg-based solution that provides deterministic video creation from saved frame sequences.
                </p>
                <p className="section-text">
                  Homography mapping required mathematical precision—the OpenCV transform assertion errors were caused by incorrect input shapes. The solution involved standardizing point reshaping to the correct format and adding grid visualization capabilities to validate results visually.
                </p>
                <p className="section-text">
                  JSON serialization issues with NumPy types required careful attention to data type conversion. The system now safely converts int64 and float64 types to native Python types before serialization, ensuring that all outputs are properly formatted for analysis and debugging.
                </p>
                <p className="section-text">
                  Perhaps the most complex challenge was corner detection robustness. Internal field markings were being misclassified as boundaries, and some frames had insufficient vertical line detection. The solution involved explicit internal-line filtering, improved confidence scoring, better side grouping algorithms, and relaxed thresholds when appropriate. Comprehensive visual debug overlays make it easy to understand when and why the system fails.
                </p>
              </div>

              <div id="evaluation-deliverables" className="content-section section-anchor">
                <div className="section-header">
                  <div className="line"></div>
                  <h2>Evaluation & Visual Deliverables</h2>
                  <div className="line"></div>
                </div>
                <div className="underline"></div>
                <p className="section-text">
                  Player Tracking: Roboflow + ByteTrack qualitatively outperformed YOLOv8 + legacy ID merging in continuity and stability across frames; results
                  visualized as annotated videos with persistent IDs. Ball Detection: Custom YOLOv8 detector integrated successfully and compared against Roboflow;
                  side-by-side annotated videos and per-frame logs were produced. Field Segmentation & Homography: Binary masks, overlays, and warped-grid visuals
                  were generated. Corner detection achieved mixed success on a 21-frame sample depending on parameters. Outputs organized in tests/unit/outputs/.
                </p>
              </div>

              <div id="results-learnings" className="content-section section-anchor">
                <div className="section-header">
                  <div className="line"></div>
                  <h2>Results & Learnings</h2>
                  <div className="line"></div>
                </div>
                <div className="underline"></div>
                <p className="section-text">
                  Standardizing on Roboflow + ByteTrack improved tracking reliability and simplified the codebase. The custom ball model integrates cleanly and
                  performs well on test clips while a Roboflow-based comparator accelerated evaluation. Field geometry in broadcast footage is challenging; the
                  mask-based approach plus diagnostic visuals created a strong foundation for iterative improvement. Investing in interpretable outputs and robust
                  I/O significantly sped up iteration and debugging.
                </p>
              </div>

              <div id="current-status" className="content-section section-anchor">
                <div className="section-header">
                  <div className="line"></div>
                  <h2>Current Status</h2>
                  <div className="line"></div>
                </div>
                <div className="underline"></div>
                <p className="section-text">
                  The system has reached a stable state with several components in production. Player detection and tracking using Roboflow + ByteTrack is the established path, providing reliable performance across varied conditions. Ball detection with the custom YOLOv8 model is integrated into the main pipeline, with Roboflow alternatives available for comparison.
                </p>
                <p className="section-text">
                  Field detection and homography estimation are active areas of improvement. The corner and line detection visualizations are in place, and homography mapping has been verified with corrected transforms. The orchestration system in main_pipeline.py processes videos end-to-end for players and ball detection, producing annotated videos and per-frame JSON logs.
                </p>
              </div>

              <div id="next-steps" className="content-section section-anchor">
                <div className="section-header">
                  <div className="line"></div>
                  <h2>Next Steps</h2>
                  <div className="line"></div>
                </div>
                <div className="underline"></div>
                <ul className="section-text">
                  <li>Improve corner/line detection under varied camera angles and occlusions; incorporate temporal smoothing.</li>
                  <li>Solidify homography estimation with better confidence gating and fallback logic.</li>
                  <li>Turn per-frame results into event streams and integrate commentary via templates + TTS.</li>
                  <li>Add quantitative metrics where labels are available (precision/recall, ID-switch/mOTA, corner accuracy).</li>
                </ul>
              </div>

              <div id="selected-files" className="content-section section-anchor">
                <div className="section-header">
                  <div className="line"></div>
                  <h2>Selected Files (for reviewers)</h2>
                  <div className="line"></div>
                </div>
                <div className="underline"></div>
                <ul className="section-text">
                  <li>src/vision/detector.py: Roboflow detectors and custom model integration.</li>
                  <li>src/vision/mask_based_corner_detection.py: mask-based line/corner pipeline and diagnostics.</li>
                  <li>src/vision/homography_auto.py: homography estimation, point mapping, warped grid.</li>
                  <li>src/main_pipeline.py: per-frame orchestration, annotated output, JSON logging.</li>
                  <li>tests/unit/field_detection_tests/test_mask_based_corner_detection.py: field/corner visualizations and stitched videos.</li>
                </ul>
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

export default ComputerVisionSoccerCommentator; 