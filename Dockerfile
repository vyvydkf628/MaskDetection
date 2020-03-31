
FROM python:3.7.7

CMD ["bash"]

RUN apt-get update
RUN pip install --upgrade pip

RUN apt-get -y install curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_12.x  | bash -
RUN apt-get -y install nodejs


WORKDIR /usr/src/app
COPY package*.json ./ 
RUN npm install
RUN pip install --upgrade setuptools
# RUN pip install --upgrade pip
RUN pip install --no-cache-dir tensorflow==2.1.0rc2
RUN pip install --no-cache-dir argparse
RUN pip install --no-cache-dir Image

COPY . . 

# start app 
EXPOSE 80
CMD npm start
