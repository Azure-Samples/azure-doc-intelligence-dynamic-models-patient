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
module cosmosdb './core/cosmosdb.bicep' = {
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
module storage './core/storage.bicep' = {
  name: '${name}--storage'
  params: {
    location: location
    storageAccountName: 'storage${name}'
    tags: tags
    corsRules: [ {
        allowedOrigins: [
          'https://formrecognizer.appliedai.azure.com'
        ]
        allowedMethods: [
          'DELETE'
          'GET'
          'HEAD'
          'MERGE'
          'OPTIONS'
          'PATCH'
          'POST'
          'PUT'
        ]
        maxAgeInSeconds: 120
        exposedHeaders: [
          '*'
        ]
        allowedHeaders: [
          '*'
        ]
      } ]
  }
}

// Storage Containers
module uploadContainer './core/storage-container.bicep' = {
  name: '${name}--upload-container'
  params: {
    storageAccountName: storage.outputs.NAME
    containerName: 'newpatientforms'
  }
}
module formRecognizerContainer './core/storage-container.bicep' = {
  name: '${name}--form-recognizer-container'
  params: {
    storageAccountName: storage.outputs.NAME
    containerName: 'trainingdata'
    containerProperties: {
      immutableStorageWithVersioning: {
        enabled: false
      }
      defaultEncryptionScope: '$account-encryption-key'
      denyEncryptionScopeOverride: false
      publicAccess: 'None'
    }
  }
}

// Form Recognizer
module formRecognizer './core/form-recognizer.bicep' = {
  name: '${name}--form-recognizer'
  params: {
    location: location
    name: 'form-recognizer-${name}'
    tags: tags
  }
}

module functions 'app/functions.bicep' = {
  name: '${name}--functions'
  params: {
    location: location
    appInsightsLocation: location
    tags: union(tags, {
        'azd-env-name': 'api'
      })
    appName: 'api-${name}'
    appSettings: [
      {
        name: 'AzureWebJobsStorage'
        value: storage.outputs.CONNECTION_STRING
      }
      {
        name: 'WEBSITE_CONTENTAZUREFILECONNECTIONSTRING'
        value: storage.outputs.CONNECTION_STRING
      }
      {
        name: 'NEW_PATIENT_STORAGE'
        value: storage.outputs.CONNECTION_STRING
      }
      {
        name: 'FORM_RECOGNIZER_API_KEY'
        value: formRecognizer.outputs.KEY
      }
      {
        name: 'FORM_RECOGNIZER_ENDPOINT'
        value: formRecognizer.outputs.ENDPOINT
      }
      {
        name: 'FORM_RECOGNIZER_MODEL_ID'
        value: 'patient-registration-model'
      }
      {
        name: 'COSMOS_DB'
        value: cosmosdb.outputs.CONNECTION_STRING
      }
    ]
  }
}

// Static Web Apps
module staticWebApp 'app/swa.bicep' = {
  name: '${name}--swa'
  params: {
    sku: {
      name: 'Standard'
      tier: 'Standard'
    }
    location: 'westus2'
    tags: union(tags, {
        'azd-service-name': 'web'
      })
    buildProperties: {
      skipGithubActionWorkflowGeneration: true
    }
    staticSiteName: 'swa-${name}'
    functionAppName: functions.outputs.NAME
    functionAppId: functions.outputs.ID
    functinonAppLocation: location
  }
}

output WEB_URI string = staticWebApp.outputs.uri
output COSMOS_CONNECTION_STRING string = cosmosdb.outputs.CONNECTION_STRING
output FORM_RECOGNIZER_ENDPOINT string = formRecognizer.outputs.ENDPOINT
output FORM_RECOGNIZER_KEY string = formRecognizer.outputs.KEY
output STORAGE_ACCOUNT_CONNECTION string = storage.outputs.CONNECTION_STRING
