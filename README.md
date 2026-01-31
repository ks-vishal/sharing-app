# 📤 Sharing-App

A full-stack file sharing application that allows users to upload files, generate shareable download links, and optionally send download links via email. Files are stored on Cloudinary and automatically expire after 24 hours.

## ✨ Features

- **File Upload** – Upload files (PDF, JPG, PNG, DOCX) to Cloudinary
- **Short URLs** – Generate unique short IDs for easy sharing
- **Email Notifications** – Send download links directly to recipients via email
- **Auto-Expiry** – Files automatically expire after 24 hours (configurable)
- **Cron Job** – Background task marks expired files in the database

## 🛠️ Tech Stack

### Backend (Server)
| Technology | Purpose |
|------------|---------|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Database & ODM |
| Cloudinary | Cloud file storage |
| Multer | File upload handling |
| Nodemailer | Email notifications |
| node-cron | Scheduled expiry checks |
| nanoid | Short URL generation |

### Frontend (Client)
| Technology | Purpose |
|------------|---------|
| React 19 | Frontend framework |
| TailwindCSS | Styling |
| Fetch API | HTTP requests |

## 📁 Project Structure

```
Sharing-App/
├── Server/
│   ├── configs/         # Database, Cloudinary & mailer config
│   ├── models/          # Mongoose schemas (File, URL)
│   ├── routes/          # API routes (upload, download)
│   ├── services/        # Business logic (cron, mail, URL)
│   ├── utils/           # Utility functions
│   └── server.js        # Entry point
│
├── client/
│   ├── public/          # Static assets
│   └── src/
│       ├── components/  # React components (Home)
│       └── App.js       # Main app component
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB instance
- Cloudinary account
- Gmail account (for sending emails)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ks-vishal/sharing-app.git
   cd sharing-app
   ```

2. **Setup Backend**
   ```bash
   cd Server
   npm install
   ```

3. **Setup Frontend**
   ```bash
   cd ../client
   npm install
   ```

### Configuration

Create a `.env` file in the `Server/` directory:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (Nodemailer)
MAIL_USERNAME=your_gmail@gmail.com
MAIL_PASSWORD=your_app_password
```

Create a `.env` file in the `client/` directory:

```env
REACT_APP_PUBLIC_API_URL=http://localhost:3000
```

### Running the Application

1. **Start the backend server**
   ```bash
   cd Server
   node server.js
   ```

2. **Start the frontend development server**
   ```bash
   cd client
   npm start
   ```

3. Open [http://localhost:3001](http://localhost:3001) in your browser

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Health check |
| `POST` | `/upload` | Upload a file (multipart/form-data) |
| `GET` | `/download/:shortId` | Download a file by short ID |

### Upload Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `file` | File | Yes | File to upload |
| `emailTo` | String | No | Recipient email address |
| `expiry` | Date | No | Custom expiry (default: 24 hours) |

## 🔒 Supported File Types

- PDF (`.pdf`)
- JPEG (`.jpg`, `.jpeg`) 
- PNG (`.png`)
- Word Documents (`.docx`)

## 📄 License

This project is licensed under the ISC License.
