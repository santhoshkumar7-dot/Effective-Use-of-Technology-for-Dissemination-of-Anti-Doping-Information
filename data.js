/**
 * CleanSport Tech - Mock Substance Database, Doping Control steps, and Quiz Questions
 */

export const SUBSTANCE_DATABASE = [
  {
    id: "clenbuterol",
    name: "Clenbuterol",
    category: "S1. Anabolic Agents",
    status: "Prohibited",
    timing: "At All Times (In & Out of Competition)",
    details: "Anabolic agent used to promote muscle growth and fat loss. Not approved for human use in most countries but sometimes found as a meat contaminant.",
    tueApplicable: "Very Low",
    tueDetails: "Only granted in extremely rare, documented medical conditions under strict specialist guidance. Not for athletic performance enhancement.",
    alternatives: "Non-prohibited asthma therapies or bronchodilators if medically necessary (under advice of a sports physician)."
  },
  {
    id: "salbutamol",
    name: "Salbutamol (Ventolin)",
    category: "S3. Beta-2 Agonists",
    status: "Conditional",
    timing: "Subject to Dosage Limits",
    details: "Common asthma medication. Permitted by inhalation only: maximum 1600 micrograms over 24 hours in divided doses, not to exceed 800 micrograms over 12 hours.",
    tueApplicable: "High",
    tueDetails: "If your required therapeutic dosage exceeds the WADA limits, a Therapeutic Use Exemption (TUE) supported by clear spirometry/provocation tests is mandatory.",
    alternatives: "Ensure usage is logged. Use a spacer if needed, and do not exceed the permitted number of puffs (usually 8-16 puffs per day depending on inhaler type)."
  },
  {
    id: "ibuprofen",
    name: "Ibuprofen (Advil, Nurofen)",
    category: "Non-steroidal Anti-inflammatory (NSAID)",
    status: "Allowed",
    timing: "Permitted At All Times",
    details: "Common pain reliever and anti-inflammatory. Not banned by WADA by any route of administration.",
    tueApplicable: "Not Required",
    tueDetails: "No TUE needed. However, athletes should use with caution to avoid gastrointestinal side effects and chronic renal strain.",
    alternatives: "Ice, compression, physiotherapy, or rest where appropriate."
  },
  {
    id: "caffeine",
    name: "Caffeine",
    category: "Stimulant (Monitoring Program)",
    status: "Allowed",
    timing: "Permitted, Monitored",
    details: "Currently on the WADA Monitoring Program. It is NOT prohibited, but levels in urine are monitored to detect patterns of misuse in sport.",
    tueApplicable: "Not Required",
    tueDetails: "No TUE required.",
    alternatives: "Maintain moderate dietary intake."
  },
  {
    id: "pseudoephedrine",
    name: "Pseudoephedrine (Sudafed)",
    category: "S6. Stimulants (Specified)",
    status: "Conditional",
    timing: "Prohibited In-Competition Only",
    details: "Common decongestant found in cold medicines. Banned in-competition if concentration in urine exceeds 150 micrograms/mL. Athletes should stop taking it at least 24 hours before competition.",
    tueApplicable: "Medium",
    tueDetails: "TUEs are rarely granted for acute conditions in-competition. Best practice is to switch to safe alternatives before the in-competition period starts.",
    alternatives: "Phenylephrine, nasal saline sprays, steam inhalation, or oxymetazoline nasal sprays (use for max 3-5 days)."
  },
  {
    id: "methylphenidate",
    name: "Methylphenidate (Ritalin, Concerta)",
    category: "S6. Stimulants (Non-Specified)",
    status: "Prohibited",
    timing: "Prohibited In-Competition Only",
    details: "Central nervous system stimulant used commonly to treat ADHD. Prohibited in-competition.",
    tueApplicable: "High",
    tueDetails: "Athletes diagnosed with ADHD must apply for and secure a TUE before competing. Extensive pediatric/psychiatric reporting is required.",
    alternatives: "Non-stimulant ADHD medications like Atomoxetine (Strattera) are permitted, subject to physician supervision."
  },
  {
    id: "insulin",
    name: "Insulin",
    category: "S4. Hormone and Metabolic Modulators",
    status: "Prohibited",
    timing: "At All Times (In & Out of Competition)",
    details: "Hormone that regulates glucose metabolism. Banned due to potential anabolic effects and manipulation of nutrient storage.",
    tueApplicable: "High (For Diabetics)",
    tueDetails: "Athletes with Type 1 Diabetes Mellitus will be granted a TUE upon submission of comprehensive endocrinology records confirming the diagnosis.",
    alternatives: "None for Type 1 Diabetes; treatment is medically essential and TUE is standard."
  },
  {
    id: "prednisolone",
    name: "Prednisolone",
    category: "S9. Glucocorticoids",
    status: "Conditional",
    timing: "Prohibited In-Competition (Certain Routes)",
    details: "Corticosteroid anti-inflammatory. Prohibited in-competition only when administered orally, rectally, or by any injection (intravenous, intramuscular, etc.). Topical, inhaled, or local injections (e.g. dental) are permitted.",
    tueApplicable: "High",
    tueDetails: "If oral or systemic injection is medically necessary during or close to competition, an active TUE must be filed.",
    alternatives: "Non-systemic routes (topical creams for skin conditions, inhaled for asthma) or NSAIDs for joint pain."
  },
  {
    id: "erythropoietin",
    name: "Erythropoietin (EPO)",
    category: "S2. Peptide Hormones & Growth Factors",
    status: "Prohibited",
    timing: "At All Times (In & Out of Competition)",
    details: "Hormone that stimulates red blood cell production, increasing oxygen delivery to muscles. Highly abused in endurance sports.",
    tueApplicable: "Very Low",
    tueDetails: "Only granted for severe chronic kidney disease or chemotherapy-induced anemia, supported by exhaustive medical files.",
    alternatives: "Natural altitude training and hypoxic chambers (which are legal in most sports jurisdictions)."
  },
  {
    id: "modafinil",
    name: "Modafinil (Provigil)",
    category: "S6. Stimulants (Non-Specified)",
    status: "Prohibited",
    timing: "Prohibited In-Competition Only",
    details: "Wakefulness-promoting agent used for narcolepsy or sleep disorders.",
    tueApplicable: "Medium",
    tueDetails: "Requires an approved TUE showing clinical diagnosis of narcolepsy via sleep study reports.",
    alternatives: "Cognitive behavioral therapy for insomnia, scheduled power naps out-of-competition."
  },
  {
    id: "creatine",
    name: "Creatine Monohydrate",
    category: "Dietary Supplement",
    status: "Allowed",
    timing: "Permitted At All Times",
    details: "Organic compound used to increase muscle energy (ATP) resynthesis. Not on the WADA prohibited list.",
    tueApplicable: "Not Required",
    tueDetails: "No TUE required.",
    alternatives: "Ensure any purchase is third-party batch tested (e.g., Informed Sport, NSF Certified for Sport) to guarantee zero contamination with anabolic impurities."
  }
];

