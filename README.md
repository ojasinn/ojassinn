# Ojas Inn Website

Frontend website for **Ojas Inn, Talegaon**.

Live website:
https://ojasinn.com

GitHub:
https://github.com/ojasinn/ojassinn

Hosting:
Vercel

---

# 1. Tech Stack

This is a frontend-only website.

- React
- Vite
- JavaScript / JSX
- Tailwind CSS
- Framer Motion
- Lucide React
- Vercel Analytics
- GitHub
- Vercel

There is currently no backend or database in this project.

---

# 2. Project Structure

The important structure of the project is:

    ojas/
    │
    ├── public/
    │   └── images/
    │       ├── branding/
    │       ├── gallery/
    │       ├── hero/
    │       ├── location/
    │       ├── optimized/
    │       └── rooms/
    │
    ├── src/
    │   ├── components/
    │   ├── data/
    │   ├── hooks/
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    │
    ├── .gitignore
    ├── index.html
    ├── package.json
    ├── package-lock.json
    ├── postcss.config.js
    ├── tailwind.config.js
    ├── vercel.json
    ├── vite.config.js
    │
    ├── ojas-final-qa.cjs
    ├── ojas-responsive-test.cjs
    └── optimize-media.sh

---

# 3. What Each Main Folder Does

## public/

Contains files that are served directly by the website.

The most important part is:

    public/images/

This contains the hotel's actual images and videos.

Do not put React components or JavaScript application logic here.

---

## public/images/

All website media is stored here.

Main folders:

    public/images/branding/
    public/images/gallery/
    public/images/hero/
    public/images/location/
    public/images/optimized/
    public/images/rooms/

### branding/

Logos, branding images and social/share images.

### hero/

Images used in the main hero/banner areas of the website.

### gallery/

Images used in the property's general gallery.

### location/

Images related to the property's location/approach.

### rooms/

Room-specific images and videos.

Room media is organized by room where applicable.

### optimized/

Optimized versions of media used by the website to reduce loading size.

IMPORTANT:

Do not randomly delete, rename or move media.

A filename/path can be referenced from the React source code. Changing it can break an image or video.

---

# 4. src/

This is the main application source code.

Almost all website changes happen inside:

    src/

There are three particularly important areas:

    src/components/
    src/data/
    src/hooks/

and three important root files:

    src/App.jsx
    src/main.jsx
    src/index.css

---

# 5. src/components/

This folder contains the actual visible sections of the website.

If you want to change how a section looks, behaves, or is structured, this is usually the first place to look.

Important components include sections such as:

- Navigation / header
- Hero
- Rooms
- Gallery
- Amenities
- Location
- Booking
- Calls to action
- Footer
- Other reusable UI sections

The filename normally tells you which part of the website it controls.

For example:

    GallerySection.jsx

controls the gallery section.

    AmenitiesSection.jsx

controls the amenities section.

If you want to change the visual design of a section, find the corresponding component here.

---

# 6. src/data/

This folder contains website information that is separated from the visual components.

This is one of the MOST IMPORTANT folders when updating hotel information.

For example, room information and gallery information are stored here.

Important files include:

    src/data/rooms.js
    src/data/gallery.js

### rooms.js

Controls room-related information such as:

- Room names
- Room descriptions
- Room pricing
- Occupancy information
- Room images
- Room videos
- Room-related amenities

If you need to change a room or its price, check this file first.

Do not immediately edit the room component itself.

### gallery.js

Contains the gallery media/data used by the gallery section.

If you need to add, remove or replace gallery media, check this file first.

IMPORTANT:

If you change an image/video filename, also update the corresponding reference here.

---

# 7. src/hooks/

Contains custom React hooks used for application functionality/state.

Important hooks include functionality such as:

- Booking state
- Theme/light-dark mode
- Other shared application behaviour

If you are only changing hotel text, prices or images, you normally do NOT need to touch this folder.

Do not modify hooks unless you understand what functionality they control.

---

# 8. src/App.jsx

This is the main application component.

It brings the major website sections together.

If you want to understand:

    "How is the whole website assembled?"

