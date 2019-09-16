# Use an OS image from the Docker Hub. It pull down an image, in this case an Ubuntu based image that has Nodejs installed.
FROM node:latest

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at . .
COPY package.json /app


# Install any needed dependencies or packages specified in packaje.json
RUN npm install

COPY . /app

# Make port 3000 available to the world outisde this container
EXPOSE 3000

# Run server.js when the container launches
CMD ["node", "server.js"]
