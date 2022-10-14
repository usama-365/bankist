"use strict";

// App data
const account1 = {
    user: "M. Usama",
    transactions: [
      -65, 915, 550, 420, 160, 505, 370, 890, 295, 80, 130, 905, 275, 715, 810,
    ],
    interestRate: 1.6,
    pin: 1111,
  },
  account2 = {
    user: "Hassan Asim",
    transactions: [
      905, 165, -5, 615, 945, -60, 245, 690, 105, 835, 460, 500, 645,
    ],
    interestRate: 1.3,
    pin: 2222,
  },
  account3 = {
    user: "Namir Rehman",
    transactions: [985, 820, -55, 225, 245, 350, 300, 5, 170, 770],
    interestRate: 1.4,
    pin: 3333,
  },
  account4 = {
    user: "Muhammad Abdullah",
    transactions: [325, -40, 990, 580, 865, 290],
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

// Removing the reloading of page on submit buttons click (all submit buttons have btn class)
document
  .querySelectorAll(".btn")
  .forEach((button) =>
    button.addEventListener("click", (event) => event.preventDefault())
  );

/**
 * Function to display transactions on UI
 * @param transactions Array of transactions
 */
const displayTransactions = (transactions) => {
  // Internationalization API
  const formatCurrency = currencyFormatter().format;
  // Empty the element
  containerTransactions.innerHTML = "";
  // Add each transaction in the container
  transactions.forEach((transaction, i) => {
    // Create a new element representing a transaction
    const newTransactionElement = `
    <div class="transaction">
        <p class="transaction__type transaction__type--${
          transaction < 0 ? "loss" : "profit"
        }">${i + 1} ${transaction < 0 ? "withdrawl" : "deposit"}</p>
        <p class="transaction__date">12/03/2020</p>
        <p class="transaction__amount">${formatCurrency(transaction)}</p>
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
 * Function to display balance and statistics on UI
 * @param transactions Array of transactions
 */
const displayBalanceAndStatistics = function (transactions) {
  // Calculating statistics
  const balance = transactions.reduce((sum, current) => sum + current);
  const inAmount = transactions
    .filter((transaction) => transaction > 0)
    .reduce((sum, current) => sum + current);
  const outAmount = transactions
    .filter((transactions) => transactions < 0)
    .reduce((sum, current) => sum + current);
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
  displayTransactions(account.transactions);
  displayBalanceAndStatistics(account.transactions);
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
    (sum, current) => sum + current
  );
  // If the transaction is valid
  if (transferAmount < balance && toAccount) {
    // Perform the transactions
    toAccount.transactions.push(transferAmount);
    loggedInAccount.transactions.push(-transferAmount);
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
    loggedInAccount.transactions.push(loanAmount);
    updateUI(loggedInAccount);
    // Clear the form fields
    inputLoanAmount.value = "";
  }
});
