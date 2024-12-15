# Avinor AI Assistant Deployment Guide

## Prerequisites
1. Make sure you have Azure CLI installed (already done in the environment)

## Deployment Steps

1. **Login to Azure**
```bash
az login
```

2. **Set your subscription (if you have multiple)**
```bash
az account list
az account set --subscription <subscription-id>
```

3. **Create Resource Group**
```bash
az group create --name avinor-ai-assistant-rg --location northeurope
```

4. **Create Azure Container Registry**
```bash
az acr create --resource-group avinor-ai-assistant-rg --name avinorassistantacr --sku Basic
```

5. **Build and Push Docker Image**
```bash
az acr login --name avinorassistantacr
docker build -t avinor-ai-assistant .
docker tag avinor-ai-assistant avinorassistantacr.azurecr.io/avinor-ai-assistant:latest
docker push avinorassistantacr.azurecr.io/avinor-ai-assistant:latest
```

6. **Deploy Container App**
```bash
az containerapp create \
  --name avinor-ai-assistant \
  --resource-group avinor-ai-assistant-rg \
  --image avinorassistantacr.azurecr.io/avinor-ai-assistant:latest \
  --target-port 8080 \
  --ingress external \
  --environment avinor-ai-assistant-env
```

Note: You can run these commands one by one to ensure each step completes successfully.
