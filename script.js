document.addEventListener("DOMContentLoaded", function () {

    
    // API endpoint for search recommendations
    
    const searchAPI = "https://financialmodelingprep.com/api/v3/search?apikey=5745e5fd4fe6639a147351b1d4ceee8b";

    // API endpoint for top gainers
    const gainersAPI = "https://financialmodelingprep.com/api/v3/stock_market/gainers?apikey=5745e5fd4fe6639a147351b1d4ceee8b";

    // Elements
    const searchBar = document.getElementById("search-bar");
    const searchResults = document.getElementById("search-results");
    const stockTableBody = document.getElementById("stock-table-body");

    // Function to fetch search recommendations
    async function fetchSearchResults(query) {
        try {
            const response = await fetch(`${searchAPI}&query=${query}&limit=7&type=company`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching search results:", error);
            return [];
        }
    }

    // Function to fetch top gainers
    async function fetchTopGainers() {
        try {
            const response = await fetch(gainersAPI);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching top gainers:", error);
            return [];
        }
    }

    // Function to update search results in the DOM
    function updateSearchResults(results) {
        searchResults.innerHTML = "";

        if (results.length > 0) {
            results.forEach((result) => {
                const resultItem = document.createElement("div");
                const link = document.createElement("a");
                link.href = `stockdetails.html?symbol=${result.symbol}`;
                link.textContent = result.name;
                resultItem.appendChild(link);
                searchResults.appendChild(resultItem);
            });
        } else {
            const noResults = document.createElement("div");
            noResults.textContent = "No results found";
            searchResults.appendChild(noResults);
        }
    }

    // Function to update stock table with top gainers
    function updateStockTable(gainers) {
        stockTableBody.innerHTML = "";

        gainers.forEach((gainer) => {
            const row = stockTableBody.insertRow();
            row.insertCell(0).textContent = gainer.symbol;
            row.insertCell(1).textContent = gainer.name;
            row.insertCell(2).textContent = gainer.price;
            row.insertCell(3).textContent = gainer.change;
        });
    }

    // Event listener for search bar input
    searchBar.addEventListener("input", async function () {
        const query = searchBar.value.trim();

        if (query.length > 0) {
            const searchResultsData = await fetchSearchResults(query);
            updateSearchResults(searchResultsData);
        } else {
            searchResults.innerHTML = "";
        }
    });

    // Initial fetch and update for top gainers
    fetchTopGainers().then((gainersData) => {
        updateStockTable(gainersData);
    });
});
