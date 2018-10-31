# login to heroku
$ heroku login

# create rsa ssh keys in ~/.ssh/
#$ ssh-keygen -t rsa	# I've already created them
# add keys ("this machine is authorized to deploy an app under my name")
$ heroku keys							# list keys
$ heroku keys:add						# without argument, looks in ~/.ssh/ for id_rsa.pub or id_dsa.pub
$ heroku keys:remove tylor@mit.edu		# remove (newest?) tylor@mit.edu from list of approved keys

# create empty subdomain.herokuapp.com
$ heroku create
#	desolate-lake-6220.herokuapp.com
$ heroku create app-name
# 	app-name.herokuapp.com

# deploy application to heroku
#	$ git clone https://github.com/heroku/node-js-sample.git # "clone" repository; pull code down
#	$ cd node-js-sample
$ git push heroku master

# open app in browser
$ heroku open		# same as visiting: desolate-lake-6220.herokuapp.com

# rename app (and subdomain)
$ heroku rename new-name		# now: new-name.herokuapp.com

# run script in Heroku terminal 
$ heroku run ...
$ heroku run rake db:migrate	# `$ rake db:migrate` on heroku terminal

# logs
$ heroku logs			# first 100 lines (reverse-chronological order)
$ heroku logs -n 200	# first 200 lines (max: 1500)
$ heroku logs -t		# -t = tail

# deploy to Heroku
$ heroku create tylor-sample-app
$ rake assets:precompile
$ git add . 	# I think we need this to add sample_app/public/assets/application-4ab8e... and sample_app/public/assets/application-f1a14...
$ git commit -am "Add precompiled assets for Heroku"
$ git push heroku master
$ heroku run rake db:migrate

# push & deploy regularly
$ git push #origin master
$ git push heroku #master
$ heroku run rake db:migrate

# for existing git repository
$ heroku git:remote -a ping-tylor-express-server
