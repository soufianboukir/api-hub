# API-Hub

**API-Hub** is a modern marketplace platform for sharing and discovering APIs. Built with **Next.js**, **MongoDB**, and **TypeScript**, it enables users to explore, review, and interact with APIs shared by other developers.

![home](https://github.com/user-attachments/assets/96f856c6-6ddd-4cd9-acb8-f99fdb2fd245)


## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Database:** MongoDB (via Mongoose)
- **Authentication:** NextAuth (Email/Password + Google OAuth)
- **Styling:** Tailwind CSS

---

## Features

### User Authentication

- Register with email and password
- Login with:
  - Email and password
  - Google OAuth
- Secure session handling via NextAuth

### API Marketplace

- Browse and explore published APIs
- Publish your own API to the marketplace
- Update or delete your own APIs
- Mark APIs as **favorites** for later access
- Leave **comments/reviews** on other users’ APIs

### Messaging

- Send direct messages to API owners
- Access conversation history in an inbox view

### Notifications

- Receive notifications for:
  - New messages
  - New reviews
  - Updates on saved APIs

### Profile Management

- View and edit personal profile
- Upload profile photo
- Manage your published APIs

---

## Installation
1. Clone the repository and install dependecies
  ```
    git clone https://github.com/soufianboukir/api-hub.git
    cd api-hub
    npm install
  ```

2. create and configure .env in root direcroty
   ```
      GOOGLE_CLIENT_ID=your.google-client.id
      GOOGLE_CLIENT_SECRET=your.google-client.secret
      MONGO_URL=mongodb://localhost:27017/api-hub
      NEXTAUTH_SECRET=nextauthsecret
      NEXTAUTH_URL=http://localhost:3000
      NEXTAUTH_DEBUG=true
      NODE_ENV='developement'
      NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
      SERVER_URL=http://localhost:3005
   ```

3. Run the app
  ```bash
    npm run dev
  ```

### open your browser and type localhost:5173

built with ❤️ by **soufian**.
