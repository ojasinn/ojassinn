# Ojas Inn Website

Official website for Ojas Inn, Talegaon.

Live Website: https://ojasinn.com
GitHub Repository: https://github.com/ojasinn/ojassinn
Hosting: Vercel

## Download / Setup

Clone the project:

    git clone https://github.com/ojasinn/ojassinn.git
    cd ojassinn

Install dependencies:

    npm install

Start locally:

    npm run dev

Then open the local URL shown in the terminal.

## Where to Make Changes

Most changes will be in these locations:

    src/components/    Website sections and UI
    src/data/          Room and gallery information
    src/index.css      Global styling
    src/App.jsx        Main application
    public/images/     Images and videos

### Text / Content

Search the `src/` folder for the text you want to change and edit the relevant component or data file.

### Rooms / Prices

Check the files inside:

    src/data/

before changing room names, prices, descriptions, capacity, images, or videos.

### Images / Videos

Media is stored inside:

    public/images/

Do NOT rename or delete existing images/videos unless you have first checked where they are used in the source code.

## Before Publishing Changes

Run:

    npm run build

The build must finish successfully.

Then test locally:

    npm run dev

Check the website on both desktop and mobile.

## Publish Changes

After testing:

    git status
    git add .
    git commit -m "Describe the changes"
    git push

The repository is:

    https://github.com/ojasinn/ojassinn

The website is connected to Vercel, so pushed changes will be deployed through the connected Vercel project.

Check the live website after deployment:

    https://ojasinn.com

## Returning to the Project Later

If you have not worked on the project for a long time, ALWAYS get the latest version first:

    git pull
    npm install

Then start the project:

    npm run dev

Do not make changes to an old local copy before running `git pull`.

## If Something Goes Wrong

If the website does not build:

    npm run build

Read the error shown in the terminal.

If an image or video disappears:

1. Check that the file still exists in `public/images/`.
2. Check that its filename has not changed.
3. Check that its path in the source code is correct.

If you are unsure about a file, do not delete it.

## Important

Do not delete or rename existing project files, images, or videos unless you have verified that they are not being used.

Keep Git commits so previous working versions can be recovered if necessary.

## Quick Commands

Start development:

    npm run dev

Build:

    npm run build

Get latest version:

    git pull

Publish changes:

    git add .
    git commit -m "Update website"
    git push
