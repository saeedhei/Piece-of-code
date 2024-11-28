## Access the authorized_keys file:

```bash
sudo nano ~/.ssh/authorized_keys
```

Copy-Paste: Open id_rsa.pub on your local machine and copy its contents. In the server terminal (nano editor), paste the contents at the end of the authorized_keys file.

### Set the correct permissions for authorized_keys:

```bash
chmod 600 ~/.ssh/authorized_keys
```

### Error writing /root/.ssh/authorized_keys: No such file or directory:
sudo mkdir /root/.ssh
sudo chmod 700 /root/.ssh
