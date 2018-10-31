# Docker Products:
#	Docker Toolbox	# Docker Engine, Machine, Compose, Quickstart Terminal, Kitematic, VirtualBox
#	Docker Engine	# core functions to create/run Docker images/containers
#	Docker Machine	# automates container provisioning on your network or in the cloud
#	Docker Compose 	# defines multi-container applications
#	Docker Hub		# like: GitHub
#	Docker Swarm	# used to host clustering and container scheduling
#	Docker Cloud	# hosted service for building, testing, and deploying Docker images to your hosts
#	Docker Trusted Registry (DTR)
#	Docker Universal Control Plane (UCP) # helps you deploy and manage Dockerized applications on-premises, behind your firewall

# Docker Toolbox:
# 	docker 			# Docker Engine  (/usr/local/bin/docker)
#	docker-machine	# Docker Machine (/usr/local/bin/docker-machine)
#	docker-compose	# Docker Compose (/usr/local/bin/docker-compose)
#	VirtualBox 		# Oracle VM
#	Kitematic (Beta)
#	Docker Quickstart Terminal (Applications (cmd+space) > Docker Quickstart Terminal)
#					   same as: Applications (cmd+space) > Terminal > eval $(docker-machine env)
#					   same as: Applications (cmd+space) > Terminal > export DOCKER_TLS_VERIFY="1"
#																	  export DOCKER_HOST="tcp://192.168.99.100:2376"
#																	  export DOCKER_CERT_PATH="/Users/tylor/.docker/machine/machines/default"
#																	  export DOCKER_MACHINE_NAME="default"

################################
########## Dockerfile ##########
################################
# Dockerfile = text based script that contains instructions and commands for building the image from the base image
#            = when you request a build of an image, Docker reads Dockerfile, executes instructions (building from base image), and returns final image
# must be named "Dockerfile" (no extension)

FROM <username>/<imagename>:latest # sets base image

MAINTAINER <username?> # sets image's "Author" field

RUN <command> && <command> ; <command>	# execute any commands in a new layer on top of the current image and commit the results
# && = logical = next command runs, ONLY if previous command succeeds and DOES NOT return: false (exit status 0)
# ;  = command = next command runs, independent of previous comamnd

RUN apt-get -y update && apt-get install -y \
		<package1> \
		...        \
		<packageN> ; \
	<command>

CMD 		# provide defaults for an executing container.

EXPOSE 		# informs Docker that the container listens on the specified network ports at runtime. NOTE: does not actually make ports accessible.
ENV 		# sets environment variable.
ADD 		# copies new files, directories or remote file to container. Invalidates caches. Avoid ADD and use COPY instead.
COPY 		# copies new files or directories to container.
ENTRYPOINT 	# configures a container that will run as an executable.
VOLUME 		# creates a mount point for externally mounted volumes or other containers.
USER 		# sets the user name for following RUN / CMD / ENTRYPOINT commands.
WORKDIR 	# sets the working directory.
ARG 		# defines a build-time variable.
ONBUILD 	# adds a trigger instruction when the image is used as the base for another build.
STOPSIGNAL 	# sets the system call signal that will be sent to the container to exit.
LABEL 		# apply key/value metadata to your images, containers, or daemons.

########## .dockerignore ##########



###################################
########## Docker Engine ##########
###################################

########## Container ##########
# containers are instances of images
# "containers are to virtual machines what threads are to processes"
# "containers are chroots on steroids"

########## CRUD container ##########
$ docker create 	# creates a container, but does not start it
$ docker rename 	# renames a container
$ docker update 	# updates a container's resource limits
$ docker rm <containerID>	# deletes a container
$ docker rm -v $(docker ps -a -q -f status=exited) # delete stopped containers
$ docker ps -a | grep 'weeks ago' | awk '{print $1}' | xargs docker rm # delete old containers

########## start/stop containers ##########
$ docker start 		# starts a container so it is running
$ docker stop 		# stops a running container
$ docker restart 	# stops and starts a container
$ docker pause 		# pauses a running container, "freezing" it in place
$ docker unpause 	# will unpause a running container
$ docker wait 		# blocks until running container stops
$ docker kill 		# sends a SIGKILL to a running container
$ docker kill $(docker ps -q) # kill running containers
$ docker attach 	# will connect to a running container

########## docker run ##########
# checks for image locally (if not, pulls remote image), then creates/starts container (based off image)
# same as: $ docker create && docker start

$ docker run [options] <username>/<imagename> <cmd> <arg1> <arg2> ... 
	<username>
	<imagename>
	<cmd>		# container's command
	<arg#>		# arguments for command

$ docker run hello-world # short for: library/hello-world
$ docker run ubuntu		 # short for: library/ubuntu
$ docker run docker/whalesay cowsay boo
	<username>	= docker
	<imagename>	= whalesay
	<cmd>		= cowsay	# container's command
	<arg#>		= 'boo' 	# arguments for command

########## docker exec ##########
# executes a new command in running container
$ docker exec <container> <cmd>

########## info ##########
docker ps 		# shows running containers
docker ps -a 	# shows   all   containers (running and stopped)
docker logs 	# gets logs from container (You can use a custom log driver, but logs is only available for json-file and journald in 1.10)
docker inspect 	# looks at all the info on a container (including IP address)
docker events 	# gets events from container
docker port 	# shows public facing port of container
docker top 		# shows running processes in container
docker diff 	# shows changed files in the container's FS
docker history 	# shows history of image
docker tag 		# tags an image to a name (local or registry)
docker tag <imageID> <username>/<imagename>:latest
docker stats 		# shows containers' resource usage statistics
docker stats --all 	# shows a running list of containers

########## Image ##########
# "a running image is a container"
# "images are templates for docker containers"

docker images 	# shows all images
docker import 	# creates an image from a tarball
docker build 	# creates image from Dockerfile
docker commit 	# creates image from a container (pausing it temporarily if it is running)
docker rmi 		# removes an image
docker rmi $(docker images -q) # delete all images
docker rmi $(docker images -q -f dangling=true) # delete dangling images
docker-gc 		# cleans up images that are no longer used by any containers (in a safe manner)
docker load 	# loads an image from a tar archive as STDIN, including images and tags (as of 0.7)
docker save 	# saves an image to a tar archive stream to STDOUT with all parent layers, tags & versions (as of 0.7)

########## docker build ##########
# creates a local image from Dockerfile
$ docker build <path|url>
	<path|url> # folder containing Dockerfile
$ docker build -t <tag> <path|url>
	<tag> # image name




