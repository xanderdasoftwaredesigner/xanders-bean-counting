# xanders-bean-counting
Xanders Accounting Web application

## Description
A simple, elegant web-based accounting application for tracking income and expenses. Built with vanilla HTML, CSS, and JavaScript, this application provides an intuitive interface for managing personal or small business finances.

## Features
- **Dashboard**: View your financial summary at a glance with total income, expenses, and net balance
- **Transaction Management**: Add, view, and delete transactions with ease
- **Reports**: Generate monthly summaries to track your financial trends
- **Local Storage**: All data is stored locally in your browser for privacy and offline access
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Project Structure
```
xanders-bean-counting/
├── public/
│   └── index.html          # Main HTML entry point
├── src/
│   ├── css/
│   │   └── styles.css      # Application styles
│   └── js/
│       └── app.js          # Application logic
├── .eslintrc.json          # ESLint configuration
├── .prettierrc.json        # Prettier configuration
├── .gitignore              # Git ignore rules
├── package.json            # Project dependencies and scripts
└── README.md               # This file
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/xanderdasoftwaredesigner/xanders-bean-counting.git
   cd xanders-bean-counting
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application
Start the development server:
```bash
npm start
```

This will start a local web server and automatically open the application in your default browser at `http://localhost:8080`.

Alternatively, you can use:
```bash
npm run dev
```

### Development

#### Code Quality
Run ESLint to check for code quality issues:
```bash
npm run lint
```

Fix ESLint issues automatically:
```bash
npm run lint:fix
```

Format code with Prettier:
```bash
npm run format
```

## Usage

### Adding Transactions
1. Navigate to the "Transactions" tab
2. Fill in the transaction details:
   - Description: What the transaction is for
   - Amount: The dollar amount
   - Type: Income or Expense
   - Date: When the transaction occurred
3. Click "Add Transaction"

### Viewing Dashboard
The Dashboard provides a quick overview of your finances:
- Total Income: Sum of all income transactions
- Total Expenses: Sum of all expense transactions
- Net Balance: Income minus expenses (green if positive, red if negative)

### Generating Reports
Navigate to the "Reports" tab to view monthly summaries of your income and expenses.

## Data Storage
All transaction data is stored locally in your browser's localStorage. This means:
- Your data is private and never leaves your device
- Data persists between sessions
- Clearing your browser data will delete all transactions

## Technologies Used
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS variables and flexbox/grid
- **JavaScript (ES6+)**: Vanilla JavaScript with classes and modern features
- **LocalStorage API**: Client-side data persistence

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
MIT License - feel free to use this project for personal or commercial purposes.

## Author
Xander Terry (@xanderdasoftwaredesigner)
