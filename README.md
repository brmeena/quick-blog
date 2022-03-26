# quick-blog
It is simple and quick blog which can be easily hosted with basic admin portal. Check Blog Demo at https://quick-blog-demo.herokuapp.com/   Development efforts thanks to https://hinkhoj.com

Keep below things ready:
   a. MongoDB ( you will need MongoDB connection uri)
   b. S3 Bucket and S3 access credentials for uploading Images in blog. Make sure to give public read access in S3 bucket.
   
Steps to configure your blog

1) Blog Website:  go to blogapp folder. copy .env-default to .env file. [Default Port: 4000]
   issue command : npm install
                   npm start
                   url on localhost will be http://localhost:4000
2). Blog Admin : go to blogadmin folder. copy .env-default to .env file [Default Port: 5001]
   issue command : npm install
                   npm start
                   url on localhost will be http://localhost:5001
3) create Admin password: Visit page http://localhost:5001/install . Set your admin password in .env file before running install. 
