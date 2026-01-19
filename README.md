# 🏠 ApnaAddress.in – AI-Powered Real Estate Platform

ApnaAddress is a modern, AI-powered real estate web platform designed to simplify property discovery, recommendations, and listing management.  
It enables users to explore properties for **Buy**, **Rent**, and **New Projects**, with personalized recommendations powered by **Generative AI**.

The platform focuses on performance, scalability, and user experience through server-rendered architecture and cloud-based services.

---

## ✨ Features

- 🏡 Browse properties for **Buy**, **Rent**, and **New Projects**
- 🤖 AI-powered **property recommendations** using Generative AI
- 🔐 Secure **user authentication** (sign-up / login)
- 👤 User profile management
- 🔍 Smart property discovery and search
- 📱 Fully responsive design
- ⚡ High-performance server-rendered application
- 🗂️ Cloud-based data storage and management
- 🛡️ Secure backend services

---

## 🛠️ Tech Stack

### Framework
- **Next.js** (built on React) for creating a high-performance, server-rendered web application

### Styling
- **Tailwind CSS** for a utility-first styling approach
- **ShadCN/UI** for pre-built, accessible, and reusable UI components

### Backend & Database
- **Firebase** for backend services, including:
  - **Firestore** as a NoSQL database for storing user and property data
  - **Firebase Authentication** for secure user registration and login

### Generative AI
- **Genkit** integrated with **Google’s Gemini model** to power AI-driven property recommendation features

### Language
- **TypeScript** used throughout the project to ensure type safety and improved code quality
  
## 📂 Project Structure
ApnaAddress/
│
├── app/
│ ├── page.tsx
│ ├── layout.tsx
│ └── globals.css
│
├── components/
│ ├── Navbar.tsx
│ ├── PropertyCard.tsx
│ ├── Recommendation.tsx
│ └── Footer.tsx
│
├── lib/
│ ├── firebase.ts
│ ├── genkit.ts
│ └── config.ts
│
├── public/
│ └── images/
│
├── types/
│ └── property.ts
│
├── package.json
├── tsconfig.json
└── README.md


---

## ⚙️ Installation & Setup

1. **Clone the repository**
```bash
git clone https://github.com/your-username/ApnaAddress.git

```
2. **Navigate to the project directory**
   ```bash
   cd ApnaAddress
   ```
3. **Install dependencies**
```bash
npm install
```
4.**Configure Firebase**

Create a Firebase project

Enable Firestore Database

Enable Firebase Authentication

Add your Firebase configuration to the project (firebase.ts)

5.**Configure Genkit & Gemini**
Set up Genkit

Connect with Google Gemini API

Add API keys in environment variables
