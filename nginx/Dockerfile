# Note: this project is setup for a local machine set-up
# this proxy, has no intention to reach production levels.

FROM nginx:alpine

RUN mkdir -p /etc/ssl/certs 

RUN ls -la /etc/ssl

COPY certs /etc/ssl/certs

RUN ls -la /etc/ssl/certs

COPY snippets /etc/nginx/snippets
COPY nginx.conf /etc/nginx/nginx.conf

