 # Define the Kubernetes Namespace for your development environment
 resource "kubernetes_namespace" "dev" {
   metadata {
     name = "dev-environment"
   }
 }
 
 # Define a ConfigMap for application environment variables
 resource "kubernetes_config_map" "app_config" {
   metadata {
     name      = "app-config"
     namespace = kubernetes_namespace.dev.metadata[0].name
   }
 
   data = {
     ENVIRONMENT = "development"
     LOG_LEVEL   = "debug"
     PORT        = "3000"
   }
 }

