Certainly! Below is a basic example of a Vue 3 application with three pages (Home, About, and Contact) using SSR (Server-Side Rendering). This example assumes you have a Node.js server for SSR.

1. **Install Dependencies:**

   Install the required dependencies:

   ```bash
   npm install vue vue-router express vue-server-renderer
   ```

2. **Create Project Structure:**

   Create the following project structure:

   ```
   my-ssr-app/
   ├── src/
   │   ├── components/
   │   │   ├── Home.vue
   │   │   ├── About.vue
   │   │   └── Contact.vue
   │   ├── App.vue
   │   ├── Layout.vue
   │   └── main.js
   └── server.js
   ```

3. **Code Files:**

   **Home.vue:**
   ```html
   <!-- src/components/Home.vue -->
   <template>
     <div>
       <h1>Home Page</h1>
       <p>Welcome to the home page!</p>
     </div>
   </template>
   ```

   **About.vue:**
   ```html
   <!-- src/components/About.vue -->
   <template>
     <div>
       <h1>About Page</h1>
       <p>Learn more about us.</p>
     </div>
   </template>
   ```

   **Contact.vue:**
   ```html
   <!-- src/components/Contact.vue -->
   <template>
     <div>
       <h1>Contact Page</h1>
       <p>Get in touch with us.</p>
     </div>
   </template>
   ```

   **Layout.vue:**
   ```html
   <!-- src/Layout.vue -->
   <template>
     <div>
       <nav>
         <router-link to="/">Home</router-link> |
         <router-link to="/about">About</router-link> |
         <router-link to="/contact">Contact</router-link>
       </nav>
       <router-view></router-view>
     </div>
   </template>
   ```

   **App.vue:**
   ```html
   <!-- src/App.vue -->
   <template>
     <Layout></Layout>
   </template>

   <script>
   import Layout from './Layout.vue';

   export default {
     components: {
       Layout
     }
   };
   </script>
   ```

   **main.js:**
   ```javascript
   // src/main.js
   import { createApp } from 'vue';
   import { createRouter, createWebHistory } from 'vue-router';
   import App from './App.vue';
   import Home from './components/Home.vue';
   import About from './components/About.vue';
   import Contact from './components/Contact.vue';
   import Layout from './Layout.vue';

   const router = createRouter({
     history: createWebHistory(),
     routes: [
       { path: '/', component: Home },
       { path: '/about', component: About },
       { path: '/contact', component: Contact }
     ]
   });

   const app = createApp(App);

   app.component('Layout', Layout);
   app.use(router);

   app.mount('#app');
   ```

   **server.js:**
   ```javascript
   // server.js
   const express = require('express');
   const { createSSRApp } = require('vue');
   const { renderToString } = require('@vue/server-renderer');
   const { createRouter } = require('vue-router');
   const { createMemoryHistory } = require('vue-router');

   const app = express();

   // Create an SSR app
   const ssrApp = createSSRApp(require('./src/App.vue').default);

   // Create a router for SSR
   const router = createRouter({
     history: createMemoryHistory(),
     routes: require('./src/main').routes
   });

   // Use the router in the SSR app
   ssrApp.use(router);

   // Serve static files
   app.use(express.static('dist'));

   // SSR middleware
   app.get('*', async (req, res) => {
     try {
       // Render the app to HTML
       const html = await renderToString(ssrApp);

       // Send the HTML response
       res.send(`
         <!DOCTYPE html>
         <html lang="en">
           <head>
             <meta charset="utf-8">
             <meta http-equiv="X-UA-Compatible" content="IE=edge">
             <meta name="viewport" content="width=device-width, initial-scale=1">
             <title>Vue SSR App</title>
           </head>
           <body>
             <div id="app">${html}</div>
             <script src="/path-to-your-client-bundle.js"></script>
           </body>
         </html>
       `);
     } catch (error) {
       console.error(error);
       res.status(500).send('Internal Server Error');
     }
   });

   const PORT = process.env.PORT || 3000;
   app.listen(PORT, () => {
     console.log(`Server is running at http://localhost:${PORT}`);
   });
   ```

4. **Build and Run:**

   - Run `npm run build` to build your Vue application.
   - Run `npm start` to start the server.

Now, you should be able to access your Vue SSR application at `http://localhost:3000` and navigate between the Home, About, and Contact pages. This is a basic example, and you might need to adapt it based on your specific project structure and requirements.
