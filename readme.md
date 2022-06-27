# BlogThing
A website where the owner can create blog posts through the Sanity CMS. It also has a comment section where people can comment on the different blog posts, there will be flags displayed with the users comment (assuming that the ipinfo api works as expected). It uses api keys from Sanity CMS which I've stored in Netlify env variables. So commenting might not work on your local machine.



## How To Run On Your Local Machine
- Navigate to **BlogThing/app** and run **npm install**
- To start localhost navigate to **BlogThing/app** and run **npm run dev**

### What I Learnt
___
This project I was really struggeling with figuring out how to get the input from a user in the comments section to write data to the sanity database. Eventually realized that I needed a specialized api key that had both create and write permissions. But then came the challange of figuring out how to keep this secure, since I read that you're not supposed to keep keys like these in your files, as this can enable malicious people to do malicous things. So I ultimately figured out how to store the key using a netlify enviormental variable.

#### Made With:
> 
> [**Vue.js**](https://vuejs.org/), [**Vue Router**](https://router.vuejs.org/), [**Sanity Studio**](https://www.sanity.io/), [**REST Countries**](https://restcountries.com/), [**ipinfo**](https://ipinfo.io/), [**Sanity Blocks Vue Component**](https://github.com/rdunk/sanity-blocks-vue-component)
>
