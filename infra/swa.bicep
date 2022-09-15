@description('Cosmos DB account name, max length 44 characters, lowercase')
param name string
param location string
param sku string = 'Standard'
param tags object

resource swa_resource 'Microsoft.Web/staticSites@2021-01-15' = {
  name: name
  location: location
  tags: union(tags, {
      'azd-service-name': 'web'
    })
  properties: {}
  sku: {
    name: sku
    size: sku
  }
}

output SWA_URI string = 'https://${swa_resource.properties.defaultHostname}'
