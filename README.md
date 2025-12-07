# 🎅 Secret Santa Platform

<div align="center">

![Secret Santa](https://img.shields.io/badge/Secret%20Santa-Platform-red?style=for-the-badge&logo=gift)
![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)

**The Ultimate Secret Santa Experience with God Mode** 🎁

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [Tech Stack](#-tech-stack)

</div>

---

## 📖 Overview

Secret Santa Platform is a modern, full-featured web application designed to make organizing Secret Santa gift exchanges effortless and fun. With a beautiful dark-themed UI featuring glassmorphism effects, this platform offers both participant and admin experiences.

### ✨ What Makes It Special?

- **🔮 God Mode**: Admins can view all pairings and manage the entire exchange
- **🎨 Premium Design**: Modern dark theme with glassmorphism and smooth animations
- **🔒 Secure Authentication**: Built with NextAuth.js for robust user management
- **📱 Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- **⚡ Real-time Updates**: Instant notifications and status updates

---

## 🚀 Features

### For Participants
- ✅ **Easy Registration**: Quick sign-up with email and password
- 🎯 **Join Groups**: Enter group codes to participate in exchanges
- 🎁 **View Assignment**: See who you're buying a gift for
- 💬 **Wishlist**: Share gift preferences with your Secret Santa
- 📊 **Status Tracking**: Monitor exchange progress and deadlines

### For Admins (God Mode)
- 👑 **Full Visibility**: View all participant pairings
- 🎲 **Smart Matching**: Automatic gift assignment with exclusion rules
- 📧 **Notifications**: Send updates to all participants
- ⚙️ **Group Management**: Create, edit, and manage multiple exchanges
- 📈 **Analytics**: Track participation and completion rates

### Technical Features
- 🔐 **Secure Authentication**: JWT-based session management
- 💾 **MongoDB Integration**: Scalable cloud database
- 🎨 **Tailwind CSS v4**: Modern utility-first styling
- 🔄 **Server Actions**: Next.js 14+ server-side operations
- 📦 **Type-Safe**: Full TypeScript implementation

---

## 🎬 Demo

### Screenshots

#### Homepage
![Homepage](docs/screenshots/homepage.png)

#### Registration
![Registration](docs/screenshots/register.png)

#### Dashboard
![Dashboard](docs/screenshots/dashboard.png)

#### God Mode
![God Mode](docs/screenshots/admin.png)

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16.0.7 (App Router)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS v4 with custom theme
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Outfit)

### Backend
- **Runtime**: Node.js
- **Database**: MongoDB Atlas
- **ODM**: Mongoose 9.x
- **Authentication**: NextAuth.js v4
- **Password Hashing**: bcryptjs

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint 9
- **Build Tool**: Next.js Turbopack

---

## 📦 Installation

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **Git**
- **MongoDB Atlas Account** (free tier available)

### Step 1: Clone the Repository

```bash
git clone https://github.com/macamisp/Secret-Santa.git
cd Secret-Santa
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Environment Configuration

Create a `.env.local` file in the root directory:

```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/secretsanta?retryWrites=true&w=majority

# NextAuth Configuration
NEXTAUTH_SECRET=your-super-secret-key-here-generate-a-random-string
NEXTAUTH_URL=http://localhost:3000
```

#### How to Get Your MongoDB URI:

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database password
6. Replace `<dbname>` with `secretsanta`

#### Generate NEXTAUTH_SECRET:

```bash
# Using OpenSSL
openssl rand -base64 32

# Or using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Step 4: Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🎯 Usage

### Creating Your First Secret Santa Exchange

1. **Register an Account**
   - Navigate to `/register`
   - Fill in your details
   - Verify your email (if enabled)

2. **Create a Group**
   - Click "Create New Group"
   - Set exchange details (name, budget, deadline)
   - Generate a unique group code

3. **Invite Participants**
   - Share the group code with participants
   - They can join using the code on their dashboard

4. **Perform Matching**
   - Once all participants have joined
   - Click "Generate Pairings" in God Mode
   - System automatically assigns Secret Santas

5. **Manage the Exchange**
   - Monitor participant status
   - Send reminders
   - View all pairings (Admin only)

### User Roles

#### Participant
- Can join groups with codes
- View their assigned person
- Update wishlist
- Mark gift as purchased/delivered

#### Admin (Group Creator)
- All participant permissions
- View all pairings (God Mode)
- Manage group settings
- Send notifications
- Regenerate pairings if needed

---

## 📁 Project Structure

```
secret-santa-platform/
├── src/
│   ├── actions/          # Server actions
│   │   ├── auth.ts       # Authentication actions
│   │   ├── groups.ts     # Group management
│   │   └── admin.ts      # Admin operations
│   ├── app/              # Next.js app router
│   │   ├── api/          # API routes
│   │   │   └── auth/     # NextAuth configuration
│   │   ├── dashboard/    # User dashboard
│   │   ├── groups/       # Group pages
│   │   ├── login/        # Login page
│   │   ├── register/     # Registration page
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Homepage
│   │   └── globals.css   # Global styles
│   ├── lib/              # Utility libraries
│   │   ├── db.ts         # MongoDB connection
│   │   └── utils.ts      # Helper functions
│   ├── models/           # Mongoose models
│   │   ├── User.ts       # User schema
│   │   └── Group.ts      # Group schema
│   └── types/            # TypeScript types
├── public/               # Static assets
├── .env.local           # Environment variables (not in repo)
├── .gitignore           # Git ignore rules
├── next.config.ts       # Next.js configuration
├── tailwind.config.ts   # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Project dependencies
```

---

## 🗄️ Database Schema

### User Model
```typescript
{
  full_name: String,
  email: String (unique),
  password_hash: String,
  avatar_url: String?,
  createdAt: Date,
  updatedAt: Date
}
```

### Group Model
```typescript
{
  name: String,
  description: String,
  admin_id: ObjectId (ref: User),
  budget_limit: Number,
  exchange_date: Date,
  group_code: String (unique),
  participants: [{
    user_id: ObjectId (ref: User),
    wishlist: String,
    joined_at: Date
  }],
  pairings: [{
    giver_id: ObjectId (ref: User),
    receiver_id: ObjectId (ref: User)
  }],
  status: String (enum: pending, active, completed),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔒 Security Features

- ✅ **Password Hashing**: bcryptjs with salt rounds
- ✅ **JWT Sessions**: Secure token-based authentication
- ✅ **Environment Variables**: Sensitive data protected
- ✅ **CORS Protection**: Configured for production
- ✅ **Input Validation**: Server-side validation for all inputs
- ✅ **MongoDB Injection Prevention**: Mongoose sanitization

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository

3. **Configure Environment Variables**
   - Add all variables from `.env.local`
   - Update `NEXTAUTH_URL` to your production URL

4. **Deploy**
   - Vercel will automatically build and deploy
   - Your app will be live in minutes!

### Other Platforms

- **Netlify**: Similar process to Vercel
- **Railway**: Great for full-stack apps
- **DigitalOcean**: For more control

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use meaningful commit messages
- Add comments for complex logic
- Test thoroughly before submitting PR
- Update documentation as needed

---

## 🐛 Known Issues

- [ ] Email notifications not yet implemented
- [ ] Mobile UI needs optimization for very small screens
- [ ] Wishlist editing could be more intuitive

See [Issues](https://github.com/macamisp/Secret-Santa/issues) for a full list.

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@macamisp](https://github.com/macamisp)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- MongoDB for the database platform
- Tailwind CSS for the styling system
- Lucide for the beautiful icons
- All contributors and users of this platform

---

## 📞 Support

If you have any questions or need help:

- 📧 Email: support@secretsanta.com
- 💬 Discord: [Join our server](#)
- 🐛 Issues: [GitHub Issues](https://github.com/macamisp/Secret-Santa/issues)

---

<div align="center">

**Made with ❤️ and lots of ☕**

⭐ Star this repo if you find it helpful!

[Report Bug](https://github.com/macamisp/Secret-Santa/issues) • [Request Feature](https://github.com/macamisp/Secret-Santa/issues)

</div>
