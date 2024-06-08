
# Email-Classifier

This project is a full-stack application with a Next.js frontend and a Node.js backend. The frontend runs on port 3000 and the backend runs on port 8080.

## Prerequisites

- Node.js
- npm
- Nextjs

## Getting Started

### Frontend

1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Run the development server:
   ```sh
   npm run dev
   ```

   The frontend will be running at [http://localhost:3000](http://localhost:3000).

### Backend

1. Navigate back to the root directory:
   ```sh
   cd ..
   ```

2. Navigate to the backend directory:
   ```sh
   cd backend
   ```

3. Install dependencies:
   ```sh
   npm install
   ```

4. Start the backend server:
   ```sh
   npm run start
   ```

   The backend will be running at [http://localhost:8080](http://localhost:8080).

# My App Deployment

This repository contains the necessary configurations to deploy `my-app` using Kubernetes. The application can be deployed in both a local cluster using `kind` or in a cloud environment like AWS.

## Prerequisites

- **Docker**: Required for running `kind`.
- **kubectl**: Command-line tool for interacting with Kubernetes clusters.
- **kind**: Tool for running local Kubernetes clusters using Docker.
- **AWS CLI** (if deploying on AWS).

## Setup

### Local Cluster with Kind

1. **Install `kind`**: Follow the [kind installation guide](https://kind.sigs.k8s.io/docs/user/quick-start/#installation).

2. **Create Cluster Configuration**: Ensure you have a `clusterConfig.yml` file for your `kind` setup. Example configuration:

    ```yaml
    kind: Cluster
    apiVersion: kind.x-k8s.io/v1alpha4
    nodes:
      - role: control-plane
      - role: worker
    ```

3. **Create the Cluster**:

    ```sh
    kind create cluster --config clusterConfig.yml
    ```

4. **Apply the Deployment**:

    ```sh
    kubectl apply -f backend/kubernetes/deployment.yml
    ```

5. **Apply the NodePort Service**:

    ```sh
    kubectl apply -f service-np.yml
    ```

### Cloud Deployment on AWS

1. **Setup Kubernetes Cluster**: Follow the AWS documentation to set up a Kubernetes cluster on EKS (Elastic Kubernetes Service).

2. **Configure `kubectl` for AWS**: Ensure your `kubectl` is configured to interact with your AWS EKS cluster.

3. **Apply the Deployment**:

    ```sh
    kubectl apply -f backend/kubernetes/deployment.yml
    ```

4. **Apply the LoadBalancer Service**:

    ```sh
    kubectl apply -f service-lb.yml
    ```

## Deployment Configuration

### Deployment

The deployment configuration is located at `backend/kubernetes/deployment.yml`. This defines the deployment of the application, including replicas, container image, and ports.

### Services

- **NodePort Service**: The configuration is located at `service-np.yml`. This exposes the application on a static port on each node in the cluster.
- **LoadBalancer Service**: The configuration is located at `service-lb.yml`. This creates an external load balancer (used for cloud environments).

## Example YAML Files

### `backend/kubernetes/deployment.yml`

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app-deployment
  labels:
    app: my-app
spec:
  replicas: 1
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: my-app-container
        image: my-app-image:latest
        ports:
        - containerPort: 8080

