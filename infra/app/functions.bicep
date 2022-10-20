@description('The name of the function app that you wish to create.')
param appName string

@description('Location for all resources.')
param location string = resourceGroup().location

@description('Location for Application Insights')
param appInsightsLocation string

param tags object

@description('Configuration for the Functions App.')
param appSettings array = []

var functionAppName = appName
var hostingPlanName = appName
var applicationInsightsName = appName

resource hostingPlan 'Microsoft.Web/serverfarms@2021-03-01' = {
  name: hostingPlanName
  location: location
  sku: {
    name: 'Y1'
    tier: 'Dynamic'
  }
  properties: {}
}

resource functionApp 'Microsoft.Web/sites@2021-03-01' = {
  name: functionAppName
  location: location
  kind: 'functionapp'
  identity: {
    type: 'SystemAssigned'
  }
  tags: union(tags, {
      'azd-service-name': 'api'
    })
  properties: {
    serverFarmId: hostingPlan.id
    siteConfig: {
      appSettings: union([
          {
            name: 'WEBSITE_CONTENTSHARE'
            value: toLower(functionAppName)
          }
          {
            name: 'FUNCTIONS_EXTENSION_VERSION'
            value: '~4'
          }
          {
            name: 'APPINSIGHTS_INSTRUMENTATIONKEY'
            value: applicationInsights.properties.InstrumentationKey
          }
          {
            name: 'FUNCTIONS_WORKER_RUNTIME'
            value: 'dotnet'
          }
        ], appSettings)
      ftpsState: 'FtpsOnly'
      minTlsVersion: '1.2'
    }
    httpsOnly: true
  }
}

resource applicationInsights 'Microsoft.Insights/components@2020-02-02' = {
  name: applicationInsightsName
  location: appInsightsLocation
  kind: 'web'
  properties: {
    Application_Type: 'web'
    Request_Source: 'rest'
  }
}

output NAME string = functionApp.name
output ID string = functionApp.id
