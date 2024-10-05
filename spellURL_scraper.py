import os
import json

def convert_txt_to_json(txt_file):
    if not os.path.exists(txt_file):
        print(f"File not found: {txt_file}")
        return

    spells_list = []

    # Read the raw spells from the text file
    with open(txt_file, 'r') as file:
        for line in file:
            # Split the line into spell name and URL
            spell_name, url = line.strip().split('|')
            spell_entry = {
                "spell": spell_name,
                "url": url
            }
            spells_list.append(spell_entry)
            
            # Display the full URL in the console
            print(f"Spell: {spell_name} | URL: {url}")

    # Define the JSON file name
    json_file = txt_file.replace('.txt', '.json')

    # Write the list to a JSON file
    with open(json_file, 'w') as file:
        json.dump(spells_list, file, indent=4)

    print(f"Converted {txt_file} to {json_file}")

# Print the current working directory for debugging
print("Current Working Directory:", os.getcwd())

# Specify the correct name of your input text file
convert_txt_to_json(r'C:\Users\cass\Desktop\Github Repos\Hello World Chrome Extension\raw-spell-urls.txt')
