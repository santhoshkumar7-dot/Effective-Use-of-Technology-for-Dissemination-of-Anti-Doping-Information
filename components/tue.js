export function initTue(container) {
  let step = 0;
  let responses = {};

  const wizardSteps = {
    0: {
      question: "Is your prescribed substance or method prohibited?",
      desc: "Use the Substance Checker or check the official WADA list first. If the substance is allowed, no TUE is necessary.",
      options: [
        { text: "Yes, it is prohibited (or conditional under my route/dosage).", nextStep: 1, action: "continue" },
        { text: "No, it is permitted.", nextStep: 99, action: "not_needed" },
        { text: "I am not sure.", nextStep: 98, action: "go_check" }
      ]
    },
    1: {
      question: "What level of competition do you participate in?",
      desc: "This determines which organization has authority to review and grant your TUE.",
      options: [
        { text: "International Level (World Championships, Olympic pool, etc.)", nextStep: 2, authority: "International Federation (IF)" },
        { text: "National Level (National Championships, elite national pool)", nextStep: 2, authority: "National Anti-Doping Organization (NADO)" },
        { text: "Recreational / Regional Level (Club sport, local leagues)", nextStep: 2, authority: "NADO (Possible Retroactive application)" }
      ]
    },
    2: {
      question: "Would you experience significant health impairment if the treatment is withheld?",
      desc: "A TUE is only granted if the drug is necessary to treat an acute or chronic medical condition.",
      options: [
        { text: "Yes, withholding it poses severe health risks.", nextStep: 3, pass: true },
        { text: "No, it is for cosmetic, lifestyle, or performance reasons.", nextStep: 97, pass: false }
      ]
    },
    3: {
      question: "Does the treatment produce any performance enhancement beyond returning to a state of normal health?",
      desc: "A TUE cannot be used to boost normal human capacity. It must only restore baseline function.",
      options: [
        { text: "No, it only restores my body to normal health.", nextStep: 4, pass: true },
        { text: "Yes, it might boost my strength or endurance beyond normal baseline.", nextStep: 97, pass: false }
      ]
    },
    4: {
      question: "Are there non-prohibited alternative medications that can treat your condition?",
      desc: "WADA requires that athletes attempt or rule out all legal, non-banned alternatives before a TUE is approved.",
      options: [
        { text: "No, alternatives have been tried and failed, or do not exist.", nextStep: 100, pass: true },
        { text: "Yes, other permitted medications could treat this condition.", nextStep: 96, pass: false }
      ]
    }
  };

  function render() {
    if (step === 99) {
      renderTerminated("No TUE Required", "Your substance is permitted by WADA. You do not need to file a Therapeutic Use Exemption.", "check-circle", "text-success");
    } else if (step === 98) {
      renderTerminated("Verify Substance Status First", "Before filing a TUE, you must confirm if the substance is prohibited. Head over to our WADA Substance Checker to search for your medication.", "search", "text-warning");
    } else if (step === 97) {
      renderTerminated("TUE Unlikely to be Approved", "TUEs are strictly medical exemptions. If a substance is taken for lifestyle, enhancement, or aesthetic purposes, WADA regulations prohibit granting exemptions.", "x-circle", "text-danger");
    } else if (step === 96) {
      renderTerminated("Try Permitted Alternatives First", "An independent medical committee will reject TUE requests if safe, permitted alternatives exist. Please consult your physician about switching to a non-prohibited option.", "alert-triangle", "text-warning");
    } else if (step === 100) {
      renderGuidelines();
    } else {
      renderQuestion();
    }
  }

  function renderQuestion() {
    const q = wizardSteps[step];
    
    container.innerHTML = `
      <div class="card fade-in">
        <div class="card-header">
          <div class="card-title-group">
            <div class="icon-wrapper primary-bg">
              <i data-lucide="file-text" class="icon-primary"></i>
            </div>
            <div>
              <h2>Therapeutic Use Exemption (TUE) Assistant</h2>
              <p>Determine if you need a TUE and get a step-by-step submission guide.</p>
            </div>
          </div>
        </div>

        <div class="analyzer-body max-width-md margin-auto padding-y-md">
          <h3 class="analyzer-q">${q.question}</h3>
          <p class="text-muted margin-bottom-lg">${q.desc}</p>

          <div class="analyzer-options flex flex-col gap-sm">
            ${q.options.map((opt, oIdx) => `
              <button class="option-btn text-left p-md" data-idx="${oIdx}">
                <div class="flex items-center gap-md">
                  <div class="option-indicator-circle"></div>
                  <span class="option-text font-medium">${opt.text}</span>
                </div>
              </button>
            `).join('')}
          </div>
        </div>

        <div class="simulator-footer justify-between margin-top-xl">
          <button id="back-tue-btn" class="btn btn-secondary" ${step === 0 ? 'disabled' : ''}>
            <i data-lucide="arrow-left" class="inline-icon"></i> Back
          </button>
          <span class="text-muted text-sm">Question ${step + 1}</span>
        </div>
      </div>
    `;

    // Bind choices
    container.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const oIdx = parseInt(btn.getAttribute('data-idx'));
        const opt = q.options[oIdx];
        
        responses[step] = opt;
        step = opt.nextStep;
        render();
      });
    });

    const backBtn = container.querySelector('#back-tue-btn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        if (step > 0) {
          // Trace back step index
          step--;
          render();
        }
      });
    }

    if (window.lucide) window.lucide.createIcons();
  }

  function renderTerminated(title, message, icon, colorClass) {
    container.innerHTML = `
      <div class="card fade-in text-center max-width-md margin-auto">
        <div class="result-badge-container">
          <div class="circle-badge-large ${colorClass}">
            <i data-lucide="${icon}" class="icon-hero"></i>
          </div>
        </div>
        <h2 class="margin-top-sm ${colorClass}">${title}</h2>
        <p class="margin-bottom-lg text-muted">${message}</p>
        
        <div class="flex gap-md justify-center">
          <button id="restart-tue-btn" class="btn btn-primary">Restart Assistant</button>
        </div>
      </div>
    `;

    container.querySelector('#restart-tue-btn').addEventListener('click', () => {
      step = 0;
      responses = {};
      render();
    });

    if (window.lucide) window.lucide.createIcons();
  }

  function renderGuidelines() {
    const auth = responses[1]?.authority || "your National Anti-Doping Organization";

    container.innerHTML = `
      <div class="card fade-in">
        <div class="card-header">
          <div class="card-title-group">
            <div class="icon-wrapper primary-bg">
              <i data-lucide="file-check" class="icon-primary"></i>
            </div>
            <div>
              <h2>Your TUE Application Roadmap</h2>
              <p>Based on your responses, you likely qualify for a medical TUE. Follow this step-by-step roadmap to apply.</p>
            </div>
          </div>
        </div>

        <div class="roadmap-layout max-width-md margin-auto padding-y-md">
          <div class="roadmap-authority-banner glass p-md border-radius-md border-solid border-1 border-primary margin-bottom-lg">
            <strong>Filing Authority:</strong> You should submit your application to <u>${auth}</u>.
          </div>

          <div class="timeline-steps-vertical">
            <div class="vertical-timeline-item">
              <div class="v-step-num">1</div>
              <div class="v-step-content">
                <h4>Gather Medical Documentation</h4>
                <p>Compile a complete medical history, diagnostic test results (e.g. blood tests, ECG, spirometry), clinical notes, and treatment trials showing that alternative non-prohibited drugs are ineffective.</p>
              </div>
            </div>

            <div class="vertical-timeline-item">
              <div class="v-step-num">2</div>
              <div class="v-step-content">
                <h4>Download the TUE Form</h4>
                <p>Visit the website of <strong>${auth}</strong> and download the current Therapeutic Use Exemption form. Ensure it is the correct version corresponding to the current year.</p>
              </div>
            </div>

            <div class="vertical-timeline-item">
              <div class="v-step-num">3</div>
              <div class="v-step-content">
                <h4>Consult Your Specialist Physician</h4>
                <p>Have your treating specialist complete and sign the physician section of the form. Both your signature and the physician's signature are mandatory for the file to be processed.</p>
              </div>
            </div>

            <div class="vertical-timeline-item">
              <div class="v-step-num">4</div>
              <div class="v-step-content">
                <h4>Submit 30 Days in Advance</h4>
                <p>Submit the completed form and diagnostic attachments. You must submit at least <strong>30 days before</strong> your next competition, unless it is an emergency/acute medical situation.</p>
              </div>
            </div>

            <div class="vertical-timeline-item warning-timeline-item">
              <div class="v-step-num warning-bg"><i data-lucide="alert-triangle" class="text-warning"></i></div>
              <div class="v-step-content">
                <h4 class="text-warning">Wait for Official Approval</h4>
                <p><strong>CRITICAL:</strong> Submission of an application is NOT an approval. You cannot consume the prohibited substance until you receive your approved TUE certificate showing active dates. Consuming it beforehand risks a positive doping test.</p>
              </div>
            </div>
          </div>

          <div class="text-center margin-top-lg">
            <button id="restart-tue-btn" class="btn btn-secondary">Restart TUE Assistant</button>
          </div>
        </div>
      </div>
    `;

    container.querySelector('#restart-tue-btn').addEventListener('click', () => {
      step = 0;
      responses = {};
      render();
    });

    if (window.lucide) window.lucide.createIcons();
  }

  render();
}
