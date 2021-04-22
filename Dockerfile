FROM ubuntu:latest

ENV DATABASE_HOST='localhost'
ENV DATABASE_USER='school_page'
ENV DATABASE_PASSWORD='school_page'
ENV DATABASE_DB='school_page'

# Configure timezone
RUN ln -snf /usr/share/zoneinfo/Europe/Warsaw /etc/localtime && echo Europe/Warsaw > /etc/timezone

# Install NodeJS and Git
RUN apt-get update && \
    apt-get install -y nodejs npm git

# Install packages from NodeJS
RUN npm -g install bower

# Create Workdir
WORKDIR /app

# Copy all files to Workdir
COPY . .

# Install all required packages
RUN npm install && \
    bower install --allow-root

EXPOSE 8000
CMD ["node", "main.js"]