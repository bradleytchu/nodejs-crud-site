# adspace
This is a simple crud app with nodejs, express, and mongodb. Lets you register, login, add, update, and delete from mongodb.

Step by step to get local files to git then from git to server:

1. Go to your github account and create a repository, give it a name. Then copy the https link that it provide. Something like https://github.com/your_username/your_repo_name.git
2. In your local machine, open git bash and change directory inside the folder containing all your files.
3. 
Run 'git init' to create a hidden .git folder. 
Then run 'git config --global user.email YOUR_GIT_EMAIL_ADDRESS' to store your git email credentials in your local machine. 
Then run 'git add .' (<==there's a dot here) to add all the reference to files you want to add to git in your .git folder. 
Then run 'git commit -m "first commit"' to confirm the files you want to add. 
Then run 'git remote add origin https://github.com/your_username/your_repo_name.git' (paste the link you copied here)
Last run 'git push -u origin master' to copy your files from your local machine to git (login required if you haven't)

4. Once your files are on git, to get it to your server, first ssh or login into your server terminal using putty or git bash.
5. Inside the terminal, make sure you create a user with sudo privileges so you don't have to change root files by accident.
6. Once you are logged in as a user inside your home directory which is this ~ symbol, go to your git repo and click clone or download and copy the link provided
Run '

