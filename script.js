"use strict";

// App data
const account1 = {
        user: 'Usama',
        transactions: [-65, 915, 550, 420, 160, 505, 370, 890, 295, 80, 130, 905, 275, 715, 810],
        interestRate: 1.6,
        pin: 1111
    },
    account2 = {
        user: 'Hassan',
        transactions: [905, 165, -5, 615, 945, -60, 245, 690, 105, 835, 460, 500, 645],
        interestRate: 1.3,
        pin: 2222
    },
    account3 = {
        user: 'Ikram',
        transactions: [985, 820, -55, 225, 245, 350, 300, 5, 170, 770],
        interestRate: 1.4,
        pin: 3333
    };

// DOM Elements
const
    // Header
    welcomeMessageElm = document.querySelector('.welcome-msg'),
    usernameInputElm = document.querySelector('.user-input'),
    pinInputElm = document.querySelector('.pin-input'),
    btnLoginElm = document.querySelector('.btn--login'),
    // Balance
    balanceAmountElm = document.querySelector('.balance__amount'),
    balanceDateElm = document.querySelector('.balance__time'),
    // Transactions
    transactionsElm = document.querySelector('.transactions'),
    // Transfers
    transferToInputElm = document.querySelector('.transfer-to-input'),
    transferAmountInputElm = document.querySelector('.transfer-amount-input'),
    btnTransferElm = document.querySelector('.btn--transfer'),
    // Loan
    loanAmountInputElm = document.querySelector('.loan-amount-input'),
    btnLoanElm = document.querySelector('.btn--loan'),
    // Close account
    closeAccUsernameInputElm = document.querySelector('.confirm-user-input'),
    closeAccPasswordInputElm = document.querySelector('.confirm-pin-input'),
    btnCloseAccElm = document.querySelector('.btn--close-account'),
    // Statistics
    inAmountElm = document.querySelector('.in-amount'),
    outAmountElm = document.querySelector('.out-amount'),
    interestAmountElm = document.querySelector('.interest-amount'),
    btnSortElm = document.querySelector('.btn--sort'),
    remainingTimeElm = document.querySelector('.remaining-logout-time');