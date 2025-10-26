# 📝 Medium-Like Backend Project

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue?logo=postgresql)
![Prisma](https://img.shields.io/badge/Prisma-4.x-blue?logo=prisma)
![License](https://img.shields.io/badge/License-MIT-yellow)

A **Medium-like backend** built with **TypeScript**, **PostgreSQL**, and **Prisma ORM**.  
This project was created to **learn backend development** and practice **PostgreSQL + Prisma** while building a real-world application.

---

## ✨ Features

- 🔑 **Authentication & Roles**
  - User registration, login & logout  
  - JWT-based auth  
  - Roles: `USER` and `AUTHOR`  
  - Promote a user to `AUTHOR`  

- 📰 **Articles**
  - CRUD operations (author-only for create/update/delete)  
  - Auth users can read articles  
  - Assign **tags** & **categories**  

- 🗂️ **Categories**
  - One-to-Many: Category → Articles  
  - Create, update, read single/all categories  

- 🏷️ **Tags**
  - Many-to-Many with Articles  
  - Add, update, delete tags  
  - Fetch single tag  

- 💬 **Comments**
  - Add, update, delete comments  
  - Relation with users & articles  

- 👍👎 **Reactions (Like / Dislike)**
  - Toggle logic:
    - First-time → add  
    - Different type → update  
    - Same type → remove  
  - Fetch total likes/dislikes per article  

---

## 🚀 API Routes

### 🔐 **Authentication**
| Method | Route | Description |
|--------|-------|-------------|
| POST   | `/register` | Register new user |
| POST   | `/login` | Login user |
| GET    | `/logout` | Logout user |
| PATCH  | `/make-author/:userId` | Promote user to Author (protected, author only) |

---

### 📰 **Articles**
| Method | Route | Description |
|--------|-------|-------------|
| POST   | `/add` | Add new article (author only) |
| PUT    | `/update/:id` | Update article (author only) |
| DELETE | `/delete/:id` | Delete article (author only) |
| GET    | `/single/:id` | Get single article |
| GET    | `/all` | Get all articles |

---

### 🗂️ **Categories**
| Method | Route | Description |
|--------|-------|-------------|
| POST   | `/add/:articleId` | Add category to article (author only) |
| PATCH  | `/update/:categoryId` | Update category (author only) |
| GET    | `/all` | Get all categories |
| GET    | `/single/:categoryId` | Get single category |

---

### 🏷️ **Tags**
| Method | Route | Description |
|--------|-------|-------------|
| POST   | `/add/:articleId` | Add tag to article (author only) |
| PATCH  | `/update-tag/article/:articleId/tag/:tagId` | Update tag (author only) |
| DELETE | `/delete/:tagId` | Delete tag (author only) |
| GET    | `/single/:tagId` | Get single tag |

---

### 👍👎 **Reactions**
| Method | Route | Description |
|--------|-------|-------------|
| POST   | `/article/:articleId/like` | Add like or dislike (toggle) |
| GET    | `/articles/:articleId/reactions` | Get total likes/dislikes |

---

### 💬 **Comments**
| Method | Route | Description |
|--------|-------|-------------|
| POST   | `/add/:articleId` | Add comment (protected) |
| PUT    | `/update/:articleId` | Update comment (protected) |
| DELETE | `/delete/:articleId` | Delete comment (protected) |

---

## 🖼️ Screenshots 

Here are some screenshots showing the backend in action:

### 📁 Project structure

<img width="1366" height="768" alt="Screenshot 2025-10-26 064645" src="https://github.com/user-attachments/assets/2efa5df3-d869-46c2-9671-aad2e022d469" />
<img width="1366" height="768" alt="Screenshot 2025-10-26 064738" src="https://github.com/user-attachments/assets/747cbb05-44c9-448b-8c7b-91bcd7a7d68b" />


### 1️⃣ User Authentication
- Register / Login / Logout
<img width="1366" height="768" alt="Screenshot 2025-10-26 065221" src="https://github.com/user-attachments/assets/1e25c141-6155-4b0f-b79b-5a29e2575e52" />
<img width="1366" height="768" alt="Screenshot 2025-10-26 065227" src="https://github.com/user-attachments/assets/f6d53109-98b9-4553-998f-3b2af0fdf369" />

---

### 2️⃣ Articles CRUD
- Create, Read, Update, Delete Articles
<img width="1366" height="720" alt="Screenshot 2025-10-26 065520" src="https://github.com/user-attachments/assets/8b80003a-742d-4840-991c-633d20f3b7d4" />
<img width="1366" height="720" alt="Screenshot 2025-10-26 065546" src="https://github.com/user-attachments/assets/281bff5b-2d93-4c08-97db-c381b5825c11" />

---

### 3️⃣ Categories & Tags
- Add / Update / Delete Categories & Tags
<img width="1366" height="720" alt="Screenshot 2025-10-26 065808" src="https://github.com/user-attachments/assets/280be451-05dd-42d2-b61f-f8329f18396e" />
<img width="1366" height="720" alt="Screenshot 2025-10-26 065737" src="https://github.com/user-attachments/assets/789c3593-b9a1-4ff0-922d-353c43d302da" />

---

### 4️⃣ Comments
- Add, Update, Delete Comments
<img width="1366" height="720" alt="Screenshot 2025-10-26 070155" src="https://github.com/user-attachments/assets/48a9ce46-eb1e-4bae-9ca5-de2b595976bc" />

<img width="1366" height="720" alt="Screenshot 2025-10-26 065932" src="https://github.com/user-attachments/assets/b2d205ec-d4c1-4bde-b9e2-04ba35eb1df7" />

---

### 5️⃣ Reactions (Like / Dislike)
- Toggle Logic, Total Count
<img width="1366" height="720" alt="Screenshot 2025-10-26 070414" src="https://github.com/user-attachments/assets/3f03beef-8881-4ae6-88e1-c37ae27691a8" />
<img width="1366" height="720" alt="Screenshot 2025-10-26 070433" src="https://github.com/user-attachments/assets/76c039d7-f7a0-46c2-8255-b8c4bfc3c742" />

---

## ⚙️ Usage

1. **Clone the repository**
```bash
git clone <repo-url>
