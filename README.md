# Invoice Platform

A full-stack invoice platform designed to simplify and enhance the billing experience. It includes features such as email notifications with beautiful templates, custom PDF generation, and an intuitive dashboard with real-time charts.

## Tech Stack

-   **Next.js** 15: A React framework for building server-rendered or static web applications.
-   **Mailtrap:** For email testing and delivery simulation in development.
-   **Neon Postgres:** A cloud-based PostgreSQL database for fast, reliable data storage.
-   **Prisma:** An ORM to interact with the database efficiently and with type safety.
-   **Tailwind CSS:** A utility-first CSS framework for styling.
-   **Auth.js:** Authentication library to handle user login, signup, and sessions.
-   **Shadcn/UI:** A modern UI library for building beautiful and consistent interfaces.

## Features

-   **Full-Stack Solution:** End-to-end functionality for creating and managing invoices..
-   **Email Notifications:** Send emails with beautiful, customizable templates powered by Mailtrap.
-   **Custom PDF Generation:** Generate professional-grade invoices in PDF format tailored to your needs.
-   **Send Invoices to Clients:** Easily share invoices via email with one click.
-   **Reminder Emails:** Automated email reminders to clients for overdue invoices.
-   **Beautiful Dashboard:** An interactive dashboard featuring animated charts for real-time data visualization.
-   **Modern Styling:** Clean and responsive UI built with Tailwind CSS and Shadcn UI.

## Installation

1. Clone the repository:

```bash
    git clone https://github.com/vadimghedreutan/QuickInvoice.git
```

2. Install the dependencies:

```bash
    cd quickinvoice
    pnpm install
```

3. Set up environment variables:
   Create a .env file in the root directory and add your configurations:

```bash
AUTH_SECRET="" # Added by `npx auth`. Read more: https://cli.authjs.dev

EMAIL_SERVER_USER=
EMAIL_SERVER_PASSWORD=
EMAIL_SERVER_HOST=live.smtp.mailtrap.io
EMAIL_SERVER_PORT=587
EMAIL_FROM=hello@demomailtrap.com

DATABASE_URL=""
```

4. Run database migrations:

```bash
pnpm dlx prisma init
pnpm dlx prisma db push
```

5. Start the development server:

```bash
pnpm dev
#or
npm run dev
# or
yarn dev
```

The site will be available at http://localhost:3000.

## Deployment

The easiest way to deploy this project is to use Vercel and connect it to your GitHub repository. Alternatively, you can build the project with `pnpm build` and deploy the contents of the out directory to your desired hosting platform.
