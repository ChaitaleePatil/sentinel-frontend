##sentinel-frontend

## System Requirements

Before running the project, make sure you have the following installed:

- **Node.js** (version 18.x or later)
- **npm** (usually comes with Node.js)
- A code editor like **Visual Studio Code**


## Installation and Setup

1. **Extract the zip file** to a folder on your computer
2. **Open a terminal/command prompt** and navigate to the project folder:

```plaintext
cd path/to/extracted/folder
```


3. **Install dependencies**:

```plaintext
npm install
```


4. **Start the development server**:

```plaintext
npm run dev
```


5. **Open your browser** and go to:

```plaintext
http://localhost:3000
```




## Project Structure Overview

Here's a breakdown of the main files and what they contain:

```plaintext
app/
├── page.tsx                  # Landing page
├── login/
│   └── page.tsx              # Login page
├── signup/
│   └── page.tsx              # Signup page with multi-step form
├── dashboard/
│   ├── customer/
│   │   └── page.tsx          # Customer dashboard
│   └── shopkeeper/
│       └── page.tsx          # Shopkeeper dashboard
components/                   # Reusable UI components (shadcn/ui)
public/                       # Static assets
tailwind.config.js            # Tailwind CSS configuration
```

## What Each File Contains

### Landing Page (`app/page.tsx`)

- Hero section with headline and CTA
- How It Works section with 3-step process
- Benefits section for customers and shopkeepers
- Testimonials section
- FAQ accordion
- Final CTA section
- Navigation and footer


### Signup Page (`app/signup/page.tsx`)

- Multi-step form with role selection
- Different fields for customers vs shopkeepers
- Social login options
- Terms and conditions checkbox


### Login Page (`app/login/page.tsx`)

- Email and password fields
- Remember me checkbox
- Social login options
- Password visibility toggle


### Customer Dashboard (`app/dashboard/customer/page.tsx`)

- Sidebar navigation
- Quick stats cards
- Document upload area
- Document history with grid/list view
- Nearby print shops section


### Shopkeeper Dashboard (`app/dashboard/shopkeeper/page.tsx`)

- Print queue management
- Performance charts
- Activity log
- Job status management


## How to Make Changes

### Modifying the Landing Page

To change content on the landing page:

1. Open `app/page.tsx`
2. Edit the text within the JSX elements
3. To change images, replace the placeholder URLs with your own image paths
4. Save the file and the browser will automatically refresh


### Customizing Colors

To change the color scheme:

1. Open `tailwind.config.js`
2. Modify the colors in the theme section
3. The primary color is used for buttons and accents throughout the site
