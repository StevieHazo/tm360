TM360° OFFICIAL - Logo and degree-symbol brand update

This is a flat-file update for the existing TM360 Modern Music V8 website.

Upload these three files directly to the GitHub repository root:
- TM360_OFFICIAL_logo.png
- brand-overrides.css
- site.js

Replace the existing site.js when GitHub asks.
Do not put the files in a folder.

The replacement site.js:
- keeps the fixed-header, mobile-menu and footer-year functionality;
- loads brand-overrides.css automatically;
- places the supplied logo in every header and footer brand position;
- displays the company title as TM360°;
- updates visible references from TM360 to TM360° without changing email links;
- updates browser page titles to use TM360°.

After committing, allow Vercel to deploy the commit and hard-refresh the website with Ctrl+Shift+R.
