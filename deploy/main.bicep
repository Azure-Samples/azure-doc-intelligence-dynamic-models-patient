@minLength(1)
@description('Primary location for all resources')
param location string

@minLength(1)
@maxLength(50)
@description('Name of the the environment which is used to generate a short unique hash used in all resources.')
param name string

param databaseName string = ''
param containerName string = ''

param swaSku string = 'Standard'

var tags = {
  'azd-env-name': name
}

// Cosmosdb
module cosmosdb 'cosmosdb.bicep' = {
  name: '${deployment().name}--cosmosdb'
  params: {
    location: location
    primaryRegion: location
    databaseName: databaseName
    containerName: containerName
  }
}

// Functions
module functions 'functions.bicep' = {
  name: '${deployment().name}--functions'
  params: {
    location: location
    appInsightsLocation: location
    tags: union(tags, {
        'azd-env-name': 'api'
      })
  }
}

// Static Web Apps
module staticWebApp 'swa.bicep' = {
  name: '${deployment().name}--swa'
  params: {
    location: 'westus2'
    sku: swaSku
    tags: union(tags, {
        'azd-service-name': 'web'
      })
  }
}
