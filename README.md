# 🤖 CodeRay AI

**AI-powered code review platform** that connects with GitHub to analyze repositories and provide intelligent feedback on code.

🌐 **Live Demo:** [code-ray-ai.vercel.app](https://code-ray-ai.vercel.app)
💻 **GitHub:** [yashmankar1/CodeRay-AI](https://github.com/yashmankar1/CodeRay-AI)

---

## ✨ Features

* 🔐 **GitHub Authentication** — Sign in securely using GitHub OAuth
* 📂 **Repository Browser** — View your GitHub repositories and their contents
* 🤖 **AI Code Review** — Get AI-generated feedback on your code
* 📊 **Code Reports** — Generate and view code review reports
* 🔒 **Protected APIs** — Authentication middleware protects private resources
* ⚡ **Modern React UI** — Responsive interface for interacting with the platform
* 🌐 **RESTful Backend** — Express APIs connecting the frontend, GitHub, database, and AI service

---

## 🛠️ Tech Stack

### Frontend

* **React**
* **Vite**
* **Axios**
* **CSS**

### Backend

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **GitHub OAuth**
* **JWT / Cookies**
* **REST APIs**

### AI & Integrations

* **Google Gemini API**
* **GitHub API**

### Deployment

* **Vercel**
* **MongoDB Atlas**

---

## 🏗️ How It Works

```text
                    ┌──────────────────┐
                    │    React + Vite  │
                    │    Frontend      │
                    └────────┬─────────┘
                             │
                         REST APIs
                             │
                             ▼
                    ┌──────────────────┐
                    │  Express Server  │
                    │     Node.js      │
                    └──────┬─────┬─────┘
                           │     │
                 ┌─────────┘     └──────────┐
                 ▼                          ▼
          ┌──────────────┐          ┌──────────────┐
          │ GitHub API   │          │ Gemini API   │
          │ Repositories │          │ Code Review  │
          └──────────────┘          └──────────────┘
                           │
                           ▼
                    ┌──────────────┐
                    │   MongoDB    │
                    │   Database   │
                    └──────────────┘
```

---

## 🔐 Authentication

CodeRay AI uses **GitHub OAuth** for authentication.

The authentication flow:

1. User selects **Login with GitHub**.
2. The backend redirects the user to GitHub.
3. GitHub authenticates the user and redirects back to the application.
4. The backend processes the OAuth callback.
5. User information is stored/retrieved from MongoDB.
6. Authentication state is maintained using cookies.
7. Protected routes verify the authenticated user before accessing private resources.

---

## 🤖 AI Code Review

The core feature of CodeRay AI is its **AI-powered code review**.

The application:

1. Retrieves code from a user's GitHub repository.
2. Sends the selected code to the backend.
3. The backend processes the review request.
4. Gemini analyzes the code.
5. The generated feedback is returned to the frontend.
6. Review information can be stored and displayed as reports.

This allows developers to use AI as an additional tool for understanding and improving their code.

---

## 📂 Repository Integration

Authenticated users can access their GitHub repositories through the application.

The backend provides APIs for:

* Listing repositories
* Accessing repository contents
* Selecting code for review
* Sending code to the AI review service

---

## 🚀 Run Locally

### Prerequisites

* Node.js 20+
* MongoDB / MongoDB Atlas
* GitHub OAuth application
* Google Gemini API key

### Clone the repository

```bash
git clone https://github.com/yashmankar1/CodeRay-AI.git
cd CodeRay-AI
```

### Install dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file and configure your credentials:

```env
PORT=your_port
MONGODB_URI=your_mongodb_connection_string

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

GEMINI_API_KEY=your_gemini_api_key

JWT_SECRET=your_jwt_secret
```

Use the exact environment variable names required by the application.

**Never commit API keys, OAuth secrets, database credentials, or JWT secrets to GitHub.**

### Start the server

```bash
node server.js
```

If you use Nodemon during development:

```bash
npx nodemon server.js
```

---

## 📚 What I Learned

* Integrating **GitHub OAuth** authentication
* Working with the **GitHub API**
* Building REST APIs using Node.js and Express
* Managing MongoDB data with Mongoose
* Implementing authentication middleware
* Integrating the **Google Gemini API**
* Designing an AI-powered code review workflow
* Handling protected API requests and cookies
* Connecting a React frontend with an Express backend
* Deploying a full-stack application with Vercel and MongoDB Atlas

---

## 👨‍💻 Author

**Yash Mankar**

[GitHub](https://github.com/yashmankar1)

⭐ **If you find CodeRay AI interesting, consider giving the repository a star!**
