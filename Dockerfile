FROM node:latest

ENV DATABASE_HOST='localhost'
ENV DATABASE_USER='school_page'
ENV DATABASE_PASSWORD='school_page'
ENV DATABASE_DB='school_page'

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