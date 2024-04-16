# Static Web App roles

Azure Static Web Apps provide a streamlined authentication experience. The free tier Static Web Apps include several pre-configured providers. For higher-tier Static Web Apps, you can register custom authentication providers.

You can learn more about Static Web Apps authentication in the [Authentication and authorization for Azure Static Web Apps documentation](https://docs.microsoft.com/azure/static-web-apps/authentication-authorization?WT.mc_id=aiml-77396-cxa).

## Role management

By default, every user belongs to the built-in anonymous role, and all logged-in users are members of the authenticated role. There are three roles in the Contoso Healthcare app: admin, nurse, and doctor. To add a user to a role, you generate invitations that allow you to associate users to specific roles.

Invitations are specific to individual authorization providers, so consider the needs of your app as you select which providers to support. Some providers expose a user's email address, while others only provide the site's username.

| Authorization provider | Exposes a user's |
| ---------------------- | ---------------- |
| Azure Active Directory | email address    |
| GitHub                 | username         |
| Twitter                | username         |

### Create role invitations

Create two invitations for the Contoso Healthcare app. One invitation for the admin role, and one invitation for the nurse role.

1. You should have the Azure Portal open in a browser tab from the previous step. If you don't, navigate to the [Azure portal](https://portal.azure.com) and sign in.
1. From the Azure portal, ensure you are in the correct subscription and resource group for this workshop.
1. Select the Static Web App, the name starts with **swa-**.
1. Under _Settings_, click on **Role Management**.
1. Select **Invite**.

#### Invite an admin

From the **Create invitation** dialog, enter the following values:

1. Select **Azure Active Directory** from the list of options.
1. Update the following settings:
    - **Email**: Enter the email address used to authenticate to the Azure Portal.
    - **Role**: admin
1. Select **Generate**.
1. Copy the link from the _Invite link_ box.
1. If the link is for you, then paste the link into your browser and follow the instructions to accept the invitation. If the link is for someone else, then send the link to the recipient for them to accept the invitation.
1. Close the **Create invitation** dialog in the Azure Portal.

#### Invite a nurse

From the **Create invitation** dialog, enter the following values:

For the nurse role, you can use your GitHub account or Twitter account.

1. Select either **GitHub** or **Twitter** from the list of options.
1. Update the following settings:
    - **Username**: Enter the username used to authenticate to the GitHub or Twitter account.
    - **Role**: nurse
1. Click the **Generate** button.
1. Copy the link from the _Invite link_ box.
1. If the link is for you, then paste the link into your browser and follow the instructions to accept the invitation. If the link is for someone else, then send the link to the recipient for them to accept the invitation.
1. Close the **Create invitation** dialog in the Azure Portal.
