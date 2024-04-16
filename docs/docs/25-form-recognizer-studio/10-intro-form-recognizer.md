# Form recognizer studio

Form recognizer studio is a web-based tool that allows you to create custom models. You can use it to label your training documents and train your custom model.

## Custom Form Recognizer models

Form Recognizer uses advanced machine learning to extract text and table data from your documents. You can train custom models to extract data specific to your forms, or use the prebuilt models to extract common fields from receipts, invoices, and business cards.

To train a custom model, you need to provide a set of labeled training documents. The training documents should be in the same format as the documents you want to recognize. For example, if you want to recognize receipts, you should provide labeled training receipts.

You need at least five examples of a document type to train a custom model. For example, if you want to recognize receipts, you'd need five labeled receipts examples.

## Custom model types

Custom models can be one of two types, [**custom template**](https://docs.microsoft.com/azure/applied-ai-services/form-recognizer/concept-custom-template?WT.mc_id=aiml-77396-cxa) or custom form and [**custom neural**](https://docs.microsoft.com/azure/applied-ai-services/form-recognizer/concept-custom-neural?WT.mc_id=aiml-77396-cxa) or custom document models. The labeling and training process for both models is identical, but the models differ as follows:
