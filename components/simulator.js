import { SIMULATOR_STEPS } from '../data.js';

export function initSimulator(container) {
  let currentStepIndex = 0;
  
  // Custom interactive scenarios for each step to test the athlete's understanding in real-time.
  const stepScenarios = {
    0: {
      question: "Scenario: A Chaperone approaches you after your race. What is your immediate obligation?",
      choices: [
        { text: "Agree, sign the notification, and ensure the chaperone keeps you in sight.", correct: true, feedback: "Correct! You must sign and remain in direct sight at all times." },
        { text: "Ask if you can go back to your changing room alone for 10 minutes.", correct: false, feedback: "Incorrect. You cannot be left alone. Doing so is an Anti-Doping Rule Violation (ADRV)." },
        { text: "Refuse to sign until you've spoken with your lawyer.", correct: false, feedback: "Incorrect. Refusal to sign or comply is a major violation and can carry a 4-year ban." }
      ]
    },
    1: {
      question: "Scenario: You want to delay reporting to the Station to attend a press interview. Is this allowed?",
      choices: [
        { text: "No, you must report immediately, no exceptions.", correct: false, feedback: "Incorrect. There are certain permitted reasons for delay, such as media commitments, if accompanied." },
        { text: "Yes, but you must request a delay from the Chaperone, who must accompany you.", correct: true, feedback: "Correct! Media commitments are a valid reason for delay under chaperone supervision." },
        { text: "Yes, you can tell the chaperone to meet you at the station in an hour.", correct: false, feedback: "Incorrect. You must never lose contact with your chaperone." }
      ]
    },
    2: {
      question: "Scenario: The DCO offers you a pre-opened collection cup to speed up the process. What should you do?",
      choices: [
        { text: "Accept it to get the test completed quickly.", correct: false, feedback: "Incorrect. Never accept an opened cup. It could be contaminated." },
        { text: "Refuse, and select a individually sealed vessel yourself from at least three choices.", correct: true, feedback: "Correct! It is your right to select from multiple sealed vessels yourself." },
        { text: "Wipe the cup with a towel and use it anyway.", correct: false, feedback: "Incorrect. This does not guarantee purity. Always demand a new sealed kit." }
      ]
    },
    3: {
      question: "Scenario: Before providing the urine sample, what hygiene requirement is mandatory?",
      choices: [
        { text: "Wash your hands thoroughly with soap.", correct: false, feedback: "Incorrect. Wash with water only. Soap can introduce chemical residues that alter sample results." },
        { text: "Wash your hands with water only.", correct: true, feedback: "Correct! Hand washing with water only is required to prevent contamination of the sample." },
        { text: "Nothing, hand washing is optional.", correct: false, feedback: "Incorrect. Clean hands are necessary to ensure sample integrity." }
      ]
    },
    4: {
      question: "Scenario: You are sealing your 'A' and 'B' bottles. Who must perform this step?",
      choices: [
        { text: "The DCO must seal the bottles to ensure clinical standards.", correct: false, feedback: "Incorrect. You (the athlete) should seal them to guarantee no one else has tampered with your sample." },
        { text: "Your coach should seal them.", correct: false, feedback: "Incorrect. The athlete should do it directly unless they request help." },
        { text: "You (the athlete) must seal the bottles until they lock and click.", correct: true, feedback: "Correct! The athlete seals the bottles to maintain custody and assure transparency." }
      ]
    },
    5: {
      question: "Scenario: The DCO tells you your sample is too diluted. What happens next?",
      choices: [
        { text: "You fail the drug test immediately.", correct: false, feedback: "Incorrect. Dilution is not an automatic failure, but requires another sample." },
        { text: "The DCO discards the sample and lets you go home.", correct: false, feedback: "Incorrect. Even diluted samples are sent to the lab, but you must provide a new concentrated sample first." },
        { text: "You must wait and provide a new sample of suitable concentration.", correct: true, feedback: "Correct! You'll wait to provide another sample. Both are sent to the laboratory." }
      ]
    },
    6: {
      question: "Scenario: You forgot you took an over-the-counter cold pill 5 days ago. What should you do?",
      choices: [
        { text: "Do not mention it; it's a minor medication and might look suspicious.", correct: false, feedback: "Incorrect. Failing to declare meds can create issues if a substance is detected." },
        { text: "Declare it on the Doping Control Form under 'Medications/Supplements'.", correct: true, feedback: "Correct! Always list all medications, vitamins, and supplements taken in the last 7 days." },
        { text: "Call your doctor from the station to delete their clinic record.", correct: false, feedback: "Incorrect. Complete transparency on the form is your primary protection." }
      ]
    }
  };

  function render() {
    const stepData = SIMULATOR_STEPS[currentStepIndex];
    const scenario = stepScenarios[currentStepIndex];

    container.innerHTML = `
      <div class="card fade-in">
        <div class="card-header">
          <div class="card-title-group">
            <div class="icon-wrapper primary-bg">
              <i data-lucide="activity" class="icon-primary"></i>
            </div>
            <div>
              <h2>Interactive Doping Control Simulator</h2>
              <p>Walk through a step-by-step simulation of a drug testing session. Learn your rights and obligations.</p>
            </div>
          </div>
        </div>

        <div class="timeline-stepper">
          <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width: ${(currentStepIndex / (SIMULATOR_STEPS.length - 1)) * 100}%"></div>
          </div>
          <div class="stepper-nodes">
            ${SIMULATOR_STEPS.map((s, idx) => `
              <button class="step-node ${idx === currentStepIndex ? 'active' : idx < currentStepIndex ? 'completed' : ''}" data-step="${idx}" title="${s.title}">
                <span>${s.step}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <div class="simulator-layout">
          <div class="simulator-main">
            <div class="step-indicator-title">
              <span class="step-badge">Step ${stepData.step} of ${SIMULATOR_STEPS.length}</span>
              <h3>${stepData.title}</h3>
            </div>
            
            <p class="step-intro">${stepData.description}</p>
            
            <div class="step-points-grid">
              <div class="step-card">
                <h4><i data-lucide="check-square" class="inline-icon text-success"></i> Doping Control Procedures</h4>
                <ul>
                  ${stepData.keyPoints.map(pt => `<li>${pt}</li>`).join('')}
                </ul>
              </div>
              <div class="step-card">
                <h4><i data-lucide="award" class="inline-icon text-secondary"></i> ${stepData.rightsTitle}</h4>
                <ul>
                  ${stepData.rights.map(rt => `<li>${rt}</li>`).join('')}
                </ul>
              </div>
            </div>
          </div>

          <div class="simulator-sidebar">
            <div class="scenario-panel glass">
              <h4 class="scenario-title"><i data-lucide="help-circle" class="text-primary inline-icon"></i> Decision Scenario</h4>
              <p class="scenario-desc">${scenario.question}</p>
              <div class="scenario-options">
                ${scenario.choices.map((choice, cIdx) => `
                  <button class="option-btn" data-choice="${cIdx}">
                    <span class="option-letter">${String.fromCharCode(65 + cIdx)}</span>
                    <span class="option-text">${choice.text}</span>
                  </button>
                `).join('')}
              </div>
              <div id="scenario-feedback" class="scenario-feedback hidden"></div>
            </div>
          </div>
        </div>

        <div class="simulator-footer">
          <button id="prev-step" class="btn btn-secondary" ${currentStepIndex === 0 ? 'disabled' : ''}>
            <i data-lucide="arrow-left" class="inline-icon"></i> Previous Step
          </button>
          <span class="step-nav-info">Step ${stepData.step} of ${SIMULATOR_STEPS.length}</span>
          <button id="next-step" class="btn btn-primary" ${currentStepIndex === SIMULATOR_STEPS.length - 1 ? 'disabled' : ''}>
            Next Step <i data-lucide="arrow-right" class="inline-icon"></i>
          </button>
        </div>
      </div>
    `;

    bindEvents();
  }

  function bindEvents() {
    if (window.lucide) window.lucide.createIcons();

    // Node clicks
    container.querySelectorAll('.step-node').forEach(node => {
      node.addEventListener('click', () => {
        currentStepIndex = parseInt(node.getAttribute('data-step'));
        render();
      });
    });

    // Next / Prev clicks
    container.querySelector('#prev-step').addEventListener('click', () => {
      if (currentStepIndex > 0) {
        currentStepIndex--;
        render();
      }
    });

    container.querySelector('#next-step').addEventListener('click', () => {
      if (currentStepIndex < SIMULATOR_STEPS.length - 1) {
        currentStepIndex++;
        render();
      }
    });

    // Scenario option clicks
    const optionBtns = container.querySelectorAll('.option-btn');
    const feedbackDiv = container.querySelector('#scenario-feedback');

    optionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Reset button styles
        optionBtns.forEach(b => {
          b.classList.remove('selected', 'correct', 'incorrect');
          b.disabled = true; // Disable further clicking once an answer is chosen
        });

        const choiceIndex = parseInt(btn.getAttribute('data-choice'));
        const scenario = stepScenarios[currentStepIndex];
        const selectedChoice = scenario.choices[choiceIndex];

        btn.classList.add('selected');
        
        feedbackDiv.classList.remove('hidden', 'feedback-correct', 'feedback-incorrect');
        
        if (selectedChoice.correct) {
          btn.classList.add('correct');
          feedbackDiv.classList.add('feedback-correct');
          feedbackDiv.innerHTML = `
            <div class="feedback-layout">
              <i data-lucide="check-circle" class="text-success large-icon"></i>
              <div>
                <strong>Excellent Decision!</strong>
                <p>${selectedChoice.feedback}</p>
              </div>
            </div>
          `;
        } else {
          btn.classList.add('incorrect');
          feedbackDiv.classList.add('feedback-incorrect');
          
          // Highlight correct answer
          const correctIdx = scenario.choices.findIndex(c => c.correct);
          if (correctIdx !== -1) {
            optionBtns[correctIdx].classList.add('correct');
          }
          
          feedbackDiv.innerHTML = `
            <div class="feedback-layout">
              <i data-lucide="alert-triangle" class="text-danger large-icon"></i>
              <div>
                <strong>Critical Risk Identified</strong>
                <p>${selectedChoice.feedback}</p>
              </div>
            </div>
          `;
        }

        if (window.lucide) window.lucide.createIcons();
      });
    });
  }

  render();
}
