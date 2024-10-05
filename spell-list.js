chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript(
        {
            target: { tabId: tabs[0].id },
            function: () => {
                const spellElements = document.querySelectorAll("span.styles_spellName__wX3ll");
                return Array.from(spellElements).map((el) => el.textContent);
            },
        },
        (results) => {
            const spellNames = results[0].result;
            const spellList = document.getElementById("spellList");
            const uniqueSpells = []; // Array to store unique spells with their URLs

            // Fetch the JSON file with spells
            fetch('spell-urls.json')  // Update with the correct path to your JSON file
                .then(response => response.json())
                .then(spellData => {
                    const spellMap = new Map(spellData.map(spell => [spell.spell.toLowerCase(), spell.url])); // Create a map for quick lookup

                    // Reset
                    spellList.innerHTML = ""; // Clear list

                    // Populate the array with spell names and URLs, checking for duplicates and existence in JSON
                    spellNames.forEach((spellName) => {
                        if (spellName.trim()) {
                            const cleanedSpellName = spellName.trim().replace(/\*+$/, "").toLowerCase(); // Clean and lowercase

                            // Check if the spell exists in the JSON data
                            if (spellMap.has(cleanedSpellName) && !uniqueSpells.some(spell => spell.name === cleanedSpellName)) {
                                const spellUrl = spellMap.get(cleanedSpellName); // Get URL from the map
                                uniqueSpells.push({ name: cleanedSpellName, url: spellUrl }); // Add spell to the array
                            }
                        }
                    });

                    // Sort the unique spells alphabetically by name
                    uniqueSpells.sort((a, b) => a.name.localeCompare(b.name));

                    // Create list items for each spell in alphabetical order
                    uniqueSpells.forEach(spell => {
                        const listItem = document.createElement("li");

                        // Create a link element
                        const link = document.createElement("a");
                        link.href = spell.url; // Set URL
                        link.target = "_blank"; // Open in new tab
                        link.textContent = spell.name; // Display the spell name

                        // Append the link to the list item and then to the spell list
                        listItem.appendChild(link);
                        spellList.appendChild(listItem);
                    });

                    // Store unique spells in local storage
                    localStorage.setItem('spellList', JSON.stringify(uniqueSpells));
                })
                .catch(error => console.error("Error fetching spell data:", error));
        }
    );
});
