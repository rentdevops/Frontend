# Base image for building the React app
FROM node:16 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Check the build output directory
RUN ls -la

# Use a lightweight web server image to serve the React app
FROM nginx:stable-alpine

# Set working directory in the container
WORKDIR /usr/share/nginx/html

# Remove default NGINX static files
RUN rm -rf ./*

# Copy build files from the previous stage
# For Create React App, the build directory is typically 'build'
# For Next.js, it might be '.next' or 'out'
# For Vite, it's typically 'dist'
COPY --from=build /app/dist .
# Alternative paths (uncomment the correct one):
# COPY --from=build /app/build .
# COPY --from=build /app/out .
# COPY --from=build /app/.next .

# Expose the default NGINX port
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]

