I use the Modular pattern for complete this project.

github Link: https://github.com/programming-hero-web-course1/l2-b2-assignment-5-simple-backend-mottakinrahat
Liver Server Link: https://assignment-4-mauve.vercel.app/
How to run locally:

1.  Download this and clone the repository
2.  put npm install command for install the node modules.
3.  set your .env file and give your NODE_ENV, PORT, add url link of mongoDB as DATABASE_URL and add your username and password and project name on the link.
4.  for run the server use command: npm run start:dev

_API Route_

User Route:

1. for user register POST Method => api/v1/user/register
2. for user login POST Method => api/v1/user/login
3. for user change password POST Method => api/v1/user/change-password

Song Route:

1. for song create POST Method => api/v1/songs
2. for songs retrived GET Method => api/v1/songs
3. for single song retrived GET Method => api/v1/songs/id
4. for get songs by category GET Method => api/v1/songs/category/id
5. get song lyrics by duration GET Method => api/v1/songs/id/duration
<!-- 6. get song lyrics by duration GET Method => api/v1/songs/id/duration?time=25sec -->

Album Route:

1. create album POST Method => api/v1/albums
2. get albums GET Method => api/v1/albums
3. get single album GET Method => api/v1/albums/id

Blog Route:

1. create blog POST Method => api/v1/blogs
2. get blogs GET Method => api/v1/blogs
3. get single blog GET Method => api/v1/blogs/id
4. update blog PUT Method => api/v1/blogs/id
5. delete blog DELETE Method => api/v1/blogs/id

Categories Route:

1. create category POST Method => api/v1/categories
2. get categories GET Method => api/v1/categories
3. get single category GET Method => api/v1/categories/id
4. update category PUT Method => api/v1/categories/id
5. delete category DELETE Method => api/v1/categories/id
