class AccountingClassifier {
    constructor() {
        this.predefinedMappings = {
            'cash': { accountType: 'Asset', category: 'Current Asset', type: 'expense' },
            'petty cash': { accountType: 'Asset', category: 'Current Asset', type: 'expense' },
            'bank': { accountType: 'Asset', category: 'Current Asset', type: 'expense' },
            'checking': { accountType: 'Asset', category: 'Current Asset', type: 'expense' },
            'savings': { accountType: 'Asset', category: 'Current Asset', type: 'expense' },
            'accounts receivable': { accountType: 'Asset', category: 'Current Asset', type: 'income' },
            'ar': { accountType: 'Asset', category: 'Current Asset', type: 'income' },
            'supplies': { accountType: 'Asset', category: 'Current Asset', type: 'expense' },
            'inventory': { accountType: 'Asset', category: 'Current Asset', type: 'expense' },
            'prepaid expenses': { accountType: 'Asset', category: 'Current Asset', type: 'expense' },
            'equipment': { accountType: 'Asset', category: 'Fixed Asset', type: 'expense' },
            'furniture': { accountType: 'Asset', category: 'Fixed Asset', type: 'expense' },
            'vehicles': { accountType: 'Asset', category: 'Fixed Asset', type: 'expense' },
            'buildings': { accountType: 'Asset', category: 'Fixed Asset', type: 'expense' },
            'land': { accountType: 'Asset', category: 'Fixed Asset', type: 'expense' },
            
            'accounts payable': { accountType: 'Liability', category: 'Current Liability', type: 'expense' },
            'ap': { accountType: 'Liability', category: 'Current Liability', type: 'expense' },
            'credit card': { accountType: 'Liability', category: 'Current Liability', type: 'expense' },
            'credit cards': { accountType: 'Liability', category: 'Current Liability', type: 'expense' },
            'taxes payable': { accountType: 'Liability', category: 'Current Liability', type: 'expense' },
            'accrued expenses': { accountType: 'Liability', category: 'Current Liability', type: 'expense' },
            'notes payable': { accountType: 'Liability', category: 'Long-term Liability', type: 'expense' },
            'loans payable': { accountType: 'Liability', category: 'Long-term Liability', type: 'expense' },
            'loan': { accountType: 'Liability', category: 'Long-term Liability', type: 'expense' },
            'loans': { accountType: 'Liability', category: 'Long-term Liability', type: 'expense' },
            'unearned revenue': { accountType: 'Liability', category: 'Current Liability', type: 'income' },
            'deferred revenue': { accountType: 'Liability', category: 'Current Liability', type: 'income' },
            
            'sales revenue': { accountType: 'Owner\'s Equity', category: 'Revenue', type: 'income' },
            'sales': { accountType: 'Owner\'s Equity', category: 'Revenue', type: 'income' },
            'service revenue': { accountType: 'Owner\'s Equity', category: 'Revenue', type: 'income' },
            'revenue': { accountType: 'Owner\'s Equity', category: 'Revenue', type: 'income' },
            'interest income': { accountType: 'Owner\'s Equity', category: 'Revenue', type: 'income' },
            'income': { accountType: 'Owner\'s Equity', category: 'Revenue', type: 'income' },
            
            'owner\'s capital': { accountType: 'Owner\'s Equity', category: 'Capital', type: 'income' },
            'capital': { accountType: 'Owner\'s Equity', category: 'Capital', type: 'income' },
            'retained earnings': { accountType: 'Owner\'s Equity', category: 'Capital', type: 'income' },
            'common stock': { accountType: 'Owner\'s Equity', category: 'Capital', type: 'income' },
            'owner\'s draw': { accountType: 'Owner\'s Equity', category: 'Drawings', type: 'expense' },
            'drawings': { accountType: 'Owner\'s Equity', category: 'Drawings', type: 'expense' },
            
            'rent expense': { accountType: 'Owner\'s Equity', category: 'Expense', type: 'expense' },
            'rent': { accountType: 'Owner\'s Equity', category: 'Expense', type: 'expense' },
            'utilities': { accountType: 'Owner\'s Equity', category: 'Expense', type: 'expense' },
            'utilities expense': { accountType: 'Owner\'s Equity', category: 'Expense', type: 'expense' },
            'payroll': { accountType: 'Owner\'s Equity', category: 'Expense', type: 'expense' },
            'salaries': { accountType: 'Owner\'s Equity', category: 'Expense', type: 'expense' },
            'wages': { accountType: 'Owner\'s Equity', category: 'Expense', type: 'expense' },
            'supplies expense': { accountType: 'Owner\'s Equity', category: 'Expense', type: 'expense' },
            'insurance': { accountType: 'Owner\'s Equity', category: 'Expense', type: 'expense' },
            'insurance expense': { accountType: 'Owner\'s Equity', category: 'Expense', type: 'expense' },
            'depreciation': { accountType: 'Owner\'s Equity', category: 'Expense', type: 'expense' },
            'advertising': { accountType: 'Owner\'s Equity', category: 'Expense', type: 'expense' },
            'advertising expense': { accountType: 'Owner\'s Equity', category: 'Expense', type: 'expense' },
            'office expense': { accountType: 'Owner\'s Equity', category: 'Expense', type: 'expense' },
            'travel': { accountType: 'Owner\'s Equity', category: 'Expense', type: 'expense' },
            'travel expense': { accountType: 'Owner\'s Equity', category: 'Expense', type: 'expense' },
            'meals': { accountType: 'Owner\'s Equity', category: 'Expense', type: 'expense' },
            'meals expense': { accountType: 'Owner\'s Equity', category: 'Expense', type: 'expense' }
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
    
    saveCustomMapping(classification, accountType, category, type) {
        const normalized = this.normalize(classification);
        this.customMappings[normalized] = { accountType, category, type };
        localStorage.setItem('customMappings', JSON.stringify(this.customMappings));
    }
    
    deleteCustomMapping(classification) {
        const normalized = this.normalize(classification);
        delete this.customMappings[normalized];
        localStorage.setItem('customMappings', JSON.stringify(this.customMappings));
    }
    
    getCustomClassifications() {
        return Object.keys(this.customMappings).sort();
    }
    
    resetCustomMappings() {
        this.customMappings = {};
        localStorage.removeItem('customMappings');
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
            this.hideOverridePanel();
            return;
        }
        
        const result = this.classifier.classify(classification);
        if (result.accountType === 'Unknown') {
            preview.innerHTML = `<span style="color: var(--text-secondary);">Unknown classification - <a href="#" onclick="app.showOverridePanel(); return false;" style="color: var(--primary-color);">define it here</a></span>`;
        } else {
            const typeLabel = result.type === 'income' ? 'Income' : 'Expense';
            const typeColor = result.type === 'income' ? 'var(--success-color)' : 'var(--danger-color)';
            preview.innerHTML = `<strong>Type:</strong> <span style="color: ${typeColor};">${typeLabel}</span> | <strong>Account Type:</strong> ${result.accountType} <span style="color: var(--text-secondary);">(${result.category})</span> | <a href="#" onclick="app.showOverridePanel(); return false;" style="color: var(--primary-color); font-size: 0.9em;">Change</a>`;
        }
        preview.style.display = 'block';
    }
    
    showOverridePanel() {
        const panel = document.getElementById('override-panel');
        if (!panel) return;
        
        const classificationInput = document.getElementById('classification');
        const classification = classificationInput.value.trim();
        const result = this.classifier.classify(classification);
        
        document.getElementById('override-type').value = result.type || 'expense';
        document.getElementById('override-account-type').value = result.accountType !== 'Unknown' ? result.accountType : 'Asset';
        
        panel.style.display = 'block';
    }
    
    hideOverridePanel() {
        const panel = document.getElementById('override-panel');
        if (panel) {
            panel.style.display = 'none';
        }
    }
    
    applyOverride() {
        const classificationInput = document.getElementById('classification');
        const classification = classificationInput.value.trim();
        
        if (!classification) {
            alert('Please enter a classification first');
            return;
        }
        
        this.overrideType = document.getElementById('override-type').value;
        this.overrideAccountType = document.getElementById('override-account-type').value;
        this.overrideRemember = document.getElementById('override-remember').checked;
        
        this.updateAccountTypePreview();
        this.hideOverridePanel();
        
        const preview = document.getElementById('account-type-preview');
        const typeLabel = this.overrideType === 'income' ? 'Income' : 'Expense';
        const typeColor = this.overrideType === 'income' ? 'var(--success-color)' : 'var(--danger-color)';
        preview.innerHTML = `<strong>Type:</strong> <span style="color: ${typeColor};">${typeLabel}</span> | <strong>Account Type:</strong> ${this.overrideAccountType} <span style="color: var(--text-secondary);">(Override)</span> | <a href="#" onclick="app.showOverridePanel(); return false;" style="color: var(--primary-color); font-size: 0.9em;">Change</a>`;
    }

    addTransaction() {
        const description = document.getElementById('description').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const date = document.getElementById('date').value;
        const classification = document.getElementById('classification').value.trim();

        if (!description || !amount || !date || !classification) {
            alert('Please fill in all required fields (description, amount, date, and classification)');
            return;
        }
        
        let type, accountType, category;
        
        if (this.overrideType && this.overrideAccountType) {
            type = this.overrideType;
            accountType = this.overrideAccountType;
            category = 'Custom';
            
            if (this.overrideRemember) {
                this.classifier.saveCustomMapping(classification, accountType, category, type);
            }
            
            this.overrideType = null;
            this.overrideAccountType = null;
            this.overrideRemember = false;
        } else {
            const result = this.classifier.classify(classification);
            
            if (result.accountType === 'Unknown') {
                alert('Unknown classification. Please enter a valid classification or use the "define it here" link to set custom values.');
                return;
            }
            
            type = result.type;
            accountType = result.accountType;
            category = result.category;
        }

        const transaction = {
            id: Date.now(),
            description,
            amount,
            type,
            date,
            classification: classification,
            accountType,
            category,
            timestamp: new Date().toISOString()
        };

        this.transactions.push(transaction);
        this.saveTransactions();
        this.updateDashboard();
        this.renderTransactions();
        this.updateReports();

        document.getElementById('add-transaction-form').reset();
        this.setTodayDate();
        this.hideOverridePanel();
        
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
    
    startEditTransaction(id) {
        this.editingTransactionId = id;
        this.renderTransactions();
    }
    
    saveTransactionEdits(id) {
        const transaction = this.transactions.find(t => t.id === id);
        if (!transaction) return;
        
        const classification = document.getElementById(`edit-classification-${id}`).value.trim();
        const type = document.getElementById(`edit-type-${id}`).value;
        const accountType = document.getElementById(`edit-account-type-${id}`).value;
        const rememberMapping = document.getElementById(`edit-remember-${id}`).checked;
        const applyToAll = document.getElementById(`edit-apply-all-${id}`).checked;
        
        if (!classification) {
            alert('Classification is required');
            return;
        }
        
        const oldClassification = transaction.classification;
        
        transaction.classification = classification;
        transaction.type = type;
        transaction.accountType = accountType;
        
        if (rememberMapping) {
            const result = this.classifier.classify(classification);
            this.classifier.saveCustomMapping(classification, accountType, result.category || 'Uncategorized', type);
        }
        
        if (applyToAll && oldClassification) {
            const normalizedOld = this.classifier.normalize(oldClassification);
            this.transactions.forEach(t => {
                if (this.classifier.normalize(t.classification) === normalizedOld) {
                    t.classification = classification;
                    t.type = type;
                    t.accountType = accountType;
                }
            });
        }
        
        this.editingTransactionId = null;
        this.saveTransactions();
        this.updateDashboard();
        this.renderTransactions();
        this.updateReports();
        this.showNotification('Transaction updated successfully!');
    }
    
    cancelEdit() {
        this.editingTransactionId = null;
        this.renderTransactions();
    }
    
    resetLearnedMappings() {
        if (confirm('Are you sure you want to reset all learned mappings? This will remove all custom classifications you have taught the system.')) {
            this.classifier.resetCustomMappings();
            this.showNotification('Learned mappings have been reset!');
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
                    <td colspan="6" class="empty-state">
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
            
            if (this.editingTransactionId === transaction.id) {
                row.innerHTML = `
                    <td colspan="6" style="padding: 1rem;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                            <div>
                                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Classification</label>
                                <input type="text" id="edit-classification-${transaction.id}" value="${this.escapeHtml(transaction.classification || '')}" style="width: 100%; padding: 0.5rem; border: 1px solid var(--border-color); border-radius: 4px;">
                            </div>
                            <div>
                                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Type</label>
                                <select id="edit-type-${transaction.id}" style="width: 100%; padding: 0.5rem; border: 1px solid var(--border-color); border-radius: 4px;">
                                    <option value="income" ${transaction.type === 'income' ? 'selected' : ''}>Income</option>
                                    <option value="expense" ${transaction.type === 'expense' ? 'selected' : ''}>Expense</option>
                                </select>
                            </div>
                            <div>
                                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Account Type</label>
                                <select id="edit-account-type-${transaction.id}" style="width: 100%; padding: 0.5rem; border: 1px solid var(--border-color); border-radius: 4px;">
                                    <option value="Asset" ${transaction.accountType === 'Asset' ? 'selected' : ''}>Asset</option>
                                    <option value="Liability" ${transaction.accountType === 'Liability' ? 'selected' : ''}>Liability</option>
                                    <option value="Owner's Equity" ${transaction.accountType === "Owner's Equity" ? 'selected' : ''}>Owner's Equity</option>
                                    <option value="Unknown" ${transaction.accountType === 'Unknown' ? 'selected' : ''}>Unknown</option>
                                </select>
                            </div>
                            <div style="display: flex; flex-direction: column; gap: 0.5rem; justify-content: center;">
                                <label style="display: flex; align-items: center; gap: 0.5rem;">
                                    <input type="checkbox" id="edit-remember-${transaction.id}" checked>
                                    <span>Remember this mapping</span>
                                </label>
                                <label style="display: flex; align-items: center; gap: 0.5rem;">
                                    <input type="checkbox" id="edit-apply-all-${transaction.id}">
                                    <span>Apply to all existing "${this.escapeHtml(transaction.classification || '')}"</span>
                                </label>
                            </div>
                        </div>
                        <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
                            <button class="btn btn-primary" onclick="app.saveTransactionEdits(${transaction.id})">Save</button>
                            <button class="btn" onclick="app.cancelEdit()">Cancel</button>
                        </div>
                    </td>
                `;
            } else {
                const amountClass = transaction.type === 'income' ? 'transaction-income' : 'transaction-expense';
                const amountPrefix = transaction.type === 'income' ? '+' : '-';
                
                const classification = transaction.classification || '-';
                const accountType = transaction.accountType || '-';
                
                row.innerHTML = `
                    <td>${this.formatDate(transaction.date)}</td>
                    <td>${this.escapeHtml(transaction.description)}</td>
                    <td>${this.escapeHtml(classification)}</td>
                    <td><strong>${accountType}</strong></td>
                    <td class="${amountClass}">${amountPrefix}${this.formatCurrency(transaction.amount)}</td>
                    <td>
                        <button class="btn" onclick="app.startEditTransaction(${transaction.id})" style="margin-right: 0.5rem;">Edit</button>
                        <button class="btn btn-danger" onclick="app.deleteTransaction(${transaction.id})">Delete</button>
                    </td>
                `;
            }
            
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
