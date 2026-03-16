# Fast React Pizza — Backend

REST API for the Fast React Pizza app. Built with **Node.js**, **Express**, and **Sequelize ORM** backed by **MySQL**.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| Node.js + Express | HTTP server & routing |
| Sequelize | ORM for DB access |
| MySQL | Database |
| CORS | Allow cross-origin requests from the frontend |
| dotenv | Load environment variables |

---

## Project Structure

```
backend/
├── src/
│   ├── index.js              # Entry point — starts Express server
│   ├── models/
│   │   ├── index.js          # Sequelize instance, associations, exports
│   │   ├── MenuItem.js       # MenuItem model
│   │   ├── Order.js          # Order model
│   │   └── OrderItem.js      # OrderItem model
│   ├── routes/
│   │   ├── menuRoutes.js     # GET /api/menu
│   │   └── orderRoutes.js    # GET, POST, PATCH /api/order
│   └── middleware/
│       └── errorHandler.js   # Global error handler
└── seed.js                   # Seeds 18 pizza items into the DB
```

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Create a `.env` file in the `backend/` directory:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=fast_pizza
DB_USER=root
DB_PASS=yourpassword
PORT=3001
```

### 3. Create the MySQL database

```sql
CREATE DATABASE fast_pizza;
```

### 4. Seed the database

```bash
npm run seed
```

This drops and recreates all tables, then inserts 18 pizza menu items.

### 5. Start the server

```bash
# Development (auto-restarts on file change)
npm run dev

# Production
npm start
```

Server runs at `http://localhost:3001`.

---

## API Reference

### Health Check

```
GET /api/health
```

**Response**
```json
{ "status": "ok", "timestamp": "2026-03-16T10:00:00.000Z" }
```

---

### Menu

#### Get all menu items

```
GET /api/menu
```

**Response**
```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "name": "Margherita",
      "unitPrice": 12,
      "imageUrl": "...",
      "ingredients": ["tomato", "mozzarella", "basil"],
      "soldOut": false
    }
  ]
}
```

---

### Orders

#### Get a single order

```
GET /api/order/:id
```

Returns the order along with its cart items.

**Response**
```json
{
  "status": "success",
  "data": {
    "id": "uuid",
    "customer": "John",
    "phone": "123456789",
    "address": "123 Main St",
    "priority": false,
    "orderPrice": 27,
    "priorityPrice": 0,
    "estimatedDelivery": "2026-03-16T10:30:00.000Z",
    "status": "preparing",
    "cart": [...]
  }
}
```

**Errors**
- `404` — Order not found

---

#### Create an order

```
POST /api/order
```

**Request Body**
```json
{
  "customer": "John",
  "phone": "123456789",
  "address": "123 Main St",
  "priority": false,
  "position": "40.7128,-74.0060",
  "cart": [
    {
      "pizzaId": 1,
      "name": "Margherita",
      "quantity": 2,
      "unitPrice": 12,
      "totalPrice": 24
    }
  ]
}
```

**Business Logic**
- `orderPrice` = sum of all `cart[].totalPrice`
- `priorityPrice` = `orderPrice * 0.2` if `priority` is `true`, else `0`
- `estimatedDelivery` = 30 minutes from creation time

**Response** — `201 Created`
```json
{
  "status": "success",
  "data": { ...order with cart }
}
```

---

#### Update an order

```
PATCH /api/order/:id
```

Partial update of order fields. Commonly used to toggle priority.

**Request Body**
```json
{ "priority": true }
```

When `priority` is updated, `priorityPrice` is automatically recalculated (`orderPrice * 0.2`).

**Response**
```json
{
  "status": "success",
  "data": { ...updated order }
}
```

**Errors**
- `404` — Order not found

---

## Database Models

### MenuItem
| Field | Type | Notes |
|-------|------|-------|
| id | INT (PK) | Auto-increment |
| name | STRING | |
| unitPrice | FLOAT | |
| imageUrl | STRING | |
| ingredients | JSON | Stored as JSON array |
| soldOut | BOOLEAN | Default: `false` |

### Order
| Field | Type | Notes |
|-------|------|-------|
| id | UUID (PK) | Auto-generated (UUIDV4) |
| customer | STRING | |
| phone | STRING | |
| address | STRING | |
| priority | BOOLEAN | Default: `false` |
| orderPrice | FLOAT | |
| priorityPrice | FLOAT | Default: `0` |
| estimatedDelivery | DATE | |
| status | STRING | Default: `"preparing"` |
| position | STRING | GPS coords |
| cart | OrderItem[] | Association |

### OrderItem
| Field | Type | Notes |
|-------|------|-------|
| id | INT (PK) | Auto-increment |
| pizzaId | INT | |
| name | STRING | |
| quantity | INT | |
| unitPrice | FLOAT | |
| totalPrice | FLOAT | |
| orderId | STRING | FK → Order (cascade delete) |

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start with file watching (development) |
| `npm start` | Start server (production) |
| `npm run seed` | Drop, recreate tables, and seed menu items |
