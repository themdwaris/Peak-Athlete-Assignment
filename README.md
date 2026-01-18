# Peak Athlete Dashboard

A simple athlete management and leaderboard dashboard built as an assignment using **Next.js (App Router)**, **JavaScript**, **MongoDB**, **Mongoose**, **Tailwind CSS**, and **Axios**.

This project focuses on clean CRUD operations, role-based UI behavior (Coach vs Viewer), and score management without implementing full authentication.

---

## 🚀 Features

* Athlete CRUD (Create, Read, Update, Delete)
* Add scores to athletes
* Scores stored as history (array)
* Leaderboard based on total score
* Coach login using static credentials (via environment variables)
* Viewer mode (read-only)
* Modal-based forms
* Responsive dashboard UI
* Context API for global state

---

## 🧱 Tech Stack

* **Frontend**: Next.js (App Router), React, Tailwind CSS
* **Backend**: Next.js API Routes
* **Database**: MongoDB with Mongoose
* **State Management**: React Context API
* **HTTP Client**: Axios

---

## 📁 Project Structure

```
app/
 ├─ api/
 │   ├─ athletes/route.js
 │   ├─ add-score/route.js
 │
 ├─ dashboard/
 ├─ login/
 ├─ page.js

context/
 └─ AthleteAppContext.js

models/
 └─ athlete.js

lib/
 └─ db.js

components/
 ├─ Sidebar.jsx
 ├─ Header.jsx
 ├─ AddAthleteForm.jsx
 ├─ AddScoreModal.jsx
 ├─ AthleteTable.jsx
 └─ Leaderboard.jsx
```



## 🔗 API Endpoints

### ➕ Create Athlete

`POST /api/athletes`

Body:

```json
{ "name": "John", "age": 22, "sport": "Football" }
```

---

### 📥 Get All Athletes

`GET /api/athletes`

---

### ✏️ Update Athlete

`PATCH /api/athletes`

Body (partial or full update supported):

```json
{ "athleteId": "id", "name": "Updated Name" }
```

---

### 🗑 Delete Athlete

`DELETE /api/athletes`

Body:

```json
{ "athleteId": "id" }
```



---

## 👤 Coach Login (No Auth Library)

Authentication is intentionally simplified:

* Static credentials stored in `.env`
* On successful login, UI switches to Coach mode
* Coach can add, edit, delete athletes and scores
* Viewer mode is read-only

---

---

## ▶️ Running the Project

```bash
npm install
npm run dev
```

Open: `http://localhost:3000`

---

## 📌 Notes

* No external authentication library used
* API routes follow REST conventions
* Designed to be easy to understand and extend
* Suitable for assignments and interviews

---

## 🙌 Future Improvements

* Proper authentication (JWT / NextAuth)
* Role-based route protection
* Score edit/delete
* Pagination and filters
* Charts for performance analytics

---

## 📄 License

This project is for learning and assignment purposes.

---

**Built with focus on clarity, simplicity, and clean architecture.**
