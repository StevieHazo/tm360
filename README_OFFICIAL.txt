OFFICIAL

TM360° complete corrected contrast package

Replace these three files in the repository root:
- index.html
- style.css
- homepage-prominence.css

The underlying issue was the homepage stylesheet redefining --ink as almost black. That override has been removed. Explicit accessible colours are now set for the hero, readiness card, assurance strip, dark sections, light lifecycle section, cards, navigation and footer-facing content.

Delete homepage-contrast-fix.css from the repository if it was previously uploaded. It is no longer required.
