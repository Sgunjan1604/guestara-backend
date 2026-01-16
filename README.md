# Guestara Backend Assignment

Backend system for a hospitality upsell & booking platform, built using **Node.js, Express, MongoDB, and Docker**.

This project demonstrates dynamic pricing strategies, availability handling, and booking with **double-booking prevention**.

---

## 🎥 Video Walkthrough

👉 **Loom / Demo Video:**  


((https://1drv.ms/v/c/b734ce370bd67c45/IQDM5DMv0kw3RLnIVOQeTvaQAT6Yg0ATdONO4U17Sirv0BQ?e=RWUrRi))

---

## 🚀 Features

### ✅ Category Management
- Create and list categories
- Soft delete support

### ✅ Item Management
- Create items under categories
- Search, filter, sort, and paginate items
- Items support pricing and availability configurations

---

### ✅ Pricing Engine (Core Feature)
The system supports multiple pricing strategies:

- **STATIC** – Fixed base price  
- **DISCOUNTED** – Flat or percentage-based discount  
- **TIERED** – Price varies based on quantity  
- **DYNAMIC** – Time-based pricing using time windows  
- **COMPLIMENTARY** – Free items (price always zero)  

Pricing is calculated dynamically through a dedicated **service layer**.

---

### ✅ Availability & Booking
- Define recurring availability (days & time slots) for items
- Fetch available slots for an item
- Book an item for a specific **date & time**
- **Prevents double booking** using database-level unique constraints

---

### API Endpoints
POST /categories

GET /categories

POST /items

GET /items

GET /items/:id/price

GET /items/:id/availability

POST /bookings
API testing can be done using Postman.

## 🛠 Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB
- **ODM:** Mongoose
- **Containerization:** Docker & Docker Compose

---

## 🐳 Run with Docker (Recommended)

### Prerequisites
- Docker
- Docker Compose

---

### **Backend Available At**
```bash
http://localhost:5000


### ▶️ Start the Application
```bash
npm run dev


