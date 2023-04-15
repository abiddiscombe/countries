FROM lukechannings/deno:latest
EXPOSE 8080
USER deno
WORKDIR /app
RUN mkdir ./src
COPY ./src ./src
RUN deno cache src/main.ts
RUN mkdir -p /var/tmp/log
CMD ["run", "--allow-all", "src/main.ts"]