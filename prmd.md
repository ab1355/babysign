prmd
Step 1: Use npx to create a basic boilerplate in a new directory. Set up the initial files and project structure.
Create all files that will remain constant throughout the development process (e.g., model files, type files, configuration files, etc.).
Ensure all files generated adhere to a proper structure for scalability and maintainability.
Step 2: Upon completion of boilerplate creation, wait for my confirmation before proceeding to the next steps.
Step 3: Enable the correct mode in Wind Serf to ensure the AI has permission to proceed with further operations.
Step 4: Use Wind Serf's "Cascade" AI feature to analyze the prmd file. Cascade will analyze and start executing necessary commands to:
Create files required for the app.
Generate configurations and components as needed for the project.
Step 5: Ensure iterative app development by awaiting additional instructions after each phase is executed. This will allow iterative refinements and adjustments at each stage.

### Product Requirements Document (PRD)

**App Overview:**
- **Name:** Baby Sign Language App
- **Description:** An interactive app that teaches simple sign language to babies and their parents through engaging animations and lessons.
- **Tagline:** "Empower communication between you and your little one."

**Target Audience:**
- **Primary Users:** Parents of infants and young children, caregivers, and early childhood educators.
- **Demographics:** Ages 20-40, primarily parents who are interested in early childhood development and communication.
- **Goals:** To facilitate communication with their babies before they can speak, enhancing bonding and understanding.
- **Pain Points:** Difficulty in understanding baby's needs, lack of resources for learning sign language.

**Key Features:**
1. **Sign Language Library:** A collection of animated videos demonstrating simple sign language for words like "milk," "more," and "all done."
2. **Interactive Lessons:** Step-by-step guides for parents and babies to learn and practice signs together.
3. **Progress Tracker:** A feature that allows parents to track their child's progress in learning signs.
4. **Parent Dashboard:** A section for parents to monitor their child's learning journey and access resources.
5. **Notifications:** Reminders for practice sessions and updates on new sign additions.

**Success Metrics:**
- User acquisition rate
- User engagement (daily/weekly active users)
- Completion rate of lessons
- Positive reviews and feedback

**Assumptions and Risks:**
- Assumption: Parents are willing to spend time learning and teaching sign language to their babies.
- Risk: Low user retention if the app is not engaging enough for both parents and children.

---

### Frontend Documentation

**UI Framework:**
- **Preference:** React Native for mobile and React.js for web.

**UI Library:**
- **Library:** Material-UI for a consistent and polished look.

**Navigation:**
- **Structure:** Bottom navigation bar for easy access to main sections (Home, Lessons, Progress, Dashboard).

**Styling:**
- **Preference:** Tailwind CSS for utility-first styling.

**Forms:**
- **Required:** Sign-up/login forms, data entry forms for tracking progress.

---

### Backend Documentation

**Backend Framework:**
- **Preference:** Node.js with Express.js.

**Database:**
- **Type:** PostgreSQL for relational data storage.

**Authentication:**
- **Method:** Email/password with OAuth options (Google, Facebook).

**API Design:**
- **Design:** RESTful APIs for simplicity and ease of use.

**Third-Party Integrations:**
- **Integrations:** Firebase for notifications, Stripe for premium content payments.

---

### Third-Party Libraries Documentation

**Library Identification:**
- **Libraries:**
  - **Firebase:** For authentication and notifications.
  - **Stripe:** For handling in-app purchases.
  - **Lottie:** For animated sign language videos.

**Requirements and Compatibility:**
- **Requirements:** Open-source libraries preferred, compatibility with React Native and Node.js.

**Security and Compliance:**
- **Considerations:** Ensure libraries comply with security standards, especially for handling user data and payments.

---

### User Flow Documentation

**User Onboarding:**
- **Steps:** Sign up/login, choose preferred language, set up child's profile.
- **Interactions:** Email/password input, social login buttons.

**Core User Journey:**
- **Steps:** Browse sign language library, start interactive lessons, track progress.
- **Interactions:** Buttons, forms, dropdowns, modals.

**Error Handling:**
- **Handling:** Display user-friendly error messages for invalid inputs, failed API calls.

**Edge Cases:**
- **Considerations:** Offline mode for lesson access, handling expired sessions.

---

### Final Output Folder Structure

```
baby-sign-language-app/
├── docs/
│   ├── prd.md
│   ├── frontend.md
│   ├── backend.md
│   ├── api.md
│   ├── database-schema.md
│   ├── user-flow.md
│   ├── devops.md
│   ├── state-management.md
│   ├── performance-optimization.md
│   ├── testing-plan.md
│   ├── code-documentation.md
│   ├── third-party-libraries.md
├── README.md
```