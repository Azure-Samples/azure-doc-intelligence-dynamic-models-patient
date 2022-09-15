@minLength(1)
@description('Primary location for all resources')
param location string

@minLength(1)
@maxLength(50)
@description('Name of the the environment which is used to generate a short unique hash used in all resources.')
param name string

param databaseName string = 'patientDb'
param containerName string = 'patientContainer'

param swaSku string = 'Standard'
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

// Functions
module functions 'functions.bicep' = {
  name: '${name}--functions'
  params: {
    location: location
    appInsightsLocation: location
    tags: union(tags, {
        'azd-env-name': 'api'
      })
    appName: 'api-${name}'
  }
}

// Static Web Apps
module staticWebApp 'swa.bicep' = {
  name: '${name}--swa'
  params: {
    location: 'westus2'
    sku: swaSku
    tags: union(tags, {
        'azd-service-name': 'web'
      })
    name: 'swa-${name}'
  }
}

output WEB_URI string = staticWebApp.outputs.SWA_URI
