
````markdown
# Aurum – The Royal Gems Store

Aurum is a full-stack online jewellery shopping platform built using **HTML, CSS (Tailwind), JavaScript, Node.js, Express, and MongoDB**. The application allows users to browse collections, manage a shopping cart, register/login, and place orders.

---

## Features

- Browse products with images, description, and price.
- Add/remove items in the shopping cart.
- User authentication and session management.
- Checkout and order confirmation with data stored in MongoDB.
- Responsive design for desktop, tablet, and mobile.
- Dynamic hero slider and interactive UI components.

---

## Technologies Used

- **Frontend:** HTML, CSS (Tailwind), JavaScript  
- **Backend:** Node.js, Express  
- **Database:** MongoDB (NoSQL)  
- **Version Control:** Git/GitHub

---

## Setup Instructions

1. **Clone the repository:**

```bash
git clone https://github.com/UddantiBhavana/Aurum_Jewellery_Store.git
cd Aurum_Jewellery_Store
````

2. **Install dependencies:**

```bash
npm install
```

3. **Environment Variables:**

Create a `.env` file inside the `backend` folder with your MongoDB URI and JWT secret:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

> ⚠️ **Security Note:** The `.env` file is included in `.gitignore` to prevent exposing your secrets on GitHub. Do **not** commit `.env` to the repository.

4. **Run the server:**

```bash
npm run start
```

5. **Open the frontend:**
   Open `frontend/index.html` in your browser, or deploy both frontend and backend to platforms like **Vercel** or **Render**.

---

## Folder Structure

```
Aurum_Project/
│
├─ backend/         # Node.js backend with routes, controllers, models
├─ frontend/        # HTML, CSS, JS files
├─ .gitignore       # Ignores node_modules, .env, and other unnecessary files
├─ README.md        # Project documentation
```

---

## GitHub Safety Tips

* Ensure `.gitignore` includes:

  ```
  node_modules/
  backend/.env
  .vscode/
  *.log
  ```
* If `.env` was ever committed, remove it from Git history:

```bash
git rm --cached backend/.env
git commit -m "Remove .env from repo"
git push
```

---

## License

This project is for demonstration purposes. Modify and use according to your needs.

```

