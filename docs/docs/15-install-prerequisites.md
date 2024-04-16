---
id: install-prerequisites
---

# Install prerequisites

## A computer

You'll need a computer with a 64-bit operating system. The labs have been tested on Windows 10/11 (latest updates), macOS Monterey/Ventura, Ubuntu 20.04/22.04, Chrome OS with the Linux Development Environment enabled.

## An Azure Subscription

An active Azure account. If you don't have one, you can create a [free account](https://azure.microsoft.com/free/cognitive-services/?WT.mc_id=aiml-77396-cxa). If you are a student, you can also get a [free account](https://azure.microsoft.com/free/students/?WT.mc_id=aiml-77396-cxa) without a credit card.
<!-- 
## A GitHub account

If you don't have a GitHub account then sign up for a free [GitHub organization account](https://docs.github.com/get-started/signing-up-for-github/signing-up-for-a-new-github-account). -->

## The patient registration app

The patient registration application is a combination of C# for the API and integration with [Azure Form Recognizer](https://docs.microsoft.com/azure/applied-ai-services/form-recognizer?WT.mc_id=aiml-77396-cxa), React with TypeScript for the web front end, and [Bicep](https://learn.microsoft.com/azure/azure-resource-manager/bicep/overview?tabs=bicep&WT.mc_id=aiml-77396-cxa) for managing the Azure resources (managed via the [Azure Developer CLI](https://learn.microsoft.com/azure/developer/azure-developer-cli/get-started?tabs=bare-metal%2Clinuxmac&pivots=programming-language-csharp&WT.mc_id=aiml-77396-cxa)).

This workshop uses the [Azure Developer CLI](https://learn.microsoft.com/azure/developer/azure-developer-cli/overview?tabs=nodejs&WT.mc_id=aiml-77396-cxa) to simplify the creation, management, and deletion of Azure services.

<!-- The recommended way to undertake the local development aspects of the workshop is to use [VS Code Remote Containers](https://code.visualstudio.com/docs/remote/containers?WT.mc_id=aiml-77396-cxa) (aka, devcontainers), which creates a Docker environment that is pre-installed with all the tools, dependencies, and extensions to complete the workshop. -->

## Clone the patient registration assets repo

Follow these steps to clone the patient registration assets repo to your local machine.

1. Install the [git](https://git-scm.com/) client.
1. Open a command prompt and navigate to the folder where you want to clone the repo.
1. Run the following command to clone the workshop repo:

   ```bash
   git clone https://github.com/newpatiente2e/Contoso-New-Patient-Assets.git contoso_new_patient_assets
   ```

## Set up the workshop environment

The are two ways to set up the workshop environment. The option you choose will depend on your computer's capabilities and your preference.

### GitHub Codespaces

This is the recommended option, follow the [GitHub Codespaces](../install-prerequisites/codespaces) instructions.

<!-- ### Azure Container Instances

If you don't have access to GitHub Codespaces, then follow the [Azure Container Instance](../install-prerequisites/container-instances) instructions.

### Local installation

This option requires the least amount of computer resources, but it is the most time-consuming to install. Follow the [Local installation instructions](../install-prerequisites/local-install). Installing the prerequisites locally will take approximately 10 minutes, and is supported on Windows, macOS, and Linux. -->

### Docker Dev Containers

If you run Docker on your computer, follow the [Dev Container](../install-prerequisites/dev-containers) instructions.
