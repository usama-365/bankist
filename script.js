"use strict";

// App data
const account1 = {
    user: "M. Usama",
    transactions: [
      { date: "2022-10-01", amount: 905 },
      { date: "2022-10-02", amount: 165 },
      { date: "2022-10-03", amount: -5 },
      { date: "2022-10-04", amount: 15 },
      { date: "2022-10-05", amount: 945 },
      { date: "2022-10-06", amount: -60 },
      { date: "2022-10-07", amount: 245 },
      { date: "2022-10-08", amount: 690 },
      { date: "2022-10-09", amount: 105 },
      { date: "2022-10-10", amount: 835 },
      { date: "2022-10-11", amount: 460 },
      { date: "2022-10-12", amount: 500 },
      { date: "2022-10-13", amount: 645 },
    ],
    interestRate: 1.6,
    pin: 1111,
  },
  account2 = {
    user: "Hassan Asim",
    transactions: [
      { date: "2022-10-01", amount: 905 },
      { date: "2022-10-02", amount: 165 },
      { date: "2022-10-03", amount: -5 },
      { date: "2022-10-04", amount: 15 },
      { date: "2022-10-05", amount: 945 },
      { date: "2022-10-06", amount: -60 },
      { date: "2022-10-07", amount: 245 },
      { date: "2022-10-08", amount: 690 },
      { date: "2022-10-09", amount: 105 },
      { date: "2022-10-10", amount: 835 },
      { date: "2022-10-11", amount: 460 },
      { date: "2022-10-12", amount: 500 },
      { date: "2022-10-13", amount: 645 },
    ],
    interestRate: 1.3,
    pin: 2222,
  },
  account3 = {
    user: "Namir Rehman",
    transactions: [
      { date: "2022-10-01", amount: 905 },
      { date: "2022-10-02", amount: 165 },
      { date: "2022-10-03", amount: -5 },
      { date: "2022-10-04", amount: 15 },
      { date: "2022-10-05", amount: 945 },
      { date: "2022-10-06", amount: -60 },
      { date: "2022-10-07", amount: 245 },
      { date: "2022-10-08", amount: 690 },
      { date: "2022-10-09", amount: 105 },
      { date: "2022-10-10", amount: 835 },
      { date: "2022-10-11", amount: 460 },
      { date: "2022-10-12", amount: 500 },
      { date: "2022-10-13", amount: 645 },
    ],
    interestRate: 1.4,
    pin: 3333,
  },
  account4 = {
    user: "Muhammad Abdullah",
    transactions: [
      { date: "2022-10-01", amount: 905 },
      { date: "2022-10-02", amount: 165 },
      { date: "2022-10-03", amount: -5 },
      { date: "2022-10-04", amount: 15 },
      { date: "2022-10-05", amount: 945 },
      { date: "2022-10-06", amount: -60 },
      { date: "2022-10-07", amount: 245 },
      { date: "2022-10-08", amount: 690 },
      { date: "2022-10-09", amount: 105 },
      { date: "2022-10-10", amount: 835 },
      { date: "2022-10-11", amount: 460 },
      { date: "2022-10-12", amount: 500 },
      { date: "2022-10-13", amount: 645 },
    ],
    interestRate: 1.2,
    pin: 4444,
  };
const accounts = [account1, account2, account3, account4];

// DOM Elements
const // Header
  labelWelcomeMessage = document.querySelector(".welcome-msg"),
  inputUsername = document.querySelector(".user-input"),
  inputPin = document.querySelector(".pin-input"),
  btnLogin = document.querySelector(".btn--login"),
  // App
  containerApp = document.querySelector(".app"),
  // Balance
  labelBalanceAmount = document.querySelector(".balance__amount"),
  labelBalanceTime = document.querySelector(".balance__time"),
  // Transactions
  containerTransactions = document.querySelector(".transactions"),
  // Transfers
  inputTransferTo = document.querySelector(".transfer-to-input"),
  inputTransferAmount = document.querySelector(".transfer-amount-input"),
  btnTransfer = document.querySelector(".btn--transfer"),
  // Loan
  inputLoanAmount = document.querySelector(".loan-amount-input"),
  btnLoan = document.querySelector(".btn--loan"),
  // Close account
  inputConfirmUsernameClose = document.querySelector(".confirm-user-input"),
  inputConfirmPinClose = document.querySelector(".confirm-pin-input"),
  btnCloseAccount = document.querySelector(".btn--close-account"),
  // Statistics
  labelInAmount = document.querySelector(".in-amount"),
  labelOutAmount = document.querySelector(".out-amount"),
  labelInterestAmount = document.querySelector(".interest-amount"),
  btnSort = document.querySelector(".btn--sort"),
  labelRemainingLogoutTime = document.querySelector(".remaining-logout-time");

// Configuration data
const hideClass = "hidden";
const currentLocale = navigator.language;
let loggedInAccount = null;
let sorted = false;

// Removing the reloading of page on submit buttons click (all submit buttons have btn class)
document
  .querySelectorAll(".btn")
  .forEach((button) =>
    button.addEventListener("click", (event) => event.preventDefault())
  );

/**
 * Function to perform logout
 */
const logout = function () {
  containerApp.classList.add(hideClass);
  loggedInAccount = null;
};

/**
 * Function to display transactions on UI
 * @param transactions Array of transactions
 * @param sorted Whether to display in a sorted manner or not
 */
