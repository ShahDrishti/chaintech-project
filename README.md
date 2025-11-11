# React Account Management App

A modern, clean account management application built with React 19, React Router v6, and React Bootstrap 2.  
It demonstrates secure registration, login, a welcoming home page, and robust account update—all with full validation and helpful UI feedback.

---

## Features

- **User Registration:**

  - Collects Name, Email, Phone, Age, Gender and Password
  - Inline validation for format and requirements (all fields required)
  - Real-time errors and red asterisks for mandatory fields

- **Login:**

  - Email and password authentication
  - Disabled button until valid
  - All invalid fields are highlighted when the user attempts to login/register

- **Home Page:**

  - Greets user by name after login/registration
  - Shows a profile info summary and allows account updates
  - Success notification is shown after profile updates

- **Account Update:**

  - Edit any profile field, including email and password
  - If email or password is changed, user is logged out and must log in again
  - Minor updates return user to home with notification

- **Navigation:**

  - Responsive Bootstrap navbar with links for navigation and user context (signed-in status)
  - Conditional rendering based on authentication state

- **Form & App-Level Error Handling:**

  - All validation is explicit (user cannot bypass via forms or button behavior)
  - Error boundaries ensure app stays usable even if something breaks

- **Styling:**
  - Fully responsive; looks appealing on both desktop and mobile
  - Uses Bootstrap utilities and React Bootstrap components only (minimal custom CSS unless user adds)

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+ recommended
- `npm` (shipped with Node.js)

### Installation

1. **Clone the repository**

   ```
   git clone https://github.com/YOUR-USERNAME/react-account-management-app.git
   cd react-account-management-app
   ```

2. **Install dependencies**

   ```
   npm install
   npm install bootstrap react-bootstrap (for styling)
   ```

3. **Run the application**
   ```
   npm start
   ```

- Visit [http://localhost:3000](http://localhost:3000) in your browser

---
