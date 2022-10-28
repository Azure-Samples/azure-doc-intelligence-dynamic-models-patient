# Change log
# Updated to azd beta5

# Find the Dockerfile at this URL
# https://github.com/Azure/azure-functions-docker/blob/dev/host/4/bullseye/amd64/dotnet/dotnet-inproc/dotnet-core-tools.Dockerfile
FROM mcr.microsoft.com/azure-functions/dotnet:4-dotnet6-core-tools

# Uncomment following lines If you want to enable Development Container Script
# For more details https://github.com/microsoft/vscode-dev-containers/tree/main/script-library

# Avoid warnings by switching to noninteractive
# ENV DEBIAN_FRONTEND=noninteractive

# # Comment out these lines if you want to use zsh.

# ARG INSTALL_ZSH=true
# ARG USERNAME=vscode
# ARG USER_UID=1000
# ARG USER_GID=$USER_UID

# RUN apt-get update && curl -ssL https://raw.githubusercontent.com/microsoft/vscode-dev-containers/main/script-library/common-debian.sh -o /tmp/common-script.sh \
#     && /bin/bash /tmp/common-script.sh "$INSTALL_ZSH" "$USERNAME" "$USER_UID" "$USER_GID" \
#     && rm /tmp/common-script.sh 

ENV NVM_DIR="/usr/local/share/nvm"
ENV NVM_SYMLINK_CURRENT=true \
    PATH=${NVM_DIR}/current/bin:${PATH}

RUN apt-get update && curl -ssL https://raw.githubusercontent.com/microsoft/vscode-dev-containers/main/script-library/node-debian.sh -o /tmp/node-debian.sh \
    && apt-get update \
    && bash /tmp/node-debian.sh "${NVM_DIR}" \
    && curl -fsSL https://aka.ms/install-azd.sh | bash \
    && su vscode -c "umask 0002 && npm install --cache /tmp/empty-cache -g @azure/static-web-apps-cli"

RUN apt-get update && apt-get install -y openssh-server
RUN mkdir /var/run/sshd

RUN useradd -rm -d /home/ubuntu -s /bin/bash -g root -G sudo -u 1001 globalai
RUN echo 'globalai:back2gether' | chpasswd

# RUN echo 'root:PASSWORD' | chpasswd
RUN sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config
RUN sed 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' -i /etc/pam.d/sshd
EXPOSE 22

CMD ["/usr/sbin/sshd", "-D"]
