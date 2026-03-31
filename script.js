const resultsDiv = document.getElementById("results");
const cityInput = document.getElementById("city");
const searchBtn = document.getElementById("searchBtn");
const clearBtn = document.getElementById("clearBtn");

// 🔍 Fetch travel data
async function getTravelData() {
    const city = cityInput.value.trim();

    if (!city) {
        showError("Please enter a city.");
        return;
    }

    // Loading card
    const loadingCard = createCard("⏳ Fetching data...");
    resultsDiv.prepend(loadingCard);

    try {
        const res = await fetch(`/api/travel?city=${encodeURIComponent(city)}`);
        const data = await res.json();

        loadingCard.remove();

        if (data.error) {
            showError(data.error);
            return;
        }

        const riskColor = getRiskColor(data.risk);

        const newsHTML = data.news.length
            ? `<ul>${data.news.map(n => `<li><a href="${n.url}" target="_blank">${n.title}</a></li>`).join("")}</ul>`
            : `<p>No recent news available.</p>`;

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <h3>📍 ${data.city}, ${data.country}</h3>
            <p>🌡 Temperature: ${data.temperature}°C</p>
            <p>☁ Condition: ${data.condition}</p>
            <p>🌍 Population: ${data.population.toLocaleString()}</p>

            <p style="color:${riskColor}; font-weight:bold;">
                ⚠ Risk Level: ${data.risk}
            </p>

            <h4>📰 Recent News</h4>
            ${newsHTML}
        `;

        resultsDiv.prepend(card);
        cityInput.value = "";

    } catch (err) {
        loadingCard.remove();
        showError("Something went wrong.");
    }
}

// 🧹 Clear all results
function clearResults() {
    resultsDiv.innerHTML = "";
}

// ❌ Error display
function showError(message) {
    const card = createCard(`<p style="color:red;">${message}</p>`);
    resultsDiv.prepend(card);
}

// 🧱 Card helper
function createCard(content) {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = content;
    return div;
}

// 🎨 Risk color logic
function getRiskColor(risk) {
    if (risk === "High") return "red";
    if (risk === "Moderate") return "orange";
    return "green";
}

// 🎯 Event listeners
searchBtn.addEventListener("click", getTravelData);
clearBtn.addEventListener("click", clearResults);

// ⌨️ Enter key support
cityInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        getTravelData();
    }
});