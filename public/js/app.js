class AccountingClassifier {
    constructor() {
        this.predefinedMappings = {
            'cash': { accountType: 'Asset', category: 'Current Asset' },
            'petty cash': { accountType: 'Asset', category: 'Current Asset' },
            'bank': { accountType: 'Asset', category: 'Current Asset' },
            'checking': { accountType: 'Asset', category: 'Current Asset' },
            'savings': { accountType: 'Asset', category: 'Current Asset' },
            'accounts receivable': { accountType: 'Asset', category: 'Current Asset' },
            'ar': { accountType: 'Asset', category: 'Current Asset' },
            'supplies': { accountType: 'Asset', category: 'Current Asset' },
            'inventory': { accountType: 'Asset', category: 'Current Asset' },
            'prepaid expenses': { accountType: 'Asset', category: 'Current Asset' },
            'equipment': { accountType: 'Asset', category: 'Fixed Asset' },
            'furniture': { accountType: 'Asset', category: 'Fixed Asset' },
            'vehicles': { accountType: 'Asset', category: 'Fixed Asset' },
            'buildings': { accountType: 'Asset', category: 'Fixed Asset' },
            'land': { accountType: 'Asset', category: 'Fixed Asset' },
            
            'accounts payable': { accountType: 'Liability', category: 'Current Liability' },
            'ap': { accountType: 'Liability', category: 'Current Liability' },
            'credit card': { accountType: 'Liability', category: 'Current Liability' },
            'credit cards': { accountType: 'Liability', category: 'Current Liability' },
            'taxes payable': { accountType: 'Liability', category: 'Current Liability' },
            'accrued expenses': { accountType: 'Liability', category: 'Current Liability' },
            'notes payable': { accountType: 'Liability', category: 'Long-term Liability' },
            'loans payable': { accountType: 'Liability', category: 'Long-term Liability' },
            'loan': { accountType: 'Liability', category: 'Long-term Liability' },
            'loans': { accountType: 'Liability', category: 'Long-term Liability' },
            'unearned revenue': { accountType: 'Liability', category: 'Current Liability' },
            'deferred revenue': { accountType: 'Liability', category: 'Current Liability' },
            
            'sales revenue': { accountType: 'Owner\'s Equity', category: 'Revenue' },
            'sales': { accountType: 'Owner\'s Equity', category: 'Revenue' },
            'service revenue': { accountType: 'Owner\'s Equity', category: 'Revenue' },
            'revenue': { accountType: 'Owner\'s Equity', category: 'Revenue' },
            'interest income': { accountType: 'Owner\'s Equity', category: 'Revenue' },
            'income': { accountType: 'Owner\'s Equity', category: 'Revenue' },
            
            'owner\'s capital': { accountType: 'Owner\'s Equity', category: 'Capital' },
            'capital': { accountType: 'Owner\'s Equity', category: 'Capital' },
            'retained earnings': { accountType: 'Owner\'s Equity', category: 'Capital' },
            'common stock': { accountType: 'Owner\'s Equity', category: 'Capital' },
            'owner\'s draw': { accountType: 'Owner\'s Equity', category: 'Drawings' },
            'drawings': { accountType: 'Owner\'s Equity', category: 'Drawings' },
            
            'rent expense': { accountType: 'Owner\'s Equity', category: 'Expense' },
            'rent': { accountType: 'Owner\'s Equity', category: 'Expense' },
            'utilities': { accountType: 'Owner\'s Equity', category: 'Expense' },
            'utilities expense': { accountType: 'Owner\'s Equity', category: 'Expense' },
            'payroll': { accountType: 'Owner\'s Equity', category: 'Expense' },
            'salaries': { accountType: 'Owner\'s Equity', category: 'Expense' },
            'wages': { accountType: 'Owner\'s Equity', category: 'Expense' },
            'supplies expense': { accountType: 'Owner\'s Equity', category: 'Expense' },
            'insurance': { accountType: 'Owner\'s Equity', category: 'Expense' },
            'insurance expense': { accountType: 'Owner\'s Equity', category: 'Expense' },
            'depreciation': { accountType: 'Owner\'s Equity', category: 'Expense' },
            'advertising': { accountType: 'Owner\'s Equity', category: 'Expense' },
            'advertising expense': { accountType: 'Owner\'s Equity', category: 'Expense' },
            'office expense': { accountType: 'Owner\'s Equity', category: 'Expense' },
            'travel': { accountType: 'Owner\'s Equity', category: 'Expense' },
            'travel expense': { accountType: 'Owner\'s Equity', category: 'Expense' },
            'meals': { accountType: 'Owner\'s Equity', category: 'Expense' },
            'meals expense': { accountType: 'Owner\'s Equity', category: 'Expense' }
        };
        
        this.customMappings = this.loadCustomMappings();
    }
    
    normalize(text) {
        return text.toLowerCase().trim().replace(/\s+/g, ' ');
    }
    
    classify(classification) {
        const normalized = this.normalize(classification);
        
        if (this.customMappings[normalized]) {
            return this.customMappings[normalized];
        }
        
        if (this.predefinedMappings[normalized]) {
            return this.predefinedMappings[normalized];
        }
        
        for (const [key, value] of Object.entries(this.predefinedMappings)) {
            if (normalized.includes(key) || key.includes(normalized)) {
                return value;
            }
        }
        
        return { accountType: 'Unknown', category: 'Uncategorized' };
    }
    
    saveCustomMapping(classification, accountType, category) {
        const normalized = this.normalize(classification);
        this.customMappings[normalized] = { accountType, category };
        localStorage.setItem('customMappings', JSON.stringify(this.customMappings));
    }
    
    loadCustomMappings() {
        const stored = localStorage.getItem('customMappings');
        return stored ? JSON.parse(stored) : {};
    }
    
    getCommonClassifications() {
        return Object.keys(this.predefinedMappings).sort();
    }
}

