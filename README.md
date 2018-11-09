# Nodejs CRUD site
This is a simple crud app with nodejs, express, and mongodb. Lets you register, login, add, update, and delete from mongodb.

Step by step to get local files to git then from git to server:

1. Go to your github account and create a repository, give it a name. Then copy the https link that it provide. Something like https://github.com/your_username/your_repo_name.git

2. In your local machine, open git bash and change directory inside the folder containing all your files.

3. Run 'git init' to create a hidden .git folder. 
Then run 'git config --global user.email YOUR_GIT_EMAIL_ADDRESS' to store your git email credentials in your local machine. 
Then run 'git add .' (<==there's a dot here) to add all the reference to files you want to add to git in your .git folder. 
Then run 'git commit -m "first commit"' to confirm the files you want to add. 
Then run 'git remote add origin https://github.com/your_username/your_repo_name.git' (paste the link you copied here)
Last run 'git push -u origin master' to copy your files from your local machine to git (login required if you haven't)

4. Once your files are on git, to get it to your server, first ssh or login into your server terminal using putty or git bash.

5. Inside the terminal, make sure you create a user with sudo privileges so you don't have to change root files by accident.

6. Once you are logged in as a sudo user inside your home directory which shows the ~ symbol, go to your git repo and click clone or download and copy the link provided

7. Back in your server terminal, in your home directory:
Run 'git clone https://github.com/your_username/your_repo_name.git' to copy your repo to your user's home directory
Then run 'ls' to see if the git folder is there.
Then change directory into it.

8. Once inside your git folder directory
run 'npm install' to install all the dependencies set by your package.json file. (Note: nodejs must be install for npm to work)
run 'npm install nodemon' to initialize npm start and mongodb together

9. At this point, go to your server ip at port your_server_ip:80 and you should see the site is live online on the internet.

10. To keep the site running without stopping, node must run as a service background. To do this:
run ' npm install pm2 -g' to globally add this service to your server
run 'pm2 start app.js' and it will run the service in the background and the site will continuously run until you manually stop it

To make changes to your server files, this is the workflow you should do:
Git pull files from your git repo => Make changes to those files on local machine => Test on local machine => Add to local git folder (using git add .) => Commit to local git folder (using git commit -m 'commit msg') => Push to git (git push) => Then on your server inside your site folder where .git folder resides, run git pull to get the latest files from git repo => restart pm2 service and refresh your site.



