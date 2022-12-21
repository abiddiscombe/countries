FROM lukechannings/deno:latest
EXPOSE 8080
USER deno
WORKDIR /app
RUN mkdir ./src
COPY src/deps.ts ./src
RUN deno cache src/deps.ts
COPY ./src ./src
RUN deno cache src/index.ts
RUN mkdir -p /var/tmp/log
CMD ["run", "--allow-all", "src/index.ts"]