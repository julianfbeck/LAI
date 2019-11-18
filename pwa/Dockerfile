FROM node:lts-alpine

# install simple http server for serving static content
RUN npm install -g http-server

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
#COPY package*.json ./


# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

RUN rm -rf node_modules package-lock.json yarn.lock
RUN npm install 
# build app for production with minification
RUN npm cache clean -f 
RUN npm run build


EXPOSE 8082
CMD [ "http-server", "dist", "-p", "8082"]
