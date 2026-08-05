# CleanSport Tech: Anti-Doping Information & Education Portal

CleanSport Tech is an interactive, responsive web portal designed to disseminate anti-doping education to athletes, coaches, and sports support personnel. Built using standard, zero-dependency front-end technologies (HTML5, Vanilla CSS3, and modern Javascript ES6 modules), it makes complex World Anti-Doping Agency (WADA) guidelines digestible, interactive, and gamified.

---

## 🌟 Key Features

1.  **WADA Substance Checker**: 
    *   Dynamic search database of common medications, active ingredients, and substances.
    *   Filters by prohibited category, timing guidelines (in-competition vs. at all times), TUE applicability, and safe medical alternatives.
2.  **Doping Control Simulator**:
    *   Interactive step-by-step timeline covering selection, reporting, vessel choices, sample collection, sealing, specific gravity, and paperwork completion.
    *   Integrates interactive "Decision Scenarios" that test athletes on their rights and responsibilities.
3.  **Supplement Contamination Analyzer**:
    *   Diagnostic calculator evaluating third-party testing, source channels, marketing claims, and label transparency.
    *   Computes an instant point-based contamination risk level (Low, Medium, High) with recommendations.
4.  **TUE (Therapeutic Use Exemption) Assistant**:
    *   Decision-tree questionnaire to identify if an athlete requires a TUE for their treatment.
    *   Compiles a custom step-by-step roadmap pointing to NADO vs. IF filing authorities.
5.  **Clean Sport Academy & Quiz**:
    *   Gamified module verifying strict liability, test refusal, whereabouts, and supplement facts.
    *   Generates a personalized, printable digital Clean Sport Advocate Certificate upon achieving a passing score (>= 80%).

---

## 📂 Project Structure

```text
anti-doping-education-app/
├── index.html                 # App shell layout and sidebar navigation framework
├── styles.css                 # CSS variables, theme classes (Light/Dark), and custom timelines
├── app.js                     # Central router, state management, and theme switcher logic
├── data.js                    # Substance lists, simulator procedures, and quiz data
├── serve.ps1                  # Custom PowerShell local server (resolves ES6 module CORS)
├── package.json               # Package config containing npm Vite scripts
└── components/
    ├── checker.js             # Logic for the WADA drug search database
    ├── simulator.js           # Logic for the Doping Control stepper
    ├── quiz.js                # Logic for the academy exam and certificate printer
    ├── analyzer.js            # Logic for the supplement risk scoring tool
    └── tue.js                 # Logic for the Therapeutic Use Exemption wizard
```

---

## 🚀 Running Locally

Because this application uses standard ES6 Modules (`import` and `export` statements), modern web browsers enforce strict CORS blocks when opening files directly from the local file system (`file://` protocol). A local HTTP server is required.

### Method 1: Using PowerShell (Zero Dependencies)
Recommended for Windows environments without Node.js or npm installed:

1.  Open a **PowerShell** terminal in the project directory:
    ```powershell
    cd C:\Users\ACER\.gemini\antigravity\scratch\anti-doping-education-app
    ```
2.  Launch the script-based web server:
    ```powershell
    powershell -ExecutionPolicy Bypass -File .\serve.ps1
    ```
3.  Open your browser and navigate to **[http://localhost:8000](http://localhost:8000)**.

### Method 2: Using Node.js & Vite
Recommended if Node.js/npm is installed on your system:

1.  Open your command prompt or terminal in the project directory:
    ```bash
    cd C:\Users\ACER\.gemini\antigravity\scratch\anti-doping-education-app
    ```
2.  Install the dev dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Open the local URL (usually `http://localhost:5173`) in your browser.

---

## 🎨 Design Systems & Tokens

*   **Typography**: Using Google Fonts (`Outfit` for high-impact titles and `Inter` for clean text).
*   **Icons**: Dynamic icon loading powered by unpkg CDN-loaded `Lucide` icons.
*   **Colors**: Custom tailorable palette mapping HSL ranges:
    *   **Primary Accent**: Clean Sport Green/Teal.
    *   **Alert Statuses**: Emerald (Permitted), Amber (Conditional), Coral (Prohibited).
*   **Animations**: Built-in CSS transition triggers for view updates, modal highlights, and keyframe pulses.
