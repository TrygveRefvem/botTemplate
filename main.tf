# Azure provider configuration
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}

provider "azurerm" {
  features {}
}

# Environment Variables
variable "elevenlabs_api_key" {
  description = "ElevenLabs API Key"
  type        = string
  sensitive   = true
}

variable "database_url" {
  description = "PostgreSQL Database URL"
  type        = string
  sensitive   = true
}

variable "node_env" {
  description = "Node environment (production/development)"
  type        = string
  default     = "production"
}


# Create resource group
resource "azurerm_resource_group" "rg" {
  name     = "avinor-ai-assistant-rg"
  location = "northeurope"
}

# Create container registry
resource "azurerm_container_registry" "acr" {
  name                = "avinorassistantacr"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku                 = "Basic"
  admin_enabled       = true
}

# Create Log Analytics workspace
resource "azurerm_log_analytics_workspace" "workspace" {
  name                = "avinor-ai-assistant-workspace"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku                 = "PerGB2018"
  retention_in_days   = 30
}

# Create Container App Environment
resource "azurerm_container_app_environment" "environment" {
  name                       = "avinor-ai-assistant-env"
  resource_group_name        = azurerm_resource_group.rg.name
  location                   = azurerm_resource_group.rg.location
  log_analytics_workspace_id = azurerm_log_analytics_workspace.workspace.id
}

# Create Container App
resource "azurerm_container_app" "app" {
  name                         = "avinor-ai-assistant"
  container_app_environment_id = azurerm_container_app_environment.environment.id
  resource_group_name         = azurerm_resource_group.rg.name
  revision_mode               = "Single"

  template {
    container {
      name   = "avinor-ai-assistant"
      image  = "${azurerm_container_registry.acr.login_server}/avinor-ai-assistant:latest"
      cpu    = "0.5"
      memory = "1Gi"

      env {
        name  = "NODE_ENV"
        value = var.node_env
      }
      env {
        name = "ELEVENLABS_API_KEY"
        secret_name = "elevenlabs-api-key"
      }
      env {
        name = "DATABASE_URL"
        secret_name = "database-url"
      }

      secret {
        name = "elevenlabs-api-key"
        value = var.elevenlabs_api_key
      }
      secret {
        name = "database-url"
        value = var.database_url
      }
    }
  }

  ingress {
    external_enabled = true
    target_port     = 8080
    traffic_weight {
      percentage      = 100
      latest_revision = true
    }
  }
}

# Output values
output "app_url" {
  value = azurerm_container_app.app.latest_revision_fqdn
}
