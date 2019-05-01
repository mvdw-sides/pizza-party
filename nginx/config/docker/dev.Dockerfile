FROM nginx:alpine

RUN mkdir -p /etc/ssl/certs 

RUN ls -la /etc/ssl

COPY certs /etc/ssl/certs

RUN ls -la /etc/ssl/certs

COPY snippets /etc/nginx/snippets
COPY nginx.conf /etc/nginx/nginx.conf

