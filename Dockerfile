FROM node:16.17.0

WORKDIR /app

COPY ["package.json" , "./"]

RUN npm install 

COPY . .

EXPOSE 8080

CMD [ "node" , "index.js" ]


# ========= Commands ========

# Build an image : docker build . -t bostaImage

# Build a container : docker run --name bostaContainer bostaImage

# Expose port and Run the container : docker run -p 3000:8080 bostaImage

