import { QUIZ_QUESTIONS } from '../data.js';

export function initQuiz(container) {
  let state = {
    isStarted: false,
    currentQuestionIndex: 0,
    answers: {}, // questionId -> selectedIndex
    score: 0,
    isCompleted: false,
    userName: ""
  };

  function render() {
    if (!state.isStarted) {
      renderWelcome();
    } else if (state.isCompleted) {
      renderResults();
    } else {
      renderQuestion();
    }
  }

  function renderWelcome() {
    container.innerHTML = `
      <div class="card fade-in text-center max-width-md margin-auto">
        <div class="welcome-badge">
          <i data-lucide="award" class="icon-hero text-success"></i>
        </div>
        <h2>Clean Sport Education & Quiz</h2>
        <p class="margin-bottom-md text-muted">Test your knowledge on WADA regulations, rights and responsibilities, anti-doping rule violations, and supplement safety. Complete the quiz with a passing score of 80% to generate your Clean Sport Digital Certificate.</p>
        
        <div class="quiz-info-cards margin-bottom-lg">
          <div class="info-mini-card">
            <span class="info-val">5</span>
            <span class="info-lbl">Questions</span>
          </div>
          <div class="info-mini-card">
            <span class="info-val">80%</span>
            <span class="info-lbl">Passing Score</span>
          </div>
          <div class="info-mini-card">
            <span class="info-val">Active</span>
            <span class="info-lbl">Feedback</span>
          </div>
        </div>

        <div class="input-group max-width-xs margin-auto margin-bottom-md">
          <label for="athlete-name-input">Enter your full name for the certificate:</label>
          <input type="text" id="athlete-name-input" placeholder="e.g. Alex Johnson" class="form-control" />
        </div>

        <button id="start-quiz-btn" class="btn btn-primary btn-large">
          Start Educational Quiz <i data-lucide="play" class="inline-icon"></i>
        </button>
      </div>
    `;

    const startBtn = container.querySelector('#start-quiz-btn');
    const nameInput = container.querySelector('#athlete-name-input');
    
    startBtn.addEventListener('click', () => {
      const nameVal = nameInput.value.trim();
      if (!nameVal) {
        alert("Please enter your name to personalize your learning track and certificate.");
        nameInput.focus();
        return;
      }
      state.userName = nameVal;
      state.isStarted = true;
      state.currentQuestionIndex = 0;
      state.answers = {};
      state.score = 0;
      state.isCompleted = false;
      render();
    });

    if (window.lucide) window.lucide.createIcons();
  }

  function renderQuestion() {
    const q = QUIZ_QUESTIONS[state.currentQuestionIndex];
    const totalQ = QUIZ_QUESTIONS.length;
    const progressPct = ((state.currentQuestionIndex) / totalQ) * 100;
    const alreadyAnswered = state.answers[q.id] !== undefined;
    const selectedIdx = state.answers[q.id];

    container.innerHTML = `
      <div class="card fade-in">
        <div class="quiz-progress-header">
          <span class="quiz-step-label">Question ${state.currentQuestionIndex + 1} of ${totalQ}</span>
          <div class="quiz-progress-bar">
            <div class="quiz-progress-fill" style="width: ${progressPct}%"></div>
          </div>
        </div>

        <div class="quiz-layout">
          <div class="quiz-question-container">
            <h3 class="quiz-question-text">${q.question}</h3>
            
            <div class="quiz-options-list">
              ${q.options.map((opt, idx) => {
                let btnClass = "quiz-opt-btn";
                let statusIcon = "";
                
                if (alreadyAnswered) {
                  if (idx === q.answerIndex) {
                    btnClass += " correct";
                    statusIcon = `<i data-lucide="check-circle" class="text-success inline-icon float-right"></i>`;
                  } else if (idx === selectedIdx) {
                    btnClass += " incorrect";
                    statusIcon = `<i data-lucide="x-circle" class="text-danger inline-icon float-right"></i>`;
                  } else {
                    btnClass += " disabled";
                  }
                }

                return `
                  <button class="${btnClass}" data-idx="${idx}" ${alreadyAnswered ? 'disabled' : ''}>
                    <span class="opt-letter">${String.fromCharCode(65 + idx)}</span>
                    <span class="opt-text">${opt}</span>
                    ${statusIcon}
                  </button>
                `;
              }).join('')}
            </div>

            ${alreadyAnswered ? `
              <div class="explanation-box fade-in">
                <h4><i data-lucide="info" class="text-primary inline-icon"></i> Learning Insight:</h4>
                <p>${q.explanation}</p>
              </div>
            ` : ''}
          </div>
        </div>

        <div class="quiz-footer">
          <button id="quit-quiz-btn" class="btn btn-secondary text-danger">Quit</button>
          
          ${alreadyAnswered ? `
            <button id="next-question-btn" class="btn btn-primary">
              ${state.currentQuestionIndex === totalQ - 1 ? 'Finish Quiz' : 'Next Question'} 
              <i data-lucide="arrow-right" class="inline-icon"></i>
            </button>
          ` : ''}
        </div>
      </div>
    `;

    // Bind option click
    if (!alreadyAnswered) {
      container.querySelectorAll('.quiz-opt-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.getAttribute('data-idx'));
          state.answers[q.id] = idx;
          if (idx === q.answerIndex) {
            state.score++;
          }
          renderQuestion();
        });
      });
    } else {
      container.querySelector('#next-question-btn').addEventListener('click', () => {
        if (state.currentQuestionIndex < totalQ - 1) {
          state.currentQuestionIndex++;
          renderQuestion();
        } else {
          state.isCompleted = true;
          render();
        }
      });
    }

    container.querySelector('#quit-quiz-btn').addEventListener('click', () => {
      if (confirm("Are you sure you want to quit the quiz? Your progress will be lost.")) {
        state.isStarted = false;
        render();
      }
    });

    if (window.lucide) window.lucide.createIcons();
  }

  function renderResults() {
    const totalQ = QUIZ_QUESTIONS.length;
    const scorePct = (state.score / totalQ) * 100;
    const passed = scorePct >= 80;
    const dateStr = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    const certNumber = "CS-" + Math.floor(100000 + Math.random() * 900000);

    container.innerHTML = `
      <div class="card fade-in">
        <div class="text-center max-width-md margin-auto margin-bottom-lg">
          <div class="result-badge-container">
            ${passed ? `
              <div class="badge-success-hero pulse">
                <i data-lucide="award" class="large-hero-icon"></i>
              </div>
              <h2 class="text-success margin-top-sm">Congratulations, Clean Sport Advocate!</h2>
            ` : `
              <div class="badge-fail-hero">
                <i data-lucide="rotate-ccw" class="large-hero-icon"></i>
              </div>
              <h2 class="text-warning margin-top-sm">Keep Learning!</h2>
            `}
          </div>
          
          <p class="result-summary">You scored <strong>${state.score} out of ${totalQ}</strong> (${scorePct}%).</p>
          <p class="text-muted">
            ${passed 
              ? "You successfully demonstrated a strong understanding of clean sport values, testing rules, and athlete safety." 
              : "Review the answers below or try again to achieve the 80% score required to receive your Clean Sport digital certificate."}
          </p>
        </div>

        ${passed ? `
          <div class="certificate-wrapper glass fade-in" id="certificate-print-area">
            <div class="certificate-border">
              <div class="certificate-body">
                <div class="cert-logo-section">
                  <span class="cert-logo-text"><i data-lucide="shield" class="inline-icon text-success"></i> CLEAN SPORT ADVOCATE</span>
                </div>
                <h1 class="cert-heading">Certificate of Achievement</h1>
                <p class="cert-subtext">This certifies that</p>
                <h2 class="cert-athlete-name">${state.userName}</h2>
                <p class="cert-text">has successfully completed the instructional curriculum on <strong>Anti-Doping Regulations, Athlete Rights & Safe Sport Practices</strong> and is recognized as a clean sport advocate.</p>
                
                <div class="cert-footer-details">
                  <div class="cert-sign">
                    <span class="sign-title">CleanSport Tech Academy</span>
                    <span class="sign-desc">Authorized Educational Program</span>
                  </div>
                  
                  <div class="cert-info">
                    <div><span>Date:</span> ${dateStr}</div>
                    <div><span>Verification ID:</span> ${certNumber}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="text-center margin-bottom-lg">
            <button id="print-cert-btn" class="btn btn-secondary">
              <i data-lucide="printer" class="inline-icon"></i> Print Certificate
            </button>
          </div>
        ` : ''}

        <div class="detail-divider"></div>

        <div class="review-section">
          <h3>Question Review</h3>
          <div class="review-cards-list">
            ${QUIZ_QUESTIONS.map((q, qIdx) => {
              const userAnsIdx = state.answers[q.id];
              const isCorrect = userAnsIdx === q.answerIndex;
              
              return `
                <div class="review-item-card ${isCorrect ? 'review-correct' : 'review-incorrect'}">
                  <div class="review-question-header">
                    <span class="review-status-icon">
                      <i data-lucide="${isCorrect ? 'check' : 'alert-circle'}" class="${isCorrect ? 'text-success' : 'text-danger'}"></i>
                    </span>
                    <h4>Question ${qIdx + 1}: ${q.question}</h4>
                  </div>
                  <div class="review-choices-meta">
                    <p><strong>Your Answer:</strong> <span class="${isCorrect ? 'text-success' : 'text-danger'}">${q.options[userAnsIdx]}</span></p>
                    ${!isCorrect ? `<p><strong>Correct Answer:</strong> <span class="text-success">${q.options[q.answerIndex]}</span></p>` : ''}
                    <div class="review-explanation">
                      <strong>Insight:</strong> ${q.explanation}
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <div class="text-center margin-top-lg">
          <button id="retry-quiz-btn" class="btn btn-primary">
            <i data-lucide="rotate-ccw" class="inline-icon"></i> Try Quiz Again
          </button>
        </div>
      </div>
    `;

    container.querySelector('#retry-quiz-btn').addEventListener('click', () => {
      state.isStarted = false;
      render();
    });

    if (passed) {
      container.querySelector('#print-cert-btn').addEventListener('click', () => {
        window.print();
      });
    }

    if (window.lucide) window.lucide.createIcons();
  }

  render();
}
