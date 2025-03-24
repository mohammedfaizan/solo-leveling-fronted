# Quest Tracking System - Frontend

🔗 **Live Link:** [https://sololevelr.netlify.app](https://sololevelr.netlify.app)  
🔗 **Backend Repository:** [Quest Backend Repository](https://github.com/mohammedfaizan/quest_backend)

## 📌 Overview

The **Quest Tracking System** is a **habit-building application** that allows users to track their daily quests and visualize their progress using a **heatmap**. Built using **React, TailwindCSS, and Vite**, this frontend is designed for a seamless and engaging experience.

## 🚀 Features

- **User Authentication** - Secure login and registration with JWT authentication.
- **Daily Quest Creation** - Add custom quests with personalized names.
- **Heatmap Visualization** - Track progress visually using **react-calendar-heatmap**.
- **Sync with Backend** - All quests are stored and retrieved from the backend API.
- **Responsive UI** - Built with **TailwindCSS** for a modern and adaptive design.

## 🛠️ Tech Stack

- **Frontend**: React, TailwindCSS, Vite
- **State Management**: React Hooks (useState, useEffect)
- **API Integration**: Fetch API for communication with the backend
- **Storage**: LocalStorage (only for storing JWT token)

## 🛠️ Backend Development

The backend of the Quest Tracking System is built using Node.js and Express.js, providing a robust and scalable API to manage quests and user authentication. Data is stored in MongoDB, ensuring efficient handling of user quests. Authentication is implemented using JWT (JSON Web Tokens) and Passport.js to secure user sessions. The backend is deployed on Render, making it accessible globally. The backend is maintained in a separate repository to facilitate easier deployment and management.

## 📂 Project Structure

```
quest-tracking-frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── QuestForm.jsx
│   │   ├── QuestHeatmap.jsx
│   ├── api/
│   │   ├── createQuestAPI.js
│   │   ├── fetchQuestsAPI.js
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
├── .env
├── package.json
├── vite.config.js
└── README.md
```

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/mohammedfaizan/quest-tracker-frontend.git
cd quest-tracking-frontend
```

### 2️⃣ Install Dependencies

```sh
yarn install  # or npm install
```

### 3️⃣ Create a `.env` File

```
VITE_BACKEND_BASE_URL=https://quest-backend-s7s3.onrender.com/api/v1
```

### 4️⃣ Run the Development Server

```sh
yarn dev  # or npm run dev
```

### 5️⃣ Build for Production

```sh
yarn build  # or npm run build
```

## 🔥 API Endpoints

| Method   | Endpoint     | Description           |
| -------- | ------------ | --------------------- |
| `POST`   | `/quest`     | Create a new quest    |
| `GET`    | `/quests`    | Fetch all quests      |
| `PATCH`  | `/quest/:id` | Update quest progress |
| `DELETE` | `/quest/:id` | Delete a quest        |

## 🌟 Future Improvements

- ✅ **Streak System** to motivate users
- ✅ **Push Notifications** for reminders
- ✅ **Dark Mode** toggle
- ✅ **More UI Enhancements**

## 📜 License

This project is **open-source** under the MIT License.

## 🤝 Contributing

Want to contribute? Feel free to **fork the repo**, create a branch, and submit a **pull request**.

---

Made with ❤️ by **Mohammed Faizan** 🚀
