#!/bin/bash

# Exit on error
set -e

# Login to Azure (make sure you're logged in via Azure CLI)
echo "Logging into Azure..."
az account show || az login

# Variables
RESOURCE_GROUP="avinor-ai-assistant-rg"
LOCATION="northeurope"
ACR_NAME="avinorassistantacr"
IMAGE_NAME="avinor-ai-assistant"
IMAGE_TAG="latest"

# Initialize Terraform
echo "Initializing Terraform..."
terraform init

# Apply Terraform configuration
echo "Applying Terraform configuration..."
terraform apply -auto-approve

# Build the Docker image
echo "Building Docker image..."
docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .

# Log in to Azure Container Registry
echo "Logging into Azure Container Registry..."
az acr login --name $ACR_NAME

# Tag the image for ACR
echo "Tagging image for ACR..."
docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${ACR_NAME}.azurecr.io/${IMAGE_NAME}:${IMAGE_TAG}

# Push the image to ACR
echo "Pushing image to ACR..."
docker push ${ACR_NAME}.azurecr.io/${IMAGE_NAME}:${IMAGE_TAG}

# Get the deployment URL
echo "Deployment completed. Application URL:"
terraform output app_url

echo "Deployment completed successfully!"