start with:

    src/App.jsx

You can use this file to see which major components are rendered and in what order.

Do not put large amounts of section-specific code directly into App.jsx if an existing component already handles that section.

---

# 9. src/main.jsx

This is the React entry point.

It starts the application and connects important global functionality.

It also contains the Vercel Analytics component.

If you are only changing website content/design, normally leave this file alone.

---

# 10. src/index.css

This contains global CSS and theme-related styling.

Use this file when a change affects:

- Global styles
- Global typography
- Theme behaviour
- Dark mode
- Common styling rules
- Browser-wide layout behaviour

If a problem belongs only to one section, prefer changing that section's component instead of adding a global rule.

Be careful with global CSS because a change here can affect the entire website.

---

# 11. Configuration Files

These files control the development/build environment rather than hotel content.

## package.json

Contains:

- Project name
- Dependencies
- npm scripts
- Build commands

Common commands are:

    npm run dev
    npm run build

Do not remove dependencies unless you know they are no longer used.

---

## package-lock.json

Locks the installed dependency versions.

Normally do not edit this manually.

If dependencies are changed using npm, npm updates this file automatically.

---

## vite.config.js

Vite configuration.

Controls how the React application is built/developed.

Normally leave this alone unless changing the Vite setup.

---

## tailwind.config.js

Tailwind CSS configuration.

Contains project-specific Tailwind configuration such as:

- Theme colours
- Custom values
- Dark mode configuration
- Fonts
- Other Tailwind settings

If you need to change a Tailwind theme/configuration value, this is the file to check.

---

## postcss.config.js

PostCSS configuration used by the CSS build process.

Normally leave this alone.

---

## vercel.json

Vercel deployment configuration.

If Vercel routing/deployment behaviour needs to be changed, check this file.

Do not modify it unnecessarily.

---

## index.html

The main HTML entry document.

Contains things such as:

- HTML metadata
- Page-level configuration
- Favicon/reference information
- Important static references

If you need to change SEO/title/meta information, check this file first.

---

# 12. Utility / Testing Files

These files are not the main website application.

## ojas-final-qa.cjs

Quality-assurance/testing script for checking the website.

Use it when performing project QA if required.

Do not modify it just to make a website change.

---

## ojas-responsive-test.cjs

Used for responsive/mobile testing.

Useful when checking whether the website works correctly across different screen sizes.

---

## optimize-media.sh

Utility script related to media optimization.

Do not run or modify it casually.

Before using it, understand what files it will modify.

---

# 13. Where Do I Go If I Want To...?

## Change room price

Start here:

    src/data/rooms.js

---

## Change room name/description

Start here:

    src/data/rooms.js

---

## Change room images/videos

Start here:

    src/data/rooms.js

Then verify the actual files inside:

    public/images/rooms/

---

## Change gallery images/videos

Start here:

    src/data/gallery.js

Then check:

    public/images/gallery/

---

## Change the main hero section

Start here:

    src/components/

Find the Hero component.

Then check the corresponding image inside:

    public/images/hero/

---

## Change amenities

Start here:

    src/components/AmenitiesSection.jsx

If the amenity information is coming from data, also check:

    src/data/

---

## Change gallery layout/design

Start here:

    src/components/GallerySection.jsx

Gallery media itself is handled through the gallery data/media files.

---

## Change website colours/theme

Check:

    src/index.css
    tailwind.config.js

---

## Change dark mode

Check:

    src/hooks/useTheme.js

and:

    src/index.css

Do not change dark-mode code unless necessary because it can affect the entire website.

---

## Change navigation/header

Find the navigation/header component inside:

    src/components/

---

## Change footer

Find the footer component inside:

    src/components/

---

## Change overall page order

Check:

    src/App.jsx

---

## Change images

Images are inside:

    public/images/

First find where the image is referenced in:

    src/

Then change the media file/reference carefully.

---

# 14. How the Website Works

The basic flow is:

    index.html
         ↓
    src/main.jsx
         ↓
    src/App.jsx
         ↓
    src/components/
         ↓
    src/data/
         ↓
    public/images/
         ↓
    Browser
         ↓
    ojasinn.com

