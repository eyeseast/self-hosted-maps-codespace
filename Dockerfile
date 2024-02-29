FROM mcr.microsoft.com/devcontainers/base:jammy

RUN apt-get update -y && apt-get install -y build-essential libsqlite3-dev zlib1g-dev wget python3-dev libsqlite3-mod-spatialite

# tippecanoe
RUN git clone https://github.com/felt/tippecanoe.git && \
    cd tippecanoe && \
    make -j && \
    make install

# pmtiles
RUN wget https://github.com/protomaps/go-pmtiles/releases/download/v1.17.0/go-pmtiles_1.17.0_Linux_x86_64.tar.gz && \
    tar -xvzf go-pmtiles_1.17.0_Linux_x86_64.tar.gz && mv pmtiles /usr/local/bin/

# nodejs
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

# poetry
ENV POETRY_HOME="/usr/local"
RUN curl -sSL https://install.python-poetry.org | python3 -

WORKDIR /app

COPY . /app/

RUN npm ci
RUN poetry install --no-root

EXPOSE 8001
EXPOSE 5173

CMD [ "/bin/bash" ]