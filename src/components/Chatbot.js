import React, { useState, useRef, useEffect } from 'react';
import aboutMeData from '../data/about_me.json';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 1,
          text: "Hi! I'm Diego's AI assistant. I can tell you about his background, experience, projects, and skills. What would you like to know?",
          sender: 'bot',
          timestamp: new Date()
        }
      ]);
    }
  }, [isOpen, messages.length]);

  // Simple AI response logic based on keywords and context
  const generateResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    // Check for specific questions about Diego
    if (input.includes('who are you') || input.includes('what can you do')) {
      return "I'm Diego's AI assistant! I can tell you about his background, education, work experience, projects, and skills. Feel free to ask me anything about Diego or his portfolio.";
    }
    
    // About Diego
    if (input.includes('about') && (input.includes('diego') || input.includes('you'))) {
      return aboutMeData.personal_info.about;
    }
    
    // Education
    if (input.includes('education') || input.includes('university') || input.includes('berkeley') || input.includes('course')) {
      const courses = aboutMeData.education.courses.uc_berkeley.join(', ');
      return `Diego is currently studying ${aboutMeData.education.current.degree} at ${aboutMeData.education.current.institution}. His relevant coursework includes: ${courses}.`;
    }
    
    // Work experience
    if (input.includes('work') || input.includes('experience') || input.includes('intern') || input.includes('job')) {
      const latestExp = aboutMeData.work_experience[0];
      return `Diego's most recent experience was as a ${latestExp.position} at ${latestExp.company} (${latestExp.duration}). ${latestExp.achievements[0]}`;
    }
    
    // Projects
    if (input.includes('project') || input.includes('portfolio')) {
      const allProjects = [...aboutMeData.projects.software, ...aboutMeData.projects.data_science];
      const projectNames = allProjects.map(p => p.name).join(', ');
      return `Diego has worked on several projects including: ${projectNames}. Would you like to know more about any specific project?`;
    }
    
    // Skills
    if (input.includes('skill') || input.includes('technology') || input.includes('programming')) {
      const skills = [
        ...aboutMeData.skills.programming_languages,
        ...aboutMeData.skills.data_science.slice(0, 5)
      ].join(', ');
      return `Diego's key skills include: ${skills}. He's proficient in data science, machine learning, and web development technologies.`;
    }
    
    // Specific project queries
    if (input.includes('soccer') || input.includes('computer vision')) {
      const project = aboutMeData.projects.data_science.find(p => p.name.includes('Soccer'));
      return `${project.name}: ${project.description}`;
    }
    
    if (input.includes('heart') || input.includes('disease')) {
      const project = aboutMeData.projects.data_science.find(p => p.name.includes('Heart'));
      return `${project.name}: ${project.description}`;
    }
    
    if (input.includes('churn') || input.includes('customer')) {
      const project = aboutMeData.projects.data_science.find(p => p.name.includes('Churn'));
      return `${project.name}: ${project.description}`;
    }
    
    if (input.includes('dashboard') || input.includes('analytics')) {
      const project = aboutMeData.projects.software.find(p => p.name.includes('Dashboard'));
      return `${project.name}: ${project.description}`;
    }
    
    if (input.includes('email') || input.includes('automation')) {
      const project = aboutMeData.projects.software.find(p => p.name.includes('Email'));
      return `${project.name}: ${project.description}`;
    }
    
    // Contact information
    if (input.includes('contact') || input.includes('email') || input.includes('linkedin')) {
      return `You can reach Diego at ${aboutMeData.personal_info.email} or connect with him on LinkedIn: ${aboutMeData.personal_info.linkedin}`;
    }
    
    // Location/background
    if (input.includes('where') || input.includes('location') || input.includes('bolivia') || input.includes('ghana') || input.includes('africa')) {
      return aboutMeData.personal_info.location;
    }
    
    // Interests/hobbies
    if (input.includes('hobby') || input.includes('interest') || input.includes('golf') || input.includes('guitar') || input.includes('gym')) {
      const interests = aboutMeData.personal_info.interests.join(', ');
      return `Diego's current interests include: ${interests}.`;
    }
    
    // Default response
    return "I'm not sure I understand that question. Try asking about Diego's background, education, work experience, projects, skills, or contact information. You can also ask about specific projects like the Computer Vision Soccer Commentator or Heart Disease Prediction Model.";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay for more natural feel
    setTimeout(() => {
      const botResponse = generateResponse(inputValue);
      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button 
        className={`chat-toggle ${isOpen ? 'open' : ''}`}
        onClick={toggleChat}
        aria-label="Toggle chat"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H6L4 18V4H20V16Z" fill="currentColor"/>
        </svg>
        {!isOpen && <span className="chat-label">Ask me anything!</span>}
      </button>

      {/* Chat Interface */}
      {isOpen && (
        <div className="chat-container">
          <div className="chat-header">
            <h3>Diego's AI Assistant</h3>
            <button 
              className="close-button"
              onClick={toggleChat}
              aria-label="Close chat"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor"/>
              </svg>
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
              >
                <div className="message-content">
                  {message.text}
                </div>
                <div className="message-timestamp">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message bot-message">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-container">
            <div className="input-wrapper">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about Diego..."
                className="chat-input"
                rows="1"
              />
              <button 
                onClick={handleSendMessage}
                className="send-button"
                disabled={!inputValue.trim()}
                aria-label="Send message"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="currentColor"/>
                </svg>
              </button>
            </div>
            <div className="chat-suggestions">
              <span>Try asking about:</span>
              <button onClick={() => setInputValue("Tell me about Diego's background")}>
                Background
              </button>
              <button onClick={() => setInputValue("What projects has Diego worked on?")}>
                Projects
              </button>
              <button onClick={() => setInputValue("What are Diego's skills?")}>
                Skills
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
