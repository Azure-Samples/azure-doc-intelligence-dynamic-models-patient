param name string
param location string
param sku object = {
  name: 'F0'
}
param tags object

resource form_recognizer 'Microsoft.CognitiveServices/accounts@2022-03-01' = {
  name: name
  location: location
  sku: sku
  kind: 'FormRecognizer'
  properties: {
    publicNetworkAccess: 'Enabled'
    restore: false
  }
  tags: tags
}

output ENDPOINT string = form_recognizer.properties.endpoint
output KEY string = listKeys(form_recognizer.id, form_recognizer.apiVersion).key1
