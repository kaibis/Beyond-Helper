More documentation to come. 
Basically I was trying to print a spell book and it was driving me bonkers, so I made this.

Basically this extension scans the open **dndbeyond character sheet** for the spell class (currently *span.styles_spellName__wX3ll*). 
One the list of names is compiled, it is compared to a semi-manually created list of **spell name** + **url** pairs and transformed into two things:
+ A side panel hyperlinked list,
+ A spellbook that opens in a new tab, display all the spell details in a printable format.

To do in the future:
+ error messages when on wrong page
+ keep checking for DDB changes that break the code
+ Semi-manual spell list needs to be updated regularly
+ Do something about legacy spells.

About the **spell name** + **url** pairs.
+ I used a temporary extension feature to harvest the name and urls from the full ddb spellist.
+ I removed legacy spells at this point (it may be a bad decision, but it would have been a done more work to offer support for legacy spells).
+ I then used a py script to transform this into a nice json file.
+ The extension uses this json file when creating the links. It will break if DDB changes their URL format.


I love my AI generated, head on backwards, green duck. It feels about right when using AI to help with coding.

Shout me a coffee if I have saved you time. https://buymeacoffee.com/kaibis
