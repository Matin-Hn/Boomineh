# ================================
# Multi-stage Dockerfile for a Full-Stack App (Frontend + Backend)
# Stage 1: Build the frontend (React/Vue/etc. SPA) using Node.js
# Stage 2: Serve the built frontend via a Python backend (e.g., Django/Flask)
# ================================

# --- STAGE 1: FRONTEND BUILD ---
# Use Node.js 18 as the base image for building the frontend
FROM node:18 AS frontend

# Set the working directory inside the container for frontend files
WORKDIR /app/frontend

# Copy package.json and package-lock.json (or npm-shrinkwrap.json) only
# This allows Docker to cache the `npm install` layer if package files haven’t changed
COPY frontend/package*.json ./

# Install frontend dependencies with extended timeouts to handle slow networks
# Especially useful in CI/CD or regions with unstable connectivity
RUN npm install --fetch-timeout=600000 --network-timeout=600000

# Copy the rest of the frontend source code into the container
COPY frontend/ ./

# Build the production-ready static files (e.g., into ./dist or ./build)
# Assumes your frontend has a "build" script in package.json (e.g., "react-scripts build")
RUN npm run build


# --- STAGE 2: PYTHON BACKEND + SERVING FRONTEND ---
# Use Python 3.11 as the base image for the backend server
FROM python:3.11

# Environment variables for Python:
# - Prevents .pyc files from cluttering the filesystem
# - Ensures logs are output immediately (useful for Docker logs)
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set working directory for backend app
WORKDIR /app

# Copy backend requirements (dependencies)
COPY backend/requirements.txt .

# Install Python dependencies without caching to keep image smaller
# --no-cache-dir avoids storing pip cache in the layer
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire backend source code into the container
COPY backend/ ./

# --- INTEGRATE FRONTEND BUILD ARTIFACTS ---
# Copy built frontend static assets (JS, CSS, images, etc.) from the 'frontend' stage
# Assumes frontend build outputs to /app/frontend/dist/assets/
COPY --from=frontend /app/frontend/dist/assets/ ./static/assets/

# Copy the main index.html (entry point) from frontend build
# Assumes your backend serves this as a template (e.g., Django templates or Flask render_template)
COPY --from=frontend /app/frontend/dist/index.html ./templates/

# Ensure we’re in the right directory (redundant but safe)
WORKDIR /app

# Default command to start the Python backend server
# Listens on all interfaces (0.0.0.0) on port 8000 — common for Django dev server
# Replace with gunicorn/uwsgi command for production!
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]