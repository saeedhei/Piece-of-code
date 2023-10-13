To install Kubernetes on your own infrastructure using Ubuntu, you can follow these steps:

1. **Install the required dependencies.** You will need to install the following dependencies on each of your Kubernetes nodes:
    * Docker
    * Kubeadm
    * Kubelet
    * Kubectl

You can install these dependencies using the following commands:

```
sudo apt update
sudo apt install docker.io kubeadm kubelet kubectl
```

2. **Initialize the Kubernetes cluster.** To initialize the Kubernetes cluster, you can run the following command on your master node:

```
kubeadm init
```

This will create the Kubernetes control plane and generate a token that you can use to join other nodes to the cluster.

3. **Join the worker nodes to the cluster.** To join a worker node to the cluster, you can run the following command on the worker node:

```
kubeadm join <master-node-ip>:<master-node-port> --token <token>
```

You can find the master node IP address and port by running the following command on the master node:

```
kubeadm config images list
```

The token can be found in the output of the `kubeadm init` command.

4. **Verify that the cluster is running successfully.** To verify that the cluster is running successfully, you can run the following command on the master node:

```
kubectl get nodes
```

This should list all of the nodes in your cluster, with the status `Ready`.

**Additional tips:**

* You can use the `kubectl get deployments` command to list all of the Deployments in your Kubernetes cluster.
* You can use the `kubectl get services` command to list all of the Services in your Kubernetes cluster.
* You can use the `kubectl get pods` command to list all of the Pods in your Kubernetes cluster.

**Managed Kubernetes services**

If you are looking for a more managed Kubernetes experience, you can consider using a managed Kubernetes service such as Google Kubernetes Engine (GKE) or Amazon Elastic Kubernetes Service (EKS). Managed Kubernetes services provide a fully managed Kubernetes experience, so you don't have to worry about installing or managing the Kubernetes cluster yourself.

**Conclusion**

Installing Kubernetes on your own infrastructure can be a bit complex, but it is a good option if you want to have complete control over your Kubernetes environment. If you are looking for a more managed Kubernetes experience, you can consider using a managed Kubernetes service.
