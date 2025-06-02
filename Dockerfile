FROM jenkins/jenkins:lts

USER root

RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
  && apt-get install -y nodejs git curl python3 make g++ libasound2 libatk1.0-0 \
     libatk-bridge2.0-0 libcups2 libdbus-1-3 libdrm2 libxkbcommon0 libxcomposite1 \
     libxdamage1 libxrandr2 libgbm1 libgtk-3-0 libnss3 libxshmfence1 xvfb \
  && npm install -g npm

RUN /usr/local/bin/install-plugins.sh htmlpublisher nodejs

USER jenkins