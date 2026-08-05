export function initAnalyzer(container) {
  let answers = {};
  
  const questions = [
    {
      id: "thirdparty",
      title: "Third-Party Testing & Verification",
      question: "Is this supplement certified by an independent laboratory like Informed Sport, NSF Certified for Sport, or BSCG?",
      desc: "Look for official certification logos on the packaging. These programs run continuous batch testing for prohibited substances.",
      options: [
        { text: "Yes, it has a verified batch-testing logo.", riskPoints: 0, comment: "Excellent. Batch testing is the single best way to minimize contamination risk." },
        { text: "No / I'm not sure.", riskPoints: 50, comment: "High risk. Uncertified supplements represent a major hazard for elite athletes." }
      ]
    },
    {
      id: "source",
      title: "Purchase Source",
      question: "Where did you purchase or obtain this supplement?",
      desc: "Where you buy matters. Counterfeit and contaminated products are common in unauthorized distribution networks.",
      options: [
        { text: "Directly from the manufacturer or a reputable major pharmacy.", riskPoints: 0, comment: "Secure source." },
        { text: "Third-party reseller (e.g. eBay, Amazon third-party sellers, social media).", riskPoints: 25, comment: "Elevated risk. Counterfeit products look identical to real ones but may contain illegal fillers." },
        { text: "A friend, coach, personal trainer, or local gym contact.", riskPoints: 30, comment: "Elevated risk. Avoid taking supplements from open containers or unverified personal sources." }
      ]
    },
    {
      id: "label",
      title: "Label Composition Analysis",
      question: "Does the label list 'Proprietary Blends', 'Complex Matrixes', or chemical names ending in -ol, -ene, or -one?",
      desc: "Proprietary formulas can hide banned stimulants or prohormones. Chemical naming patterns can signify anabolic substances.",
      options: [
        { text: "No, all ingredients are clearly listed with exact amounts.", riskPoints: 0, comment: "Good visibility." },
        { text: "Yes, it has proprietary blends or complex chemical structures.", riskPoints: 35, comment: "High warning level. These terms are frequently used to mask illegal additives." }
      ]
    },
    {
      id: "claims",
      title: "Marketing Claims",
      question: "Does the product claim to cause rapid muscle growth, fat loss, extreme energy, or advertise as a 'legal steroid alternative'?",
      desc: "Products marketed with extreme claims are statistically the most likely to be spiked with pharmaceutical drugs or hormones.",
      options: [
        { text: "No, the claims are realistic and focus on general nutrition/recovery.", riskPoints: 0, comment: "Safe marketing." },
        { text: "Yes, it promises extreme physical transformations.", riskPoints: 40, comment: "Severe hazard. WADA warning sheets list these claims as critical indicators of contamination." }
      ]
    },
    {
      id: "complexity",
      title: "Ingredient Complexity",
      question: "Is this a multi-ingredient product (e.g. pre-workout, thermogenic burner, complex protein blend) or a single ingredient (e.g. pure Creatine, pure Whey)?",
      desc: "Multi-ingredient formulas have complex supply chains, increasing the likelihood of accidental cross-contamination.",
      options: [
        { text: "Single ingredient (100% pure ingredient).", riskPoints: 5, comment: "Lower baseline complexity." },
        { text: "Multi-ingredient formula (contains stimulants, vitamins, herbal extracts, and amino acids).", riskPoints: 20, comment: "Moderate risk. Herbs and botanicals are harder to regulate and verify." }
      ]
    }
  ];

  let currentIdx = 0;

  function render() {
    if (currentIdx < questions.length) {
      renderQuestion();
    } else {
      renderResults();
    }
  }

  function renderQuestion() {
    const q = questions[currentIdx];
    const totalQ = questions.length;
    const progress = (currentIdx / totalQ) * 100;

    container.innerHTML = `
      <div class="card fade-in">
        <div class="card-header">
          <div class="card-title-group">
            <div class="icon-wrapper primary-bg">
              <i data-lucide="shield-alert" class="icon-primary"></i>
            </div>
            <div>
              <h2>Supplement Risk Assessment Tool</h2>
              <p>Evaluate the contamination risk level of your sports supplements using this WADA-aligned questionnaire.</p>
            </div>
          </div>
        </div>

        <div class="quiz-progress-header">
          <span class="quiz-step-label">Analysis Step ${currentIdx + 1} of ${totalQ}: ${q.title}</span>
          <div class="quiz-progress-bar">
            <div class="quiz-progress-fill" style="width: ${progress}%"></div>
          </div>
        </div>

        <div class="analyzer-body max-width-md margin-auto">
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
          <button id="back-analysis-btn" class="btn btn-secondary" ${currentIdx === 0 ? 'disabled' : ''}>
            <i data-lucide="arrow-left" class="inline-icon"></i> Back
          </button>
          <span class="text-muted text-sm">Step ${currentIdx + 1} of ${totalQ}</span>
        </div>
      </div>
    `;

    // Bind option selection
    container.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const oIdx = parseInt(btn.getAttribute('data-idx'));
        answers[q.id] = q.options[oIdx];
        
        currentIdx++;
        render();
      });
    });

    const backBtn = container.querySelector('#back-analysis-btn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        if (currentIdx > 0) {
          currentIdx--;
          render();
        }
      });
    }

    if (window.lucide) window.lucide.createIcons();
  }

  function renderResults() {
    // Calculate total points
    let score = 0;
    Object.keys(answers).forEach(key => {
      score += answers[key].riskPoints;
    });

    // Determine risk status
    let status = "Low Risk";
    let statusClass = "text-success";
    let bgClass = "bg-success-light";
    let icon = "check-circle";
    let recommendation = "This supplement has very low risk markers. Ensure you keep the packaging or verify the specific batch code online before consumption.";

    if (score >= 40 && score < 75) {
      status = "Medium Risk";
      statusClass = "text-warning";
      bgClass = "bg-warning-light";
      icon = "alert-circle";
      recommendation = "Caution is strongly advised. Although not highly critical, the lack of complete third-party certification or source integrity poses a real danger of contamination. Verify the batch ID or search for a certified alternative.";
    } else if (score >= 75) {
      status = "High Risk";
      statusClass = "text-danger";
      bgClass = "bg-danger-light";
      icon = "x-circle";
      recommendation = "DO NOT CONSUME THIS SUPPLEMENT. It exhibits multiple high-risk indicators, including lack of testing, unverified sources, or suspect packaging/claims. Under strict liability rules, consuming this can lead to an active doping violation and long-term suspension.";
    }

    container.innerHTML = `
      <div class="card fade-in">
        <div class="card-header">
          <div class="card-title-group">
            <div class="icon-wrapper primary-bg">
              <i data-lucide="shield-alert" class="icon-primary"></i>
            </div>
            <div>
              <h2>Supplement Risk Assessment Result</h2>
              <p>Risk report compiled based on sports nutrition safety and WADA rules.</p>
            </div>
          </div>
        </div>

        <div class="results-layout-vertical max-width-md margin-auto text-center padding-y-md">
          <div class="risk-gauge-container margin-bottom-md">
            <div class="risk-score-circle ${statusClass}">
              <i data-lucide="${icon}" class="icon-hero"></i>
              <span class="risk-score-value">${score}</span>
              <span class="risk-score-label">Points</span>
            </div>
          </div>

          <h3 class="margin-bottom-xs">Risk Rating: <span class="${statusClass}">${status}</span></h3>
          <p class="risk-recommendation ${bgClass} p-md border-radius-md border-solid border-1 font-medium margin-bottom-lg">${recommendation}</p>

          <div class="text-left margin-bottom-lg">
            <h4 class="margin-bottom-sm">Step-by-Step Risk Report:</h4>
            <div class="risk-breakdown-list flex flex-col gap-sm">
              ${questions.map(q => {
                const ans = answers[q.id];
                const isHighRisk = ans.riskPoints > 15;
                
                return `
                  <div class="risk-item p-sm border-radius-sm bg-surface flex justify-between items-center border-l-3 ${isHighRisk ? 'border-danger' : 'border-success'}">
                    <div>
                      <span class="font-semibold block text-sm">${q.title}</span>
                      <span class="text-xs text-muted">Selection: ${ans.text}</span>
                      <p class="text-sm margin-top-xs text-secondary font-medium">${ans.comment}</p>
                    </div>
                    <span class="badge ${isHighRisk ? 'status-prohibited' : 'status-allowed'}">${ans.riskPoints} pts</span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <div class="flex gap-md justify-center">
            <button id="restart-analysis-btn" class="btn btn-primary">
              <i data-lucide="rotate-ccw" class="inline-icon"></i> Analyze Another Product
            </button>
          </div>
        </div>
      </div>
    `;

    container.querySelector('#restart-analysis-btn').addEventListener('click', () => {
      currentIdx = 0;
      answers = {};
      render();
    });

    if (window.lucide) window.lucide.createIcons();
  }

  render();
}
