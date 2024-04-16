# Clean up

## Deleting Azure resources

To delete the resources from Azure, from a VS Code terminal, run the following command:

```bash
azd down
```

This will prompt you to confirm that you want to delete the resources. Enter `y` to confirm.

## Stop the GitHub Codespace

If you are using a GitHub Codespace, you will need to stop the codespace. To stop a codespace, from VS Code in your web browser, select <kbd>F1</kbd> to open the command palette, then type and select **Codespaces: Stop Codespace**.

:::warning

As at Feburary 2023, GitHub personal accounts have up to 120 core hours per month of free codespaces usage. When you have completed the workshop, be sure to stop the current codespace to preserve your usage.

A "core hour" is a measure used for included compute usage. On a 2-core machine, you would get 60 hours free. On a 4-core machine, you would get 30 hours free, etc. [Learn more](https://docs.github.com/billing/managing-billing-for-github-codespaces/about-billing-for-github-codespaces) 

:::

## Purging the Form Recognizer resource

When deleting an Azure Form Recognizer resource, it's _soft deleted_ so you can recover it in the event of an accidental deletion. You have a 48hrs to recover a Form Recognizer resource. For more information, see [Recover deleted Cognitive Services resources](https://learn.microsoft.com/azure/cognitive-services/manage-resources?WT.mc_id=aiml-77396-cxa)

This is optional, as Azure will perform a hard delete after 48hrs. You can force an immediate *hard delete* using the following command:

```bash
region=<Azure Region selected>
resourceName=<Form Recognizer resource name>
resourceGroupName=<Resource group name>
az cognitiveservices account purge -l $region -n $resourceName -g $resourceGroupName
```

:::note

The resource group name and region were specified when you setup the project during the [Create Azure resources](./20-create-azure-services.md) step. The name of the Form Recognizer resource is prefixed with `form-recognizer-` and then a unique hash, that will be present in the logs when you cleaned up the resources in the previous step.

:::

## Social

Please tweet your questions, comments, and successes including hashtag #AzureFormRecognizer, the workshop link [https://aka.ms/PatientRegistration](https://aka.ms/PatientRegistration), and tag @dglover. Thank you.
