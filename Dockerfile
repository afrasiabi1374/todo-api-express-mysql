FROM node:16
RUN mkdir -p /app
COPY ./app/ /app
RUN cd /app && npm install -f 
EXPOSE  5000
WORKDIR /app
CMD ["node", "app.js"]
