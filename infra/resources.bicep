@minLength(1)
@description('Primary location for all resources')
param location string

@minLength(1)
@maxLength(50)
@description('Name of the the environment which is used to generate a short unique hash used in all resources.')
param name string

param databaseName string = 'patientDb'
param containerName string = 'patientContainer'

param tags object

// Cosmosdb
module cosmosdb 'cosmosdb.bicep' = {
  name: '${name}--cosmosdb'
  params: {
    location: location
    primaryRegion: location
    databaseName: databaseName
    containerName: containerName
    accountName: 'cosmos-${name}'
  }
}

// Storage
module storage 'storage.bicep' = {
  name: '${name}--storage'
  params: {
    location: location
    storageAccountName: 'storage${name}'
    tags: tags
  }
}

// Static Web Apps
module staticWebApp 'swa.bicep' = {
  name: '${name}--swa'
  params: {
    location: 'westus2'
    tags: union(tags, {
        'azd-service-name': 'web'
      })
    buildProperties: {
      skipGithubActionWorkflowGeneration: true
    }
    staticSiteName: 'swa-${name}'
    appSettings: {
      NEW_PATIENT_STORAGE: storage.outputs.CONNECTION_STRING
      AzureWebJobsStorage: storage.outputs.CONNECTION_STRING
      COSMOS_DB: cosmosdb.outputs.CONNECTION_STRING
      FORM_RECOGNIZER_API_KEY: ''
      FORM_RECOGNIZER_ENDPOINT: ''
      FORM_RECOGNIZER_MODEL_ID: ''
      FUNCTIONS_WORKER_RUNTIME: 'dotnet'
    }
  }
}

output WEB_URI string = staticWebApp.outputs.uri
