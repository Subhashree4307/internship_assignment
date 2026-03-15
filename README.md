# Employee Leave Management Platform

A modern, AI-powered employee leave management system built with Next.js, designed to streamline leave requests, automate approvals, and manage employee absences efficiently.

## Features

- **Streamlined Leave Requests**: Easy online leave application forms with support for multiple leave types (vacation, sick, personal)
- **Automated Approval Workflows**: Configurable approval hierarchies with real-time notifications
- **Leave Balance Management**: Real-time balance tracking with accrual calculations and comprehensive reports
- **Calendar Integration**: Sync with calendar systems for better visibility
- **Mobile-Friendly**: Responsive design that works on all devices
- **Secure & Compliant**: Built with security best practices and data protection

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS, Framer Motion for animations
- **Backend**: Supabase (PostgreSQL database, authentication, real-time features)
- **UI Components**: Radix UI, Shadcn/ui
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React

## Prerequisites

Before running this project locally, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** or **pnpm**
- **Git**

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd internship-assignment
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup**

   The project requires environment variables to connect to Supabase. The `.env.local` file should be placed in the root directory of the project.

   **Important**: The `.env.local` file is provided in the attached PDF document. Please copy the contents from the PDF and create a `.env.local` file in the root directory with the following structure:

   ```env
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

   Make sure to replace the placeholder values with the actual keys from the PDF.

4. **Database Setup**

   The project uses Supabase as the backend. Make sure your Supabase project is properly configured with the required tables and authentication settings.

## Running Locally

1. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

2. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application running.

3. **Build for production** (optional)
   ```bash
   npm run build
   npm start
   ```

## Project Structure

```
├── app/
│   ├── api/                 # API routes
│   ├── components/          # Reusable UI components
│   ├── dashboard/           # Dashboard pages
│   ├── register/            # Registration pages
│   └── globals.css          # Global styles
├── components/
│   ├── ui/                  # UI components (buttons, forms, etc.)
│   └── form/                # Form components
├── lib/
│   └── supabaseClient.js    # Supabase client configuration
└── public/                  # Static assets
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint for code linting

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary.

## Support

For support or questions, please contact the development team.
