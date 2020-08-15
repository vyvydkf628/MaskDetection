
FROM node:10

CMD ["bash"]

RUN apt-get update

WORKDIR /usr/src/app
COPY package*.json ./ 
RUN npm install

COPY . . 

RUN mkdir image
# start app 
EXPOSE 80
CMD npm start
