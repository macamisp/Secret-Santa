# 🚀 Quick Setup Guide

This guide will help you get the Secret Santa Platform up and running in under 5 minutes!

## ⚡ Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/macamisp/Secret-Santa.git
cd Secret-Santa
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up MongoDB Atlas (Free)

1. **Create Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
   - Sign up for a free account

2. **Create Cluster**
   - Click "Build a Database"
   - Choose "FREE" tier (M0)
   - Select your preferred region
   - Click "Create Cluster"

3. **Create Database User**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Set username and password (save these!)
   - Grant "Read and write to any database"

4. **Configure Network Access**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/`

### 4. Configure Environment Variables

Create `.env.local` in the project root:

```env
# Replace with your MongoDB connection string
MONGODB_URI=mongodb+srv://username:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/secretsanta?retryWrites=true&w=majority

# Generate a random secret (see below)
NEXTAUTH_SECRET=your-super-secret-random-string-here

# Local development URL
NEXTAUTH_URL=http://localhost:3000
```

**Generate NEXTAUTH_SECRET:**

**Windows (PowerShell):**
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

**Mac/Linux:**
```bash
openssl rand -base64 32
```

**Or use Node.js:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 5. Run the Application
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser! 🎉

## 📱 First Steps in the App

### Create Your First Account
1. Click "Sign Up" or go to `/register`
2. Enter your name, email, and password
3. Click "Create Account"

### Create a Secret Santa Group
1. Log in with your credentials
2. Click "Create New Group"
3. Fill in:
   - Group name (e.g., "Office Secret Santa 2025")
   - Description
   - Budget limit
   - Exchange date
4. Click "Create Group"
5. Share the generated group code with participants!

### Join a Group (as Participant)
1. Log in to your account
2. Click "Join Group"
3. Enter the group code
4. Add your wishlist (optional)
5. Wait for the admin to generate pairings

### Generate Pairings (Admin Only)
1. Go to your group's admin page
2. Click "Generate Pairings"
3. System automatically assigns Secret Santas
4. View all pairings in God Mode!

## 🔧 Troubleshooting

### MongoDB Connection Issues

**Error: "MongoServerError: bad auth"**
- Check your username and password in the connection string
- Ensure you replaced `<password>` with your actual password

**Error: "MongooseServerSelectionError"**
- Check your IP is whitelisted in MongoDB Atlas Network Access
- Verify your internet connection

### NextAuth Issues

**Error: "NEXTAUTH_SECRET is not set"**
- Make sure `.env.local` exists in the project root
- Verify `NEXTAUTH_SECRET` is defined in `.env.local`
- Restart the dev server after creating `.env.local`

### Port Already in Use

**Error: "Port 3000 is already in use"**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

Or run on a different port:
```bash
PORT=3001 npm run dev
```

## 📚 Additional Resources

- [Full Documentation](README.md)
- [Contributing Guide](CONTRIBUTING.md)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Guide](https://next-auth.js.org/getting-started/introduction)

## 🆘 Need Help?

- 🐛 [Report Issues](https://github.com/macamisp/Secret-Santa/issues)
- 💬 [Discussions](https://github.com/macamisp/Secret-Santa/discussions)
- 📧 Email: support@secretsanta.com

## ✅ Checklist

- [ ] Repository cloned
- [ ] Dependencies installed
- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] Network access configured
- [ ] `.env.local` file created
- [ ] Environment variables set
- [ ] Development server running
- [ ] Application accessible at localhost:3000
- [ ] First account created
- [ ] First group created

---

**Congratulations! You're ready to spread some holiday cheer!** 🎅🎁

If you found this helpful, please ⭐ star the repository!
