# How to Setup SSH Access Without Passphrase Prompt

This guide will help you configure your SSH setup so that you are not repeatedly asked for the passphrase when connecting to your server. We'll use `ssh-agent` to cache your SSH key and configure it to start automatically.

## Steps

### 1. Create Public and Private keys
```bash
ssh-keygen -b 4096
```

### 2. Ensure `ssh-agent` is Running

First, you need to make sure the SSH agent is running. Open a terminal and run the following command:

```bash
eval $(ssh-agent -s)
```

### 3. Add Your SSH Key to ssh-agent

```bash
ssh-add ~/.ssh/id_rsa
```

### 4. Verify the SSH Key is Added to ssh-agent

```bash
ssh-add -l
```

### 5. Create/Edit SSH Config File

```bash
nano ~/.ssh/config
```

Add the following configuration for your VPS:

```bash
Host myvps
    HostName xx.xx.xx.xx
    User root
    IdentityFile ~/.ssh/id_rsa
    AddKeysToAgent yes
```


## server

```bash
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```