const displayTransactions = (transactions, sorted = false) => {
  // If sort is required
  if (sorted) {
    transactions = transactions.slice().sort((a, b) => a.amount - b.amount);
  }
  // Internationalization API
  const formatCurrency = currencyFormatter().format;
  const formatDate = dateFormatter().format;
  // Empty the element
  containerTransactions.innerHTML = "";
  // Add each transaction in the container
  transactions.forEach((transaction, i) => {
    // Create a new element representing a transaction
    const newTransactionElement = `
    <div class="transaction">
        <p class="transaction__type transaction__type--${
          transaction.amount < 0 ? "loss" : "profit"
        }">${i + 1} ${transaction.amount < 0 ? "withdrawl" : "deposit"}</p>
        <p class="transaction__date">${formatDate(
          new Date(transaction.date)
        )}</p>
        <p class="transaction__amount">${formatCurrency(transaction.amount)}</p>
    </div>`;
    // Add it in list of transactions
    containerTransactions.insertAdjacentHTML(
      "afterbegin",
      newTransactionElement
    );
  });
};

/**
 * Returns a NumberFormat object to format the currencies
 * @returns {Intl.NumberFormat} Formats in USD currency
 */
const currencyFormatter = function () {
  return new Intl.NumberFormat(currentLocale, {
    currency: "USD",
    style: "currency",
  });
};

/**
 * Returns a DateTimeFormat object to format the currencies
 * @param includeTime Whether to include time in date or not
 * @returns {Intl.DateTimeFormat} DateTimeFormat object to format the dates
 */
const dateFormatter = function (includeTime = false) {
  const options = {
    month: "2-digit",
    year: "numeric",
    day: "2-digit",
  };
  if (includeTime) {
    options.hour = "2-digit";
    options.minute = "2-digit";
  }
  return new Intl.DateTimeFormat(currentLocale, options);
};

/**
 * Function to display balance and statistics on UI
 * @param transactions Array of transactions
 */
const displayBalanceAndStatistics = function (transactions) {
  // Calculating statistics
  const balance = transactions.reduce(
    (sum, current) => sum + current.amount,
    0
  );
  const inAmount = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((sum, current) => sum + current.amount, 0);
  const outAmount = transactions
    .filter((transactions) => transactions.amount < 0)
    .reduce((sum, current) => sum + current.amount, 0);
  const interest = inAmount + inAmount * 0.15;
  // Internationalization API
  const formatCurrency = currencyFormatter().format;
  // Displaying statistics
  labelBalanceAmount.innerHTML = formatCurrency(balance);
  labelInAmount.innerHTML = formatCurrency(inAmount);
  labelOutAmount.innerHTML = formatCurrency(outAmount);
  labelInterestAmount.innerHTML = formatCurrency(interest);
};

/**
 * Function to update the statistics and transactions on UI
 * @param account Current logged in account
 */
const updateUI = function (account) {
  // Update the transactions, balance and statistics
  displayTransactions(account.transactions);
  displayBalanceAndStatistics(account.transactions);
  // Update the time
  labelBalanceTime.innerHTML = dateFormatter(true).format(new Date());
  // Update the label
  labelWelcomeMessage.innerHTML = `Welcome ${loggedInAccount.user}!`;
};

// Adding initials of each user as username
accounts.forEach((account) => {
  account.username = account.user
    .split(" ")
    .map((namePart) => namePart.at(0))
    .join("")
    .toLowerCase();
});

// Login functionality
btnLogin.addEventListener("click", () => {
  // Extracting username and password and authenticated
  const username = inputUsername.value;
  const pin = +inputPin.value;
  loggedInAccount = accounts.find(
    (account) => account.username === username && account.pin === pin
  );
  // If the credentials are valid
  if (loggedInAccount) {
    // Display the UI
    containerApp.classList.remove(hideClass);
    updateUI(loggedInAccount);
    // Clearing form fields
    inputUsername.value = inputPin.value = "";
  } else {
    logout();
  }
});

// Money transfer functionality
btnTransfer.addEventListener("click", () => {
  // Extracting required values
  const transferTo = inputTransferTo.value;
  const transferAmount = +inputTransferAmount.value;
  // Calculating required values
  const toAccount = accounts.find((account) => account.username === transferTo);
  const balance = loggedInAccount.transactions.reduce(
    (sum, current) => sum + current.amount,
    0
  );
  // If the transaction is valid
  if (transferAmount < balance && toAccount && toAccount !== loggedInAccount) {
    // Perform the transactions
    const date = new Date();
    toAccount.transactions.push({ amount: transferAmount, date: date });
    loggedInAccount.transactions.push({ amount: -transferAmount, date: date });
    // Update the UI and clear the fields
    updateUI(loggedInAccount);
    inputTransferTo.value = inputTransferAmount.value = "";
  }
});

// Request loan functionality
btnLoan.addEventListener("click", () => {
  // Extracting loan amount
  const loanAmount = +inputLoanAmount.value;
  // If the amount is valid
  if (loanAmount > 0) {
    // Perform the transaction and update the UI
    loggedInAccount.transactions.push({ amount: loanAmount, date: new Date() });
    updateUI(loggedInAccount);
    // Clear the form fields
    inputLoanAmount.value = "";
  }
});

// Close account functionality
btnCloseAccount.addEventListener("click", () => {
  // Extracting the values
  const username = inputConfirmUsernameClose.value;
  const pin = +inputConfirmPinClose.value;
  // Finding the account
  const i = accounts.findIndex(
    (account) => account.username === username && account.pin === pin
  );
  const accountToRemove = accounts[i];
  // Removing the account
  if (accountToRemove && accountToRemove !== loggedInAccount) {
    accounts.splice(i, 1);
    inputConfirmUsernameClose.value = inputConfirmPinClose.value = "";
  }
});

// Sort functionality
btnSort.addEventListener("click", () => {
  sorted = !sorted;
  displayTransactions(loggedInAccount.transactions, sorted);
});
