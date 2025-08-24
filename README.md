# 🚀 GitHub Users Explorer

A **modern React + TypeScript** application that displays popular GitHub users (followers > 1000) with **clean cards**, **search**, **sorting**, and clickable links to GitHub profiles, followers, and following.  

---

## 🔗 Live Demo

Check out the live version here:  
[https://github-users-app-tawny.vercel.app/](https://github-users-app-tawny.vercel.app/)

---

## ✨ Features

- Browse **popular GitHub users** (followers > 1000)  
- **Search users** by name or company  
- **Sort users** by:
  - Name A-Z  
  - Followers ↓  
- **User cards** include:
  - Avatar  
  - Name  
  - Company (highlight top companies like Google, Apple, Facebook)  
  - **Followers & Following** (clickable links to GitHub profiles)  
  - **View GitHub Profile** button  
  - **Favorite** toggle  
- Fully **responsive design**  
- **Modern fonts** and clean UI  
- Error handling for API requests  

---

## 🛠 Tech Stack

- **React** + **TypeScript**  
- **Material-UI (MUI)** for UI components  
- **Axios** for API calls  
- **GitHub REST API** for user data  
- **Environment variables** for secure GitHub token  

---
## 🔗 Usage

- **Search users**: type a name or company in the search bar.  
- **Sort users**: choose "Name A-Z" or "Followers ↓" from the dropdown.  
- **View Profile**: click the GitHub icon or "View Profile" button on a card.  
- **Followers / Following**: click the numbers to open GitHub followers/following pages.  

---

## ⚡ Getting Started

1. **Clone the repository**:

```bash
git clone https://github.com/GemiGemiMouy/github-users-app.git
cd github-users-app


2. **Install dependencies**:

```bash
npm install
# or
yarn install


3. **Create a .env file in the root and add your GitHub token**:

```bash
REACT_APP_GITHUB_TOKEN=your_github_personal_access_token

4. **Start the development server**:
```bash
npm start
# or
yarn start




