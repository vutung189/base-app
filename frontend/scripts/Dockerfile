# stage1 - build react app first
FROM node:14.17.0 as build
WORKDIR /app
RUN mkdir /app/node_modules
ENV PATH /app/node_modules/.bin:$PATH
COPY . /app
RUN yarn

RUN yarn build

# stage 2 - build the final image and copy the react build files
FROM nginx:1.17.8-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./scripts/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]