export const SIMULATOR_STEPS = [
  {
    step: 1,
    title: "Athlete Selection & Notification",
    icon: "bell",
    image: "selection",
    description: "An athlete is selected for doping control (randomly or targeted). A Chaperone or Doping Control Officer (DCO) will notify you of your selection.",
    keyPoints: [
      "The chaperone must show official identification.",
      "You will be asked to sign the notification form acknowledging your selection.",
      "The chaperone must keep you in direct sight at all times until testing is complete."
    ],
    rightsTitle: "Your Rights:",
    rights: [
      "To have a representative (coach, doctor) accompany you.",
      "To ask for an interpreter if needed.",
      "To request a delay to attend a medal ceremony, media commitments, warm-down, or medical treatment (under chaperone supervision)."
    ]
  },
  {
    step: 2,
    title: "Reporting to the Doping Control Station (DCS)",
    icon: "map-pin",
    image: "reporting",
    description: "You must report to the designated Doping Control Station immediately, unless there is a valid reason for delay approved by your chaperone.",
    keyPoints: [
      "You must remain in visual contact with your chaperone.",
      "Avoid using the restroom before arriving at the station if possible.",
      "Do not consume drinks or food from unverified sources to avoid risk of contamination."
    ],
    rightsTitle: "Your Responsibilities:",
    rights: [
      "Produce valid photo identification.",
      "Remain within direct observation of your chaperone.",
      "Comply with all instructions given by the doping control staff."
    ]
  },
  {
    step: 3,
    title: "Selecting the Sample Collection Vessel",
    icon: "package",
    image: "vessel",
    description: "Once you are ready to provide a sample, you will be offered a choice of individually sealed collection vessels.",
    keyPoints: [
      "You must choose a collection vessel yourself; the DCO should not hand one to you directly.",
      "Verify that the packaging is intact, clean, and has not been tampered with.",
      "If you are not satisfied with any of them, you have the right to request a different one."
    ],
    rightsTitle: "Verification Check:",
    rights: [
      "Ensure the vessel is completely dry and clean.",
      "Confirm that the seal was fully intact before opening."
    ]
  },
  {
    step: 4,
    title: "Providing the Sample",
    icon: "droplet",
    image: "sample",
    description: "You will provide your sample under direct observation of a DCO or Chaperone of the same gender to ensure validity and prevent tampering.",
    keyPoints: [
      "You must wash your hands with water only (no soap) before providing the sample to prevent contamination.",
      "You will be asked to adjust clothing (knees to mid-torso, sleeves to elbows) so the DCO has an unobstructed view of the sample leaving your body.",
      "A minimum volume of 90 milliliters (mL) is required for a complete sample."
    ],
    rightsTitle: "Partial Sample Note:",
    rights: [
      "If you cannot produce 90mL, it is logged as a 'Partial Sample'.",
      "The sample is temporarily sealed, and you will wait under supervision until you can provide the remainder."
    ]
  },
  {
    step: 5,
    title: "Selecting & Sealing the Kit",
    icon: "lock",
    image: "kit",
    description: "You will select a sealed sample security kit containing two bottles, labeled 'A' (for analysis) and 'B' (stored securely for confirmation checks).",
    keyPoints: [
      "Confirm the security box is intact and the numbers on the box, the 'A' bottle, and the 'B' bottle match exactly.",
      "You (the athlete) pour the sample into the bottles (approx. 60mL into bottle A, and 30mL into bottle B).",
      "You seal the bottles by turning the caps until they click and lock. The DCO will verify they are sealed correctly but should not touch them unless requested."
    ],
    rightsTitle: "Athlete Watchout:",
    rights: [
      "Keep control of your sample vessel and the kit until it is fully sealed.",
      "Double-check that the unique identification numbers match on all kit components and paperwork."
    ]
  },
  {
    step: 6,
    title: "Testing Sample Suitability",
    icon: "activity",
    image: "suitability",
    description: "The DCO will test the remaining urine in the collection vessel to check its Specific Gravity (density) and pH, ensuring the sample is not too diluted to analyze.",
    keyPoints: [
      "If the sample is too diluted (Specific Gravity < 1.005 or 1.003 depending on laboratory), you will be asked to provide another sample.",
      "This process is repeated until a sample of suitable concentration is obtained.",
      "Avoid drinking excessive fluids before the test, as this can dilute your sample."
    ],
    rightsTitle: "Important:",
    rights: [
      "All attempts and results are logged on the doping control form.",
      "Even if a sample is too diluted, it will still be sealed and sent to the laboratory for analysis."
    ]
  },
  {
    step: 7,
    title: "Completing the Paperwork",
    icon: "file-text",
    image: "paperwork",
    description: "The final step is declaring any medications, supplements, or treatments taken in the last 7 days and signing the Doping Control Form.",
    keyPoints: [
      "Ensure all information is written accurately: your name, contact details, and the unique kit number.",
      "Declare ALL medications, prescriptions, over-the-counter drugs, vitamins, and sports supplements.",
      "Note any comments or concerns about how the testing session was conducted directly on the form."
    ],
    rightsTitle: "Finalizing:",
    rights: [
      "Review the entire form carefully before signing.",
      "Take your paper copy of the form and keep it in a secure place for your records."
    ]
  }
];

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "What is the WADA principle of 'Strict Liability'?",
    options: [
      "Athletes are only responsible for substances they took intentionally.",
      "Athletes are strictly responsible for any prohibited substance found in their sample, regardless of how it got there.",
      "Coaches are held legally responsible for whatever substances an athlete consumes.",
      "Governing bodies are strictly liable for testing errors."
    ],
    answerIndex: 1,
    explanation: "Under the Strict Liability principle, an athlete is solely responsible for any banned substances found in their body. It does not matter if the substance was taken accidentally, if a doctor prescribed it, or if a supplement was contaminated. It is the athlete's duty to ensure nothing banned enters their system."
  },
  {
    id: 2,
    question: "If an athlete has a legitimate medical condition requiring a banned substance, what must they obtain?",
    options: [
      "A note from their local doctor.",
      "A Therapeutic Use Exemption (TUE).",
      "An exemption waiver signed by their coach.",
      "They can participate but cannot win medals."
    ],
    answerIndex: 1,
    explanation: "A Therapeutic Use Exemption (TUE) grants athletes permission to take a medication on the WADA Prohibited List for a diagnosed medical condition. TUEs are reviewed by a panel of independent physicians who ensure the treatment is medically necessary and does not offer an unfair performance advantage."
  },
  {
    id: 3,
    question: "Which of the following is true regarding dietary supplements?",
    options: [
      "Supplements are 100% safe as long as you buy them from a pharmacy.",
      "If a supplement label doesn't list a banned substance, it is guaranteed clean.",
      "Supplements carry a risk of contamination, and athletes are fully responsible if a supplement leads to a positive test.",
      "All dietary supplements are prohibited by WADA."
    ],
    answerIndex: 2,
    explanation: "Unlike medicines, dietary supplements are not strictly regulated in many countries. They can contain hidden or unlisted ingredients, or be cross-contaminated with banned substances in the manufacturing facility. Athletes must assess risks and use third-party tested supplements (e.g. Informed Sport, NSF Sport)."
  },
  {
    id: 4,
    question: "What counts as an Anti-Doping Rule Violation (ADRV)?",
    options: [
      "Only a positive urine or blood test.",
      "A positive test, refusing to take a test, or missing three whereabouts checks in 12 months.",
      "Only trafficking prohibited substances.",
      "Failing to shake hands with the Doping Control Officer."
    ],
    answerIndex: 1,
    explanation: "There are 11 distinct Anti-Doping Rule Violations under the WADA Code. These include not only positive samples (presence of a substance) but also refusing to test, whereabouts failures (3 missed tests or filing failures in 12 months), tampering, possession, trafficking, and administration/association offenses."
  },
  {
    id: 5,
    question: "Who is allowed to observe the athlete during sample provision?",
    options: [
      "Any official who is nearby.",
      "Only a Doping Control Officer (DCO) or Chaperone of the same gender as the athlete.",
      "The athlete's coach or relative.",
      "No one; athletes must always have complete privacy behind closed doors."
    ],
    answerIndex: 1,
    explanation: "To ensure sample integrity and prevent tampering (e.g. using artificial devices or swapping samples), the provision of urine must be directly observed. For the athlete's privacy and dignity, the observer must be a DCO or Chaperone of the same gender."
  }
];
