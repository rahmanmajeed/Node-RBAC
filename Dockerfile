# docker image for node application
FROM node:latest

#LABEL 
LABEL node_acl="node-access-control"
# Create app directory
RUN mkdir -p /usr/src/app
# store application into app directory 
WORKDIR /usr/src/app

# COPY project dependency
COPY package*.json /usr/src/app/

# install packages...
# RUN npm install
# RUN npm install -g yarn
RUN yarn install
# If you are building your code for production
# RUN npm ci --omit=dev

# COPY your source code into image/container

COPY . /usr/src/app/

#Expose PORT 
EXPOSE 8080

#Command for running project
CMD [ "yarn", "start:js" ]