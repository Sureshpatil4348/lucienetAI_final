# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/f93ea4ff-8c55-489b-965a-a747a102739f

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/f93ea4ff-8c55-489b-965a-a747a102739f) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/f93ea4ff-8c55-489b-965a-a747a102739f) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes it is!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Live Price Data & AI Analysis Requirements

### Data Source: Alpha Vantage
- **All price data and market analysis for EURUSD, XAUUSD, BTCUSD, and ETHUSD must be fetched live from the [Alpha Vantage API](https://www.alphavantage.co/).**
- **API Key:** `BXTKALNMUIDY2O5G`
- All components, widgets, or sections displaying price or analysis must connect to Alpha Vantage and update prices live.
- Do not use hardcoded or static price data for these symbols.

### AI Analysis Methodology
- For each symbol (EURUSD, XAUUSD, BTCUSD, ETHUSD), perform AI-driven analysis using the Super Trend indicator.
- Use Super Trend signals across multiple timeframes: 5 minutes, 15 minutes, 1 hour, 4 hours, and 1 day.
- Assign weightage to each timeframe based on its trend impact (e.g., higher weight for longer timeframes).
- Calculate a final probability of the market going up or down based on the weighted trends.
- Only show the detailed AI analysis for these four symbols in the "AI-Driven Trading Interface" section.

### Implementation Note
- This requirement applies globally: **wherever price or analysis is shown, always use live data from Alpha Vantage as described above.**
- If you add new price or analysis features in the future, follow this same approach.
