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
module uploadContainer 'storage-container.bicep' = {
  name: '${name}--upload-container'
  params: {
    storageAccountName: storage.outputs.NAME
    containerName: 'newpatientforms'
  }
}
module formRecognizerContainer 'storage-container.bicep' = {
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
module formRecognizer 'form-recognizer.bicep' = {
  name: '${name}--form-recognizer'
  params: {
    location: location
    name: 'form-recognizer-${name}'
    tags: tags
  }
}

// Static Web Apps
module staticWebApp 'swa.bicep' = {
  name: '${name}--swa'
  params: {
    // sku: {
    //   name: 'Standard'
    //   tier: 'Standard'
    // }
    location: 'westus2'
    tags: union(tags, {
        'azd-service-name': 'web'
      })
    buildProperties: {
      skipGithubActionWorkflowGeneration: true
    }
    staticSiteName: 'swa-${name}'
  }
}

output WEB_URI string = staticWebApp.outputs.uri
