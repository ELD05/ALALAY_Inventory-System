# ALALAY Inventory System

A simple inventory web app with a login page. The login is checked by a small Node.js + Express backend.

## How to run

You need [Node.js](https://nodejs.org/) installed.

**1. Start the backend**

Open a terminal in the project folder and run:

```bash
cd backend
npm install
npm start
```

When you see `Server running at http://localhost:3000`, the backend is ready. Keep this terminal open.

**2. Open the website**

Open `login.html` in your browser. In VS Code, right-click it and choose **Open with Live Server**.

**3. Sign in**

| Username | Password |

| `admin` | `admin123` |

| `user` | `user123` |

Notes:

- The backend must be running for login to work. Stop it with `Ctrl+C`.
- Accounts are stored in `backend/users.json`.
- Products and suppliers are sample data and reset when the page is refreshed.
