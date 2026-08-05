import { initChecker } from './components/checker.js';
import { initSimulator } from './components/simulator.js';
import { initQuiz } from './components/quiz.js';
import { initAnalyzer } from './components/analyzer.js';
import { initTue } from './components/tue.js';

// Application state
const appState = {
  currentRoute: 'home',
  theme: 'light'
};

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  setupNavigation();
  loadRoute(appState.currentRoute);
});

// Setup Light / Dark theme toggles
function initTheme() {
  const savedTheme = localStorage.getItem('clean-sport-theme') || 'light';
  setTheme(savedTheme);

  const themeToggleBtn = document.getElementById('theme-toggle');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const nextTheme = appState.theme === 'light' ? 'dark' : 'light';
      setTheme(nextTheme);
    });
  }
}

function setTheme(theme) {
  appState.theme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('clean-sport-theme', theme);
  
  // Update icon indicator
  const themeIcon = document.querySelector('#theme-toggle i');
  if (themeIcon) {
    if (theme === 'dark') {
      themeIcon.setAttribute('data-lucide', 'sun');
      themeIcon.classList.remove('text-primary');
      themeIcon.classList.add('text-warning');
    } else {
      themeIcon.setAttribute('data-lucide', 'moon');
      themeIcon.classList.remove('text-warning');
      themeIcon.classList.add('text-primary');
    }
    if (window.lucide) window.lucide.createIcons();
  }
}

// Router and Navigation logic
function setupNavigation() {
  const navLinks = document.querySelectorAll('.nav-link[data-route]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const route = link.getAttribute('data-route');
      
      // Update sidebar visual states
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      
      loadRoute(route);
    });
  });
}

function loadRoute(route) {
  appState.currentRoute = route;
  const viewport = document.getElementById('viewport-container');
  if (!viewport) return;

  // Set page headers dynamically
  const headerTitle = document.getElementById('header-title');
  if (headerTitle) {
    const routeTitles = {
      home: "Dashboard Overview",
      checker: "WADA Database Search",
      simulator: "Doping Control Simulation",
      quiz: "Anti-Doping Academy & Quiz",
      analyzer: "Supplement Contamination Analyzer",
      tue: "Therapeutic Exemption Helper"
    };
    headerTitle.textContent = routeTitles[route] || "CleanSport Portal";
  }

  // Render view
  switch (route) {
    case 'home':
      renderDashboard(viewport);
      break;
    case 'checker':
      initChecker(viewport);
      break;
    case 'simulator':
      initSimulator(viewport);
      break;
    case 'quiz':
      initQuiz(viewport);
      break;
    case 'analyzer':
      initAnalyzer(viewport);
      break;
    case 'tue':
      initTue(viewport);
      break;
    default:
      renderDashboard(viewport);
  }

  // Scroll to top of content
  const scrollContainer = document.querySelector('.content-viewport');
  if (scrollContainer) scrollContainer.scrollTop = 0;

  // Refresh Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function renderDashboard(container) {
  container.innerHTML = `
    <div class="hero-welcome-card fade-in">
      <div class="hero-content">
        <h1>CleanSport Tech Portal</h1>
        <p>Promoting athlete integrity and sports transparency through technology-driven anti-doping education. Empower yourself with information on regulations, procedures, and health preservation.</p>
        <button class="btn btn-primary" id="dashboard-learn-btn">
          Test Your Knowledge <i data-lucide="award" class="inline-icon"></i>
        </button>
      </div>
    </div>

    <div class="dashboard-sections-grid fade-in" style="animation-delay: 0.1s;">
      <div class="dashboard-action-card" data-target="checker">
        <div class="icon-wrapper primary-bg">
          <i data-lucide="search" class="icon-primary"></i>
        </div>
        <h3>Substance Search</h3>
        <p>Check the WADA status of prescription medicines, daily therapies, or active substances. Learn about legal alternatives and TUE options.</p>
        <span class="card-footer-link">Verify a Medication <i data-lucide="chevron-right" class="inline-icon"></i></span>
      </div>

      <div class="dashboard-action-card" data-target="simulator">
        <div class="icon-wrapper primary-bg">
          <i data-lucide="activity" class="icon-primary"></i>
        </div>
        <h3>Testing Simulator</h3>
        <p>Take an interactive walkthrough of the drug-testing procedure. Know your rights and duties during a Doping Control Officer visit.</p>
        <span class="card-footer-link">Simulate Testing <i data-lucide="chevron-right" class="inline-icon"></i></span>
      </div>

      <div class="dashboard-action-card" data-target="quiz">
        <div class="icon-wrapper primary-bg">
          <i data-lucide="graduation-cap" class="icon-primary"></i>
        </div>
        <h3>Anti-Doping Academy</h3>
        <p>Answer questions on Clean Sport values, rules, and WADA policies. Earn your certification by completing the core quiz.</p>
        <span class="card-footer-link">Start Academy <i data-lucide="chevron-right" class="inline-icon"></i></span>
      </div>

      <div class="dashboard-action-card" data-target="analyzer">
        <div class="icon-wrapper primary-bg">
          <i data-lucide="shield-alert" class="icon-primary"></i>
        </div>
        <h3>Supplement Analyzer</h3>
        <p>Evaluate the safety and contamination risks of sports supplements before consuming them. Understand the Strict Liability guidelines.</p>
        <span class="card-footer-link">Analyze Risk <i data-lucide="chevron-right" class="inline-icon"></i></span>
      </div>
    </div>

    <div class="card fade-in margin-top-lg" style="animation-delay: 0.2s;">
      <div class="card-header">
        <div class="card-title-group">
          <div class="icon-wrapper primary-bg">
            <i data-lucide="heart" class="icon-primary"></i>
          </div>
          <div>
            <h3>The Core Anti-Doping Values</h3>
            <p>Clean sport is not just about avoiding violations; it is about preserving health and fair competition.</p>
          </div>
        </div>
      </div>
      
      <div class="grid-3" style="margin-top: 1rem;">
        <div class="step-card">
          <h4><i data-lucide="shield-check" class="text-success inline-icon"></i> Strict Liability</h4>
          <p class="text-sm text-muted">You are 100% responsible for whatever enters your body. Accidental ingestion is not a defense under the WADA Code.</p>
        </div>
        <div class="step-card">
          <h4><i data-lucide="users" class="text-secondary inline-icon"></i> Spirit of Sport</h4>
          <p class="text-sm text-muted">Integrity, respect, community, excellence, and dedication. Clean sport values define true champions.</p>
        </div>
        <div class="step-card">
          <h4><i data-lucide="heart-pulse" class="text-danger inline-icon"></i> Health Protection</h4>
          <p class="text-sm text-muted">Many prohibited doping agents pose severe cardiovascular, endocrine, hepatic, and psychological health risks.</p>
        </div>
      </div>
    </div>
  `;

  // Bind direct card click links
  container.querySelectorAll('.dashboard-action-card').forEach(card => {
    card.addEventListener('click', () => {
      const targetRoute = card.getAttribute('data-target');
      navigateTo(targetRoute);
    });
  });

  const learnBtn = container.querySelector('#dashboard-learn-btn');
  if (learnBtn) {
    learnBtn.addEventListener('click', () => navigateTo('quiz'));
  }
}

// Global programmatic navigation helper
function navigateTo(route) {
  const link = document.querySelector(`.nav-link[data-route="${route}"]`);
  if (link) {
    link.click();
  } else {
    loadRoute(route);
  }
}