In simple terms:

- `main.jsx` starts the application.
- `App.jsx` assembles the website.
- `components/` contains the visible sections.
- `data/` contains structured hotel information.
- `public/images/` contains the actual media.
- `index.css` and Tailwind control styling.
- Vercel builds and hosts the finished website.

---

# 15. How to Start the Project After 1 Year

If you return to this project after a long time, do NOT start by editing files.

First:

    git pull

Then:

    npm install

Then:

    npm run dev

Open the local URL shown by Vite.

Look at the website first.

Then identify which section you want to change using the map in this README.

---

# 16. Safe Change Process

For every change:

    1. Pull the latest code.
    2. Find the relevant component/data file.
    3. Make the smallest required change.
    4. Run the website locally.
    5. Check desktop.
    6. Check mobile.
    7. Run the production build.
    8. Commit the change.
    9. Push the change.
    10. Check the live website.

Production build:

    npm run build

If the build fails, do not deploy until the error is fixed.

---

# 17. Git / Publishing

The project belongs to the Ojas Inn GitHub repository:

    https://github.com/ojasinn/ojassinn

Check current changes:

    git status

Review changes:

    git diff

Commit changes:

    git add .
    git commit -m "Describe the change"

Push:

    git push

The GitHub repository is connected to Vercel.

After a successful push, Vercel can create a new deployment.

Check:

    https://ojasinn.com

---

# 18. If You Download the Project on a New Computer

Install:

- Node.js
- Git

Then:

    git clone https://github.com/ojasinn/ojassinn.git
    cd ojassinn
    npm install
    npm run dev

The project does not require the old computer.

The GitHub repository is the source of truth for the project.

---

# 19. Very Important: Do Not Delete Things Blindly

Before deleting any:

- Image
- Video
- Component
- Data file
- Hook
- Configuration file

search the project to see whether it is being used.

Especially do not blindly delete files from:

    public/images/

because an image/video can be referenced from a component or data file.

If unsure, keep the file.

---

# 20. Important Files At A Glance

    src/App.jsx
    → Main website assembly / page structure

    src/main.jsx
    → React entry point + global application setup + Analytics

    src/index.css
    → Global CSS + theme/dark-mode styling

    src/components/
    → Visible website sections and UI

    src/data/rooms.js
    → Room information, pricing and room media references

    src/data/gallery.js
    → Gallery information and media references

    src/hooks/
    → Shared application state/behaviour

    public/images/
    → Actual website images and videos

    index.html
    → Main HTML document and page metadata

    package.json
    → Dependencies and npm commands

    tailwind.config.js
    → Tailwind/theme configuration

    vite.config.js
    → Vite configuration

    vercel.json
    → Vercel configuration

---

# 21. Quick Reference

Need to change a...

    Room price
    → src/data/rooms.js

    Room description
    → src/data/rooms.js

    Room image/video
    → src/data/rooms.js
    → public/images/rooms/

    Gallery media
    → src/data/gallery.js
    → public/images/gallery/

    Hero design
    → src/components/ (Hero component)
    → public/images/hero/

    Amenities section
    → src/components/AmenitiesSection.jsx

    Gallery section
    → src/components/GallerySection.jsx

    Website-wide styling
    → src/index.css

    Theme/dark mode
    → src/hooks/ + src/index.css

    Overall website structure
    → src/App.jsx

    Dependencies
    → package.json

    Vercel configuration
    → vercel.json

---

# 22. Essential Commands

Get latest project:

    git pull

Install dependencies:

    npm install

Start development:

    npm run dev

Build production version:

    npm run build

Check Git changes:

    git status

Review changes:

    git diff

Publish changes:

    git add .
    git commit -m "Update website"
    git push

---

# 23. Final Rule

When returning to this project in the future:

**Do not guess which file controls something.**

Use this README to identify the correct area, then inspect the actual code before changing it.

Keep existing working images, videos, components and configuration unless there is a verified reason to change or remove them.

The GitHub repository is the main source of the current project:

https://github.com/ojasinn/ojassinn

The live website is:

https://ojasinn.com
