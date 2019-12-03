FROM node:lts-alpine

# copy both 'package.json' and 'package-lock.json' (if available)
#COPY package*.json ./

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . /app

# make the 'app' folder the current working directory
WORKDIR /app/pwa

RUN ls -lah

# install simple http server for serving static content
RUN npm install -g http-server &&\
    rm -rf node_modules package-lock.json yarn.lock &&\
    npm install &&\
# build app for production with minification
    npm cache clean -f &&\
    npm run build

EXPOSE 8082
CMD [ "http-server", "dist", "-p", "8082"]
