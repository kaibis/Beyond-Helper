// Retrieve the stored spell list from local storage
const storedSpells = JSON.parse(localStorage.getItem('spellList'));
const fullSpellList = document.getElementById('fullSpellList');

if (storedSpells && storedSpells.length > 0) {
    // Create a function to fetch the detail content from the spell's URL
    const fetchSpellDetail = async (spell) => {
        try {
            const response = await fetch(spell.url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const text = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');
            
            // Extract the detail-content div
            const detailContent = doc.querySelector('.detail-content');
            if (detailContent) {
                // Create a container for the spell
                const spellContainer = document.createElement('div');
                spellContainer.classList.add('spell-container');
                
                // Create a heading for the spell name
                const spellTitle = document.createElement('h3');
                spellTitle.textContent = spell.name; // Display the spell name

                // Append the title and the fetched detail content to the spell container
                spellContainer.appendChild(spellTitle);
                spellContainer.appendChild(detailContent.cloneNode(true)); // Clone the node to append

                // Append the spell container to the full spell list
                fullSpellList.appendChild(spellContainer);
            } else {
                fullSpellList.innerHTML += `<div>No detail content found for ${spell.name}.</div>`;
            }
        } catch (error) {
            console.error('Error fetching spell details:', error);
            fullSpellList.innerHTML += `<div>Error fetching details for ${spell.name}.</div>`;
        }
    };

    // Fetch details for each spell
    storedSpells.forEach(spell => {
        fetchSpellDetail(spell);
    });
} else {
    fullSpellList.innerHTML = '<div>No spells found.</div>';
}
