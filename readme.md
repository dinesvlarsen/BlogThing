### Brief:

A website where the owner can create blog posts, and users can search and browse for blog posts.
It also has a comment section where people can comment on the different blog posts.

# BlogThingy

This is a blog project made as an exam piece of my front-end development studies.
- The requirements were:
  - Accessibility
  - Interactivity
  - Responsivity
  - Animations
  - Frameworks
  - API
  - Database
  
Allows you to create blog posts using Sanity as the CMS. Users can also comment on individual blog posts.
A responsive blog that allows you to create blog posts by using Sanity as the CMS, made with Vue.js, IP-API, and REST Countries API.

## Setup

To set the project up on your system you first need to install the required packages, which you can do by navigating to the app folder and running:

```
npm install
```

once the packages are installed you can launch the application on your local machine by running:

```
npm run dev
```
NB: For npm run dev to work, you always need to launch it from within the app directory.

To use Sanity you also need to have the Sanity CLI installed, which you can install with:

```
npm install -g @sanity/cli
```

Once you have the Sanity CLI installed you can navigate into the studio folder and run:

```
sanity install
```

Once the installation is done you can launch sanity with:

```
sanity start
```

Once it's launched you can navigate to http://localhost:3333 to see the Sanity dashboard.
