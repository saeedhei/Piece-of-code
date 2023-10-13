To build a Vue 3 app with Docker for production, you can follow these steps:

1. **Create a Dockerfile**.

The Dockerfile is a text file that contains instructions for building a Docker image. For a Vue 3 app, you can use a multi-stage build to create a production-ready image that is optimized for performance and size.

Here is an example of a Dockerfile for a Vue 3 app:

```dockerfile
FROM node:18-alpine as builder

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .
RUN npm run build

FROM nginx:1.23-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

This Dockerfile uses the `node:18-alpine` image to build the Vue 3 app, and the `nginx:1.23-alpine` image to serve the production-ready build.

2. **Build the Docker image**.

To build the Docker image, run the following command:

```
docker build -t my-vue-app .
```

This will build a Docker image named `my-vue-app`.

3. **Run the Docker image**.

To run the Docker image, you can use the following command:

```
docker run -p 80:80 my-vue-app
```

This will start a container running the Vue 3 app. The container will be exposed on port 80, so you can access the app at `http://localhost:80` in your browser.

4. **Deploy the Docker image to production**.

Once you have built and tested the Docker image, you can deploy it to production using a container orchestration platform such as Kubernetes or Docker Swarm.

Here is an example of a Kubernetes deployment manifest for a Vue 3 app:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-vue-app
spec:
  replicas: 1
  selector:
    matchLabels:
      app: my-vue-app
  template:
    metadata:
      labels:
        app: my-vue-app
    spec:
      containers:
      - name: my-vue-app
        image: my-vue-app
        ports:
        - containerPort: 80
```

This deployment manifest will create a Kubernetes Deployment object that will run one replica of the Vue 3 app container. The container will be exposed on port 80, so you can access the app at `http://<kubernetes-service-ip>:80` in your browser.

**Additional tips:**

* You can use a Docker registry such as Docker Hub to store and share your Docker images.
* You can use a CI/CD pipeline to automate the process of building, testing, and deploying your Vue 3 app with Docker.
* You can use environment variables to configure your Vue 3 app in different environments, such as development, staging, and production.
