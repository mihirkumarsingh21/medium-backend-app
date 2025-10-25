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

## 🖼️ Screenshots / Proof of Functionality

Here are some screenshots showing the backend in action:

### 1️⃣ User Authentication
- Register / Login / Logout
![Register Screenshot](./screenshots/register.png)
![Login Screenshot](./screenshots/login.png)

---

### 2️⃣ Articles CRUD
- Create, Read, Update, Delete Articles
![Add Article](./screenshots/add-article.png)
![Get All Articles](./screenshots/get-all-articles.png)

---

### 3️⃣ Categories & Tags
- Add / Update / Delete Categories & Tags
![Add Category](./screenshots/add-category.png)
![Add Tag](./screenshots/add-tag.png)

---

### 4️⃣ Comments
- Add, Update, Delete Comments
![Add Comment](./screenshots/add-comment.png)

---

### 5️⃣ Reactions (Like / Dislike)
- Toggle Logic, Total Count
![Add Like](./screenshots/add-like.png)
![Get Reactions](./screenshots/get-reactions.png)

---

## ⚙️ Usage

1. **Clone the repository**
```bash
git clone <repo-url>
