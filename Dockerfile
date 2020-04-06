
FROM node:10

CMD ["bash"]

RUN apt-get update

WORKDIR /usr/src/app
COPY package*.json ./ 
RUN npm install

COPY . . 

# start app 
EXPOSE 80
CMD npm start