class AccountingApp {
    constructor() {
        this.transactions = this.loadTransactions();
        this.classifier = new AccountingClassifier();
        this.currentSection = 'dashboard';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateDashboard();
        this.renderTransactions();
        this.updateReports();
        this.setTodayDate();
    }

    setupEventListeners() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionId = link.getAttribute('href').substring(1);
                this.switchSection(sectionId);
            });
        });

        const form = document.getElementById('add-transaction-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTransaction();
        });
        
        const classificationInput = document.getElementById('classification');
        if (classificationInput) {
            classificationInput.addEventListener('input', () => {
                this.updateAccountTypePreview();
            });
        }
    }

    switchSection(sectionId) {
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => section.classList.remove('active'));
        
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => link.classList.remove('active'));

        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = sectionId;
        }

        const activeLink = document.querySelector(`[href="#${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    setTodayDate() {
        const dateInput = document.getElementById('date');
        const today = new Date().toISOString().split('T')[0];
        dateInput.value = today;
    }
    
    updateAccountTypePreview() {
        const classificationInput = document.getElementById('classification');
        const preview = document.getElementById('account-type-preview');
        
        if (!classificationInput || !preview) return;
        
        const classification = classificationInput.value.trim();
        if (!classification) {
            preview.textContent = '';
            preview.style.display = 'none';
            return;
        }
        
        const result = this.classifier.classify(classification);
        if (result.accountType === 'Unknown') {
            preview.innerHTML = `<span style="color: var(--text-secondary);">Unknown classification - you'll be able to set the account type after adding</span>`;
        } else {
            preview.innerHTML = `<strong>Account Type:</strong> ${result.accountType} <span style="color: var(--text-secondary);">(${result.category})</span>`;
        }
        preview.style.display = 'block';
    }

    addTransaction() {
        const description = document.getElementById('description').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const type = document.getElementById('type').value;
        const date = document.getElementById('date').value;
        const classification = document.getElementById('classification').value.trim();

        if (!description || !amount || !date) {
            alert('Please fill in all required fields (description, amount, date)');
            return;
        }
        
        let accountType = '';
        let category = '';
        
        if (classification) {
            const result = this.classifier.classify(classification);
            accountType = result.accountType;
            category = result.category;
        }

        const transaction = {
            id: Date.now(),
            description,
            amount,
            type,
            date,
            classification: classification || '',
            accountType: accountType,
            category: category,
            timestamp: new Date().toISOString()
        };

        this.transactions.push(transaction);
        this.saveTransactions();
        this.updateDashboard();
        this.renderTransactions();
        this.updateReports();

        document.getElementById('add-transaction-form').reset();
        this.setTodayDate();
        
        const preview = document.getElementById('account-type-preview');
        if (preview) {
            preview.textContent = '';
            preview.style.display = 'none';
        }

        this.showNotification('Transaction added successfully!');
    }

    deleteTransaction(id) {
        if (confirm('Are you sure you want to delete this transaction?')) {
            this.transactions = this.transactions.filter(t => t.id !== id);
            this.saveTransactions();
            this.updateDashboard();
            this.renderTransactions();
            this.updateReports();
            this.showNotification('Transaction deleted successfully!');
        }
    }

    updateDashboard() {
        const income = this.transactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);

        const expenses = this.transactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);

        const balance = income - expenses;

        document.getElementById('total-income').textContent = this.formatCurrency(income);
        document.getElementById('total-expenses').textContent = this.formatCurrency(expenses);
        document.getElementById('net-balance').textContent = this.formatCurrency(balance);

        const balanceElement = document.getElementById('net-balance');
        balanceElement.style.color = balance >= 0 ? 'var(--success-color)' : 'var(--danger-color)';
    }

    renderTransactions() {
        const tbody = document.getElementById('transactions-body');
        tbody.innerHTML = '';

        if (this.transactions.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="7" class="empty-state">
                        No transactions yet. Add your first transaction to get started!
                    </td>
                </tr>
            `;
            return;
        }

        const sortedTransactions = [...this.transactions].sort((a, b) => 
            new Date(b.date) - new Date(a.date)
        );

        sortedTransactions.forEach(transaction => {
            const row = document.createElement('tr');
            const amountClass = transaction.type === 'income' ? 'transaction-income' : 'transaction-expense';
            const amountPrefix = transaction.type === 'income' ? '+' : '-';
            
            const classification = transaction.classification || '-';
            const accountType = transaction.accountType || '-';
            
            row.innerHTML = `
                <td>${this.formatDate(transaction.date)}</td>
                <td>${this.escapeHtml(transaction.description)}</td>
                <td><span style="text-transform: capitalize;">${transaction.type}</span></td>
                <td>${this.escapeHtml(classification)}</td>
                <td><strong>${accountType}</strong></td>
                <td class="${amountClass}">${amountPrefix}${this.formatCurrency(transaction.amount)}</td>
                <td>
                    <button class="btn btn-danger" onclick="app.deleteTransaction(${transaction.id})">
                        Delete
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    updateReports() {
        const summaryDiv = document.getElementById('monthly-summary');
        
        if (this.transactions.length === 0) {
            summaryDiv.innerHTML = '<p>No data available yet. Add some transactions to see your reports.</p>';
            return;
        }

        const monthlyData = this.getMonthlyData();
        const accountTypeData = this.getAccountTypeData();
        
        let html = '<h3>Monthly Summary</h3>';
        html += '<div style="overflow-x: auto;"><table><thead><tr><th>Month</th><th>Income</th><th>Expenses</th><th>Net</th></tr></thead><tbody>';
        
        monthlyData.forEach(month => {
            const net = month.income - month.expenses;
            const netClass = net >= 0 ? 'transaction-income' : 'transaction-expense';
            html += `
                <tr>
                    <td>${month.month}</td>
                    <td class="transaction-income">${this.formatCurrency(month.income)}</td>
                    <td class="transaction-expense">${this.formatCurrency(month.expenses)}</td>
                    <td class="${netClass}">${this.formatCurrency(net)}</td>
                </tr>
            `;
        });
        
        html += '</tbody></table></div>';
        
        html += '<h3 style="margin-top: 2rem;">By Account Type</h3>';
        html += '<div style="overflow-x: auto;"><table><thead><tr><th>Account Type</th><th>Total Amount</th><th>Transaction Count</th></tr></thead><tbody>';
        
        const sortedAccountTypes = Object.entries(accountTypeData)
            .sort((a, b) => {
                const order = { 'Asset': 1, 'Liability': 2, 'Owner\'s Equity': 3, 'Unknown': 4, '-': 5 };
                return (order[a[0]] || 99) - (order[b[0]] || 99);
            });
        
        sortedAccountTypes.forEach(([accountType, data]) => {
            const colorClass = accountType === 'Asset' ? 'transaction-income' : 
                              accountType === 'Liability' ? 'transaction-expense' : '';
            html += `
                <tr>
                    <td><strong>${accountType}</strong></td>
                    <td class="${colorClass}">${this.formatCurrency(data.total)}</td>
                    <td>${data.count}</td>
                </tr>
            `;
        });
        
        html += '</tbody></table></div>';
        summaryDiv.innerHTML = html;
    }

    getMonthlyData() {
        const monthlyMap = {};

        this.transactions.forEach(transaction => {
            const date = new Date(transaction.date);
            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            const monthName = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });

            if (!monthlyMap[monthKey]) {
                monthlyMap[monthKey] = {
                    month: monthName,
                    income: 0,
                    expenses: 0,
                    date: date
                };
            }

            if (transaction.type === 'income') {
                monthlyMap[monthKey].income += transaction.amount;
            } else {
                monthlyMap[monthKey].expenses += transaction.amount;
            }
        });

        return Object.values(monthlyMap).sort((a, b) => b.date - a.date);
    }
    
    getAccountTypeData() {
        const accountTypeMap = {};
        
        this.transactions.forEach(transaction => {
            const accountType = transaction.accountType || '-';
            
            if (!accountTypeMap[accountType]) {
                accountTypeMap[accountType] = {
                    total: 0,
                    count: 0
                };
            }
            
            accountTypeMap[accountType].total += transaction.amount;
            accountTypeMap[accountType].count += 1;
        });
        
        return accountTypeMap;
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    saveTransactions() {
        localStorage.setItem('transactions', JSON.stringify(this.transactions));
    }

    loadTransactions() {
        const stored = localStorage.getItem('transactions');
        return stored ? JSON.parse(stored) : [];
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--success-color);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 6px;
            box-shadow: var(--shadow-lg);
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

const app = new AccountingApp();
