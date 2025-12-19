# Interior Design using AI

An intelligent interior design application powered by artificial intelligence, enabling users to visualize and create stunning interior designs with AI-driven recommendations and transformations.

## 📋 Project Overview

Interior Design using AI is a full-stack web application that leverages artificial intelligence to help users create, visualize, and improve interior designs. The application combines cutting-edge AI models with an intuitive user interface to provide professional-grade design suggestions and room transformations.

Whether you're an interior designer, homeowner, or design enthusiast, this application provides intelligent insights and visual transformations to bring your vision to life.

## ✨ Features

- **AI-Powered Design Suggestions** - Get intelligent interior design recommendations based on room dimensions, style preferences, and budget
- **Room Visualization** - Upload images of your space and see AI-generated design transformations
- **Multiple Design Styles** - Explore various design aesthetics including modern, minimalist, industrial, rustic, contemporary, and more
- **Color Palette Generation** - Automatic color scheme suggestions based on design preferences
- **Furniture Recommendations** - AI-curated furniture suggestions tailored to your space and style
- **User Authentication** - Secure user management with Clerk authentication
- **Project Management** - Save, organize, and manage multiple design projects
- **Responsive Design** - Seamless experience across desktop, tablet, and mobile devices
- **Real-time Collaboration** - Share designs and get feedback in real-time

## 🛠️ Tech Stack

- **Frontend**: React, Next.js, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL, Supabase
- **Authentication**: Clerk
- **AI/ML**: Advanced AI models for image processing and design generation
- **Deployment**: Vercel, Docker

## 📦 Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16.0 or higher)
- npm or yarn package manager
- PostgreSQL (v12 or higher)
- Git

### Environment Variables Setup

Create a `.env.local` file in the root directory and configure the following environment variables:

#### PostgreSQL Configuration
```env
# Database connection string for local development
DATABASE_URL=postgresql://username:password@localhost:5432/interior_design_db
DB_HOST=localhost
DB_PORT=5432
DB_NAME=interior_design_db
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password
```

#### Supabase Configuration
```env
# Supabase project credentials
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anonymous_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Supabase database connection (optional, if using Supabase hosting)
SUPABASE_DB_URL=postgresql://postgres:password@db.your-project.supabase.co:5432/postgres
```

#### Clerk Authentication Configuration
```env
# Clerk authentication keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_API_KEY=your_clerk_api_key

# Clerk webhook signing secret (for server-side events)
CLERK_WEBHOOK_SECRET=your_webhook_signing_secret
```

#### Additional Configuration
```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NODE_ENV=development

# AI Service Configuration
AI_API_KEY=your_ai_service_api_key
AI_API_ENDPOINT=https://api.ai-service.com
```

### Step-by-Step Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Vikram2003-07/Interior-Design-using-AI.git
   cd Interior-Design-using-AI
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables**
   - Create `.env.local` file with all required variables (see Environment Variables Setup above)
   - Ensure all API keys and credentials are properly set

4. **Set up the database**
   ```bash
   # Create PostgreSQL database
   createdb interior_design_db
   
   # Or use Supabase dashboard to create the database
   
   # Run database migrations
   npm run db:migrate
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`

6. **Verify installation**
   - Open your browser and navigate to `http://localhost:3000`
   - Sign in with Clerk authentication
   - Create a test project to verify all systems are working

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push your code to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com)
   - Click "New Project" and select your repository
   - Vercel will auto-detect the Next.js project

3. **Configure Environment Variables**
   - In Vercel project settings, go to "Environment Variables"
   - Add all variables from your `.env.local` file:
     - PostgreSQL/Supabase connection strings
     - Clerk authentication keys
     - API keys and endpoints
   - Make sure to set them for production environment

4. **Configure Database**
   - Point to your production PostgreSQL instance or Supabase project
   - Ensure the database connection string is correct for production
   - Run migrations on the production database

5. **Deploy**
   - Click "Deploy" button
   - Vercel will build and deploy your application
   - Update Clerk and Supabase allowed domains to include your Vercel URL

### Deploy with Docker

1. **Build Docker image**
   ```bash
   docker build -t interior-design-ai .
   ```

2. **Run Docker container**
   ```bash
   docker run -p 3000:3000 \
     -e DATABASE_URL="your_production_db_url" \
     -e NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_key" \
     -e CLERK_SECRET_KEY="your_secret" \
     -e NEXT_PUBLIC_SUPABASE_URL="your_supabase_url" \
     -e NEXT_PUBLIC_SUPABASE_ANON_KEY="your_key" \
     interior-design-ai
   ```

3. **Deploy to cloud platform**
   - Push Docker image to Docker Hub or container registry
   - Deploy using your preferred hosting platform (AWS, GCP, Azure, etc.)

### Post-Deployment Checklist

- [ ] Verify all environment variables are set correctly
- [ ] Test user authentication (Clerk login/signup)
- [ ] Test database connectivity
- [ ] Verify file uploads and image processing work
- [ ] Test AI features and design generation
- [ ] Check responsive design on multiple devices
- [ ] Monitor error logs and performance metrics
- [ ] Set up monitoring and alerting for production

## 📝 Usage

1. **Sign Up/Log In**
   - Create an account or sign in using Clerk authentication

2. **Create a New Project**
   - Start a new design project
   - Provide room dimensions and style preferences

3. **Upload Images**
   - Upload photos of your current space
   - Let the AI analyze and understand your room

4. **Get Recommendations**
   - Receive AI-generated design suggestions
   - Explore different style options
   - View color palettes and furniture recommendations

5. **Refine and Save**
   - Customize recommendations to your liking
   - Save your designs and projects
   - Export designs for sharing

## 🔧 Development

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Database migrations
npm run db:migrate

# Linting
npm run lint

# Testing
npm run test
```

### Project Structure

```
├── pages/              # Next.js pages and API routes
├── components/         # React components
├── lib/               # Utility functions and helpers
├── public/            # Static assets
├── styles/            # Global and component styles
├── types/             # TypeScript type definitions
└── README.md          # This file
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Support

For support, issues, or questions:

- Open an [issue](https://github.com/Vikram2003-07/Interior-Design-using-AI/issues) on GitHub
- Contact the development team
- Check existing documentation and FAQs

## 🔐 Security

- User data is encrypted in transit and at rest
- Authentication handled securely by Clerk
- Database credentials stored as environment variables
- Regular security audits and updates

---

**Made with ❤️ by Vikram2003-07**
