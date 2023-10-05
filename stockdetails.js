document.addEventListener("DOMContentLoaded", function () {
    
    // Function to get the query parameter from the URL
    function getQueryParam(parameterName) {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        return urlParams.get(parameterName);
    }

    const stockSymbol = getQueryParam("symbol");
    console.log(stockSymbol);

    

    //graph
    const apiUrl = `https://financialmodelingprep.com/api/v3/historical-chart/4hour/${stockSymbol}?apikey=5745e5fd4fe6639a147351b1d4ceee8b`;

    // Function to fetch data from the API
    async function fetchData() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching data:", error);
            return null;
        }
    }

    // Function to create the line chart
    function createLineChart(dates, openPrices) {
        const ctx = document.getElementById('stockChart').getContext('2d');

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [{
                    label: 'Open Prices',
                    borderColor: 'rgb(75, 192, 192)',
                    data: openPrices,
                    fill: false
                }]
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: 'Stock Price Line Graph'
                },
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            displayFormats: {
                                hour: 'MMM D HH:mm'
                            }
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Date'
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Open Price'
                        }
                    }]
                }
            }
        });
    }

    // Fetch data from the API and create the line chart
    fetchData().then(data => {
        if (data) {
            // Extracting date and open prices for chart
            const dates = data.map(entry => entry.date);
            const openPrices = data.map(entry => entry.open);

            // Create the line chart
            createLineChart(dates, openPrices);
        }
    });
    const cashFlowStatementTable = document.getElementById("cashFlowStatementTable");

        // API endpoint for cash flow statement
        const cashFlowAPI = `https://financialmodelingprep.com/api/v3/cash-flow-statement/${stockSymbol}?limit=1&apikey=5745e5fd4fe6639a147351b1d4ceee8b`;

        // Function to fetch cash flow statement data
        async function fetchCashFlowData() {
            try {
                const response = await fetch(cashFlowAPI);
                const data = await response.json();
                console.log("Fetched data:", data);
                return data;
            } catch (error) {
                console.error("Error fetching cash flow data:", error);
                return null;
            }
        }

        // Function to update cash flow statement table
        function updateCashFlowStatementTable(data) {
            const tableBody = cashFlowStatementTable.querySelector("tbody");

            if (data && data.length > 0) {
                const item = data[0]; // Take the first item from the array
                for (const key in item) {
                    if (key !== "date" && key !== "symbol" && key !== "reportedCurrency" && key !== "cik" &&
                        key !== "fillingDate" && key !== "acceptedDate" && key !== "calendarYear" &&
                        key !== "period" && key !== "link" && key !== "finalLink") {
                        const row = document.createElement("tr");
                        const itemName = document.createElement("td");
                        const itemAmount = document.createElement("td");

                        itemName.textContent = key;
                        itemAmount.textContent = item[key];

                        row.appendChild(itemName);
                        row.appendChild(itemAmount);
                        tableBody.appendChild(row);
                    }
                }
            } else {
                const noResultsRow = document.createElement("tr");
                const noResultsCell = document.createElement("td");
                noResultsCell.setAttribute("colspan", "2");
                noResultsCell.textContent = "No data available.";
                noResultsRow.appendChild(noResultsCell);
                tableBody.appendChild(noResultsRow);
            }
        }

        // Fetch and update cash flow statement data
        fetchCashFlowData().then(data => {
            updateCashFlowStatementTable(data);
        });

        
        
    const incomeStatementTable = document.getElementById("incomeStatementTable");

        // API endpoint for balance sheet statement
        const balanceSheetAPI = `https://financialmodelingprep.com/api/v3/balance-sheet-statement/${stockSymbol}?limit=1&apikey=5745e5fd4fe6639a147351b1d4ceee8b`;

        // Function to fetch balance sheet statement data
        async function fetchBalanceSheetData() {
            try {
                const response = await fetch(balanceSheetAPI);
                const data = await response.json();
                console.log("Fetched data:", data);
                return data;
            } catch (error) {
                console.error("Error fetching balance sheet data:", error);
                return null;
            }
        }

        // Function to update income statement table
        function updateIncomeStatementTable(data) {
            const tableBody = incomeStatementTable.querySelector("tbody");

            if (data && data.length > 0) {
                const item = data[0]; // Take the first item from the array
                for (const key in item) {
                    if (key !== "date" && key !== "symbol" && key !== "reportedCurrency" && key !== "cik" &&
                        key !== "fillingDate" && key !== "acceptedDate" && key !== "calendarYear" &&
                        key !== "period" && key !== "link" && key !== "finalLink") {
                        const row = document.createElement("tr");
                        const itemName = document.createElement("td");
                        const itemAmount = document.createElement("td");

                        itemName.textContent = key;
                        itemAmount.textContent = item[key];

                        row.appendChild(itemName);
                        row.appendChild(itemAmount);
                        tableBody.appendChild(row);
                    }
                }
            } else {
                const noResultsRow = document.createElement("tr");
                const noResultsCell = document.createElement("td");
                noResultsCell.setAttribute("colspan", "2");
                noResultsCell.textContent = "No data available.";
                noResultsRow.appendChild(noResultsCell);
                tableBody.appendChild(noResultsRow);
            }
        }

        // Fetch and update balance sheet statement data
        fetchBalanceSheetData().then(data => {
            updateIncomeStatementTable(data);
        });
    
    const balanceSheetTable = document.getElementById("balanceSheetTable");

        // API endpoint for income statement
        const incomeStatementAPI = `https://financialmodelingprep.com/api/v3/income-statement/${stockSymbol}?limit=1&apikey=5745e5fd4fe6639a147351b1d4ceee8b`;

        // Function to fetch income statement data
        async function fetchIncomeStatementData() {
            try {
                const response = await fetch(incomeStatementAPI);
                const data = await response.json();
                console.log("Fetched data:", data);
                return data;
            } catch (error) {
                console.error("Error fetching income statement data:", error);
                return null;
            }
        }

        // Function to update balance sheet table
        function updateBalanceSheetTable(data) {
            const tableBody = balanceSheetTable.querySelector("tbody");

            if (data && data.length > 0) {
                const item = data[0]; // Take the first item from the array
                for (const key in item) {
                    if (key !== "date" && key !== "symbol" && key !== "reportedCurrency" && key !== "cik" &&
                        key !== "fillingDate" && key !== "acceptedDate" && key !== "calendarYear" &&
                        key !== "period" && key !== "link" && key !== "finalLink") {
                        const row = document.createElement("tr");
                        const itemName = document.createElement("td");
                        const itemAmount = document.createElement("td");

                        itemName.textContent = key;
                        itemAmount.textContent = item[key];

                        row.appendChild(itemName);
                        row.appendChild(itemAmount);
                        tableBody.appendChild(row);
                    }
                }
            } else {
                const noResultsRow = document.createElement("tr");
                const noResultsCell = document.createElement("td");
                noResultsCell.setAttribute("colspan", "2");
                noResultsCell.textContent = "No data available.";
                noResultsRow.appendChild(noResultsCell);
                tableBody.appendChild(noResultsRow);
            }
        }

        // Fetch and update income statement data
        fetchIncomeStatementData().then(data => {
            updateBalanceSheetTable(data);
        });
        
        

    // API endpoint for ratios
    const ratiosAPI = "https://financialmodelingprep.com/api/v3/ratios-ttm/";
    const apiKey = "5745e5fd4fe6639a147351b1d4ceee8b";

    // Element
    const ratiosSection = document.getElementById("ratios");

    // Fetch stock symbol from the query parameter

    // Function to fetch stock ratios
    async function fetchStockRatios(symbol) {
        try {
            const response = await fetch(`${ratiosAPI}${symbol}?apikey=${apiKey}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching stock ratios:", error);
            return null;
        }
    }

    function fetchCompanyName(symbol) {
        const apiUrl = `https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=5745e5fd4fe6639a147351b1d4ceee8b`;
      
        fetch(apiUrl)
          .then(response => {
            if (!response.ok) {
              throw new Error(`Failed to fetch data. Status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            // Assuming the API response is an array of companies, and we want the first one
            const companyName = data[0].companyName;
            const stockDetailsTitle = document.getElementById("stockDetailsTitle");
    if (stockDetailsTitle) {
        stockDetailsTitle.textContent += companyName;
    }
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }
      
      // Example usage:
     const sym= fetchCompanyName(stockSymbol);
     console.log(sym);
    // Update the HTML content with the stock symbol
    


    // Function to update stock details in the DOM
    function updateRatiosSection(ratios) {
        const contentContainer = ratiosSection.querySelector(".flex-column-mobile");
    
        if (ratios && ratios.length > 0) {
            const detailsHTML = `
                <ul>
                <li>PE Ratio: ${ratios[0].peRatioTTM !== undefined ? ratios[0].peRatioTTM.toFixed(1) : "N/A"}</li>
                <li>PEG Ratio: ${ratios[0].pegRatioTTM !== undefined ? ratios[0].pegRatioTTM.toFixed(1) : "N/A"}</li>
                <li>Dividend Yield: ${ratios[0].dividendYielPercentageTTM !== undefined ? (ratios[0].dividendYielPercentageTTM * 100).toFixed(1) + "%" : "N/A"}</li>
                <li>Payout Ratio: ${ratios[0].payoutRatioTTM !== undefined ? (ratios[0].payoutRatioTTM * 100).toFixed(1) + "%" : "N/A"}</li>
                <li>Current Ratio: ${ratios[0].currentRatioTTM !== undefined ? (ratios[0].currentRatioTTM * 100).toFixed(1) + "%" : "N/A"}</li>
                <li>Quick Ratio: ${ratios[0].quickRatioTTM !== undefined ? (ratios[0].quickRatioTTM * 100).toFixed(1) + "%" : "N/A"}</li>
                <li>ROA: ${ratios[0].returnOnAssetsTTM !== undefined ? (ratios[0].returnOnAssetsTTM * 100).toFixed(1) + "%" : "N/A"}</li>
                <!-- Add more details as needed -->
            </ul>
            `;
    
            contentContainer.innerHTML = detailsHTML;
        } else {
            const noResults = document.createElement("div");
            noResults.textContent = "No details found for the selected stock.";
            contentContainer.appendChild(noResults);
        }
    }
    

    // Fetch and update stock details
    fetchStockRatios(stockSymbol).then((ratiosData) => {
        updateRatiosSection(ratiosData);
    });

})