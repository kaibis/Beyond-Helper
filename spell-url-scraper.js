// Function to retrieve spells from the active tab
const retrieveSpells = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript(
            {
                target: { tabId: tabs[0].id },
                function: () => {
                    const spellElements = document.querySelectorAll("span.name a"); // Select <a> inside span.name
                    return Array.from(spellElements).map((el) => {
                        const spellSpan = el.parentElement; // Get the parent <span.name>
                        
                        // Check for legacy badge or href
                        if (spellSpan.querySelector('.badge #legacy-badge') || el.getAttribute("href") === "/legacy") {
                            return null; // Skip this spell if it has a legacy badge or href = /legacy
                        }

                        const name = el.textContent.trim().replace(/\*+$/, ""); // Get cleaned text content
                        const href = el.getAttribute("href"); // Get the href value
                        const fullUrl = `https://www.dndbeyond.com${href}`; // Prepend the base URL
                        
                        return { name, href: fullUrl }; // Return as an object
                    }).filter(Boolean); // Remove null entries
                },
            },
            (results) => {
                const spells = results[0].result;
                const spellList = document.getElementById("spellList");


                // Optional: Log JSON to console for debugging
                const jsonOutput = JSON.stringify(spells);
                console.log(jsonOutput); // Log the JSON output

                // Populate the list with spell names
                spells.forEach(({ name, href }) => {
                    if (name) {
                        const listItem = document.createElement("li");
                        listItem.textContent = `${name}|${href}`; // Display spell name and URL
                        spellList.appendChild(listItem);
                    }
                });
            }
        );
    });
};

// Event listener for the refresh button
document.getElementById("refreshButton").addEventListener("click", () => {
    const spellList = document.getElementById("spellList");
    spellList.innerHTML = ""; // Clear the list
});

// Event listener for the scan button
document.getElementById("scanButton").addEventListener("click", retrieveSpells);
