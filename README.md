<div align="center">
  <h1>🚀 Riyan Sugiarto - Personal Portfolio v2.0</h1>
  <p>A modern, interactive, and fully responsive web portfolio built with Gatsby, React, and Styled Components.</p>
</div>

<br />

## 🌟 Key Features

- **Sleek Glassmorphism Design:** A highly modern, frosted-glass aesthetic combined with colorful, dynamic background blobs.
- **Internationalization (i18n):** Full multi-language support (English, Bahasa Indonesia, and Japanese) with seamless switching.
- **Automated CI/CD Pipeline:** Fully automated deployments to a DigitalOcean Droplet via GitHub Actions.
- **Responsive Architecture:** Perfectly tailored layouts for seamless viewing across desktop, tablet, and mobile devices.
- **Performant & Fast:** Powered by Gatsby's static site generation for lightning-fast page loads.

## 🛠️ Built With

- **Core Framework:** [Gatsby](https://www.gatsbyjs.com/) v4 & [React](https://reactjs.org/)
- **Styling:** [Styled Components](https://styled-components.com/)
- **Localization:** `gatsby-plugin-react-i18next`
- **Animation:** `scrollreveal` & Custom CSS Keyframes
- **Infrastructure:** DigitalOcean (Nginx), GitHub Actions, PM2

## 🚀 Getting Started (Local Development)

Follow these steps to run the portfolio on your local machine.

### Prerequisites

- Node.js (v18 or higher recommended)
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/0xriyans/portfolio-v2.0.git
   cd portfolio-v2.0
   ```

2. **Install dependencies**

   ```bash
   npm install --legacy-peer-deps
   ```

3. **Start the development server**

   ```bash
   npm run develop
   ```

4. **View in browser**
   Open `http://localhost:8000` to see your site. You can also view the GraphQL explorer at `http://localhost:8000/___graphql`.

## 🚢 Deployment

This project uses **GitHub Actions** for CI/CD. Every time code is pushed to the `master` branch, the `.github/workflows/deploy.yml` script automatically connects to the production server via SSH, pulls the latest code, and rebuilds the Gatsby site.

## 💡 Acknowledgements

The original base architecture of this template was inspired by the incredible work of [Brittany Chiang](https://github.com/bchiang7). It has since been heavily modified and redesigned to fit personal branding and specific functional requirements.
