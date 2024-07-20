# Use an official Node.js runtime as a parent image
FROM node:14.20.1 AS base

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install production dependencies
RUN npm install --only=production

# Install NestJS CLI globally
RUN npm install -g @nestjs/cli

# Install TypeScript and ts-node globally
RUN npm install -g typescript ts-node


# Install tsconfig-paths globally
RUN npm install -g source-map-support 


# Set the global installation directory for npm to /root/.npm-global
ENV NPM_CONFIG_PREFIX=/root/.npm-global
ENV PATH=$PATH:/root/.npm-global/bin

# Copy the source code into the container
COPY . .


# Build the application
RUN npm run build


RUN npm install -g tsconfig-paths --save-dev


FROM base AS production
# Start the application
CMD npm run apply:migration && npm run seed:run && npm run start:prod


# Expose the port the application will listen on
EXPOSE 3000
