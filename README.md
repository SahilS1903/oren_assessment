# ESG Questionnaire Platform

A comprehensive full-stack application for tracking and managing Environmental, Social, and Governance (ESG) metrics. Companies can input quantitative ESG data across multiple financial years, view real-time calculated metrics, and generate comprehensive reports.

## 🌟 Features

### Core Functionality
- **Multi-year ESG Data Collection**: Input metrics across different financial years
- **Real-time Calculations**: Auto-calculated derived metrics update as you type
- **Interactive Dashboard**: Visual overview of ESG performance
- **Comprehensive Reports**: Export data as PDF or Excel
- **Secure Authentication**: JWT-based user registration and login

### ESG Metrics Tracked

#### Environmental
- Total electricity consumption (kWh)
- Renewable electricity consumption (kWh)
- Total fuel consumption (liters)
- Carbon emissions (T CO₂e)

#### Social
- Total number of employees
- Number of female employees
- Average training hours per employee (per year)
- Community investment spend (INR)

#### Governance
- % of independent board members
- Data privacy policy (Yes/No)
- Total revenue (INR)

### Auto-Calculated Metrics
- **Carbon Intensity**: Carbon emissions ÷ Total revenue (T CO₂e / INR)
- **Renewable Electricity Ratio**: 100 × (Renewable electricity ÷ Total electricity) (%)
- **Diversity Ratio**: 100 × (Female employees ÷ Total employees) (%)
- **Community Spend Ratio**: 100 × (Community spend ÷ Total revenue) (%)

## 🛠 Tech Stack

### Frontend
- **React 18** with JavaScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **React Hook Form** for form management
- **Recharts** for data visualization
- **Axios** for API communication
- **jsPDF & ExcelJS** for report exports

### Backend
- **Node.js** with Express.js
- **PostgreSQL** database
- **Prisma ORM** for database management
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Express Validator** for input validation

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd oren_assessment
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Setup environment variables**
   ```bash
   # Copy backend environment file
   cp backend/.env.example backend/.env
   
   # Edit the .env file with your database credentials
   # Update DATABASE_URL with your PostgreSQL connection string
   ```

4. **Setup database**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Run database migrations
   npm run db:migrate
   
   # Seed the database with questions and test data
   npm run db:seed
   ```

5. **Start the development servers**
   ```bash
   # Start both frontend and backend
   npm run dev
   
   # Or start them separately:
   # npm run dev:frontend  (runs on http://localhost:3000)
   # npm run dev:backend   (runs on http://localhost:3001)
   ```

### Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Database connection
DATABASE_URL="postgresql://username:password@localhost:5432/esg_platform"

# JWT Secret (use a strong random string in production)
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# Server configuration
PORT=3001
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL="http://localhost:3000"
```

## 🧪 Test Credentials

Use these credentials to test the application:

- **Email**: test@example.com
- **Password**: password123

The test user comes with pre-populated sample data for 2023-24 and 2024-25 financial years.

## 📁 Project Structure

```
oren_assessment/
├── frontend/                 # React frontend application
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/          # Page components
│   │   ├── contexts/       # React context providers
│   │   ├── services/       # API service functions
│   │   └── utils/          # Utility functions
│   └── package.json
├── backend/                 # Node.js backend API
│   ├── src/
│   │   ├── controllers/    # Route handlers
│   │   ├── routes/         # Express routes
│   │   ├── middleware/     # Custom middleware
│   │   └── scripts/        # Database scripts
│   ├── prisma/
│   │   └── schema.prisma   # Database schema
│   └── package.json
└── package.json            # Root package.json for scripts
```

## 🔧 Available Scripts

```bash
# Development
npm run dev                 # Start both frontend and backend
npm run dev:frontend        # Start frontend only
npm run dev:backend         # Start backend only

# Production Build
npm run build              # Build both frontend and backend
npm run start              # Start production server

# Database
npm run db:generate        # Generate Prisma client
npm run db:migrate         # Run database migrations
npm run db:seed           # Seed database with initial data

# Installation
npm run install:all       # Install all dependencies
```

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Questions
- `GET /api/questions` - Get all ESG questions
- `GET /api/questions/category/:category` - Get questions by category

### Responses
- `POST /api/responses` - Save ESG responses
- `GET /api/responses` - Get user's responses
- `GET /api/responses/stats` - Get response statistics

### Summary
- `GET /api/summary` - Get calculated metrics and summary data
- `GET /api/summary/:year` - Get summary for specific year

## 🎨 Design & Styling

The application follows the color scheme and design principles from [orennow.com](https://orennow.com):

- **Primary Colors**: Blue tones for primary actions and branding
- **Secondary Colors**: Gray tones for content and backgrounds
- **Success/Warning/Error**: Semantic colors for status indication
- **Typography**: Inter and Poppins fonts for modern, clean text
- **Layout**: Clean, minimal design with card-based components

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the frontend: `cd frontend && npm run build`
2. Deploy the `build` folder to your hosting service
3. Set environment variable: `REACT_APP_API_URL=your-backend-url`

### Backend (Railway/Heroku/DigitalOcean)
1. Set up PostgreSQL database
2. Configure environment variables
3. Run migrations: `npm run db:migrate`
4. Seed database: `npm run db:seed`
5. Start server: `npm start`

### Environment Variables for Production
```env
DATABASE_URL="your-production-database-url"
JWT_SECRET="your-strong-production-jwt-secret"
NODE_ENV="production"
FRONTEND_URL="your-frontend-domain"
```

## 🔒 Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Server-side validation with express-validator
- **Rate Limiting**: Protection against spam requests
- **CORS Configuration**: Controlled cross-origin requests
- **SQL Injection Protection**: Prisma ORM prevents SQL injection

## 🧩 Key Features Implemented

### Real-time Calculations
- Metrics update automatically as users input data
- Validation ensures data integrity
- Visual feedback for calculated values

### Data Visualization
- Interactive charts using Recharts
- Bar charts for trend analysis
- Pie charts for category breakdown
- Responsive design for all screen sizes

### Export Functionality
- PDF reports with jsPDF
- Excel spreadsheets with ExcelJS
- Formatted data with proper headers
- Download triggers with user feedback

### User Experience
- Intuitive navigation with React Router
- Toast notifications for user feedback
- Loading states and error handling
- Responsive design for mobile and desktop

## 🔄 Future Improvements

- **Multi-company Support**: Allow users to manage multiple companies
- **Advanced Analytics**: More sophisticated ESG scoring algorithms
- **Benchmarking**: Compare performance against industry standards
- **Goal Setting**: Set and track ESG improvement targets
- **API Integration**: Connect with external ESG data providers
- **Advanced Visualizations**: More chart types and interactive dashboards
- **Audit Trail**: Track changes and maintain history
- **Role-based Access**: Different permission levels for team members

## 🐛 Known Limitations

- Currently supports single-user per account
- Limited to predefined ESG metrics
- No data import from external sources
- Basic reporting templates
- No mobile application

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For questions or support, please contact the development team or create an issue in the GitHub repository.

---

**Built with ❤️ for sustainable business practices**
# oren_assessment
