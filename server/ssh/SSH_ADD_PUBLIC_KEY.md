## Access the authorized_keys file:

```bash
sudo nano ~/.ssh/authorized_keys
```

## Copy-Paste: Open id_rsa.pub on your local machine and copy its contents. In the server terminal (nano editor), paste the contents at the end of the authorized_keys file.

### Set the correct permissions for authorized_keys:

```bash
chmod 600 ~/.ssh/authorized_keys
```
