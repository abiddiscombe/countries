FROM denoland/deno:alpine
EXPOSE 8080
WORKDIR /app
USER deno
COPY deps.ts .
RUN deno cache deps.ts
COPY . .
CMD [ "deno", "run", "--allow-read", "--allow-env", "--allow-net", "src/index.ts" ]