#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const aboutMePath = path.join(__dirname, 'src', 'data', 'about_me.json');

function loadAboutMe() {
  try {
    const data = fs.readFileSync(aboutMePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading about_me.json:', error.message);
    process.exit(1);
  }
}

function saveAboutMe(data) {
  try {
    fs.writeFileSync(aboutMePath, JSON.stringify(data, null, 2));
    console.log('✅ Successfully updated about_me.json');
  } catch (error) {
    console.error('Error saving about_me.json:', error.message);
    process.exit(1);
  }
}

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function updateWorkExperience() {
  const aboutMe = loadAboutMe();
  
  console.log('\n📝 Adding new work experience...');
  
  const company = await question('Company name: ');
  const position = await question('Position: ');
  const duration = await question('Duration (e.g., "Jan 2025 – May 2025"): ');
  const url = await question('Company URL (optional, press Enter to skip): ');
  
  const achievements = [];
  console.log('\nEnter achievements (press Enter twice when done):');
  let achievement;
  do {
    achievement = await question('Achievement: ');
    if (achievement.trim()) {
      achievements.push(achievement.trim());
    }
  } while (achievement.trim());
  
  const newExperience = {
    company,
    position,
    duration,
    achievements,
    ...(url && { url })
  };
  
  aboutMe.work_experience.unshift(newExperience);
  saveAboutMe(aboutMe);
}

async function updateProjects() {
  const aboutMe = loadAboutMe();
  
  console.log('\n🚀 Adding new project...');
  
  const name = await question('Project name: ');
  const type = await question('Project type (e.g., "Data Science & Machine Learning"): ');
  const period = await question('Period (e.g., "2024"): ');
  const description = await question('Description: ');
  
  const technologies = [];
  console.log('\nEnter technologies (press Enter twice when done):');
  let tech;
  do {
    tech = await question('Technology: ');
    if (tech.trim()) {
      technologies.push(tech.trim());
    }
  } while (tech.trim());
  
  const url = await question('Project URL (optional, press Enter to skip): ');
  
  const category = await question('Category (software/data_science): ');
  
  const newProject = {
    name,
    type,
    period,
    description,
    technologies,
    ...(url && { url })
  };
  
  if (category === 'software') {
    aboutMe.projects.software.push(newProject);
  } else {
    aboutMe.projects.data_science.push(newProject);
  }
  
  saveAboutMe(aboutMe);
}

async function updateSkills() {
  const aboutMe = loadAboutMe();
  
  console.log('\n💻 Adding new skills...');
  
  const category = await question('Skill category (programming_languages/data_science/business_intelligence/cloud_platforms/other_tools): ');
  const skills = await question('Skills (comma-separated): ');
  
  if (aboutMe.skills[category]) {
    aboutMe.skills[category].push(...skills.split(',').map(s => s.trim()));
    saveAboutMe(aboutMe);
  } else {
    console.log('❌ Invalid category. Available categories:', Object.keys(aboutMe.skills).join(', '));
  }
}

async function updatePersonalInfo() {
  const aboutMe = loadAboutMe();
  
  console.log('\n👤 Updating personal information...');
  
  const field = await question('Field to update (name/title/university/email/linkedin/github/location/about): ');
  const value = await question('New value: ');
  
  if (aboutMe.personal_info.hasOwnProperty(field)) {
    aboutMe.personal_info[field] = value;
    saveAboutMe(aboutMe);
  } else {
    console.log('❌ Invalid field. Available fields:', Object.keys(aboutMe.personal_info).join(', '));
  }
}

async function main() {
  console.log('🤖 Diego\'s Portfolio Update Tool');
  console.log('================================\n');
  
  console.log('What would you like to update?');
  console.log('1. Add new work experience');
  console.log('2. Add new project');
  console.log('3. Add new skills');
  console.log('4. Update personal information');
  console.log('5. Exit');
  
  const choice = await question('\nEnter your choice (1-5): ');
  
  switch (choice) {
    case '1':
      await updateWorkExperience();
      break;
    case '2':
      await updateProjects();
      break;
    case '3':
      await updateSkills();
      break;
    case '4':
      await updatePersonalInfo();
      break;
    case '5':
      console.log('👋 Goodbye!');
      break;
    default:
      console.log('❌ Invalid choice. Please try again.');
  }
  
  rl.close();
}

main().catch(console.error);
