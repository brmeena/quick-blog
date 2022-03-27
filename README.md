# quick-blog
It is simple and quick blog which can be easily hosted with basic admin portal. If you are looking for Blog Framework on MERN (MongoDB, Express, React, Node.js) stack, this is best framework for you. Very very lightweight and have all basic features of blogging.
Features of framework:
1. API on Node.js 
2. Webapp using Express and Edge Template engine. Highly scalable.
3. MongoDB as database for blog posts.
4. Blog admin in React.
5. Authentication available with Admin and Editor roles.
6. Caching enabled at post level.


Check Blog Demo at https://quick-blog-demo.herokuapp.com/ 
Admin Panel can be accessed at https://quick-blog-admin.herokuapp.com 
Credentials for Admin Panel:
  Login: demo
  Password: demo123
  
Development efforts thanks to https://hinkhoj.com

Keep below things ready:
   a. MongoDB ( you will need MongoDB connection uri)
   b. S3 Bucket and S3 access credentials for uploading Images in blog. Make sure to give public read access in S3 bucket.
   
Steps to configure your blog

1) Blog Website:  go to blogapp folder. copy .env-default to .env file. [Default Port: 4000]
   issue command : npm install
                   npm start
                   url on localhost will be localhost:4000
2). Blog Admin : go to blogadmin folder. copy .env-default to .env file [Default Port: 5001]
   issue command : npm install
                   npm start
                   url on localhost will be localhost:5001
3) create Admin password: Visit page localhost:5001/install . Set your admin password in .env file before running install. 
