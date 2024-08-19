

---

### Setup Secure Credential Storage for Docker

1. **Install rng-tools:**
   ```bash
   sudo apt-get install rng-tools -y
   ```
   *Explanation:* `rng-tools` is a set of utilities for managing random number generation. The main program is `rngd`, a daemon that feeds random data from hardware devices into the kernel entropy pool.

2. **Generate the required entropy:**
   ```bash
   sudo rngd -r /dev/urandom
   ```

3. **Install the pass tool:**
   ```bash
   sudo apt-get install pass -y
   ```

4. **Generate a new GPG key:**
   ```bash
   gpg --full-generate-key
   ```
   *Follow the interactive prompts to set up your new GPG key, including creating a passphrase.*

5. **Create a new directory for custom binaries:**
   ```bash
   mkdir ~/bin
   ```

6. **Change into the newly created directory:**
   ```bash
   cd ~/bin
   ```

7. **Add the directory to your PATH environment variable:**
   ```bash
   echo 'export PATH=$PATH:~/bin' >> ~/.bashrc
   source ~/.bashrc
   ```

8. **Download the Docker credential helper:**
   ```bash
   wget https://github.com/docker/docker-credential-helpers/releases/download/v0.6.3/docker-credential-pass-v0.6.3-amd64.tar.gz
   ```

9. **Extract the files:**
   ```bash
   tar xvzf docker-credential-pass-v0.6.3-amd64.tar.gz
   ```

10. **Set the proper permissions for the binary:**
    ```bash
    chmod a+x docker-credential-pass
    ```

11. **Copy the executable to a system-wide location:**
    ```bash
    sudo cp docker-credential-pass /usr/local/bin/
    ```

12. **Logout and login to Docker:**
    ```bash
    docker logout
    docker login
    ```

13. **Create a directory for Docker configuration:**
    ```bash
    mkdir ~/.docker
    ```

14. **Locate your GPG ID associated with the credential storage:**
    ```bash
    gpg --list-secret-keys
    ```
    or
    ```bash
    gpg --fingerprint [your_email_set_during_key_creation]
    ```

15. **Initialize the pass tool with your GPG ID:**
    ```bash
    pass init [your_gpg_id_string_in_hex_format]
    ```

16. **Create a password entry for Docker credential storage:**
    ```bash
    pass insert docker-credential-helpers/docker-pass-initialized-check
    ```

17. **Create a new Docker configuration file:**
    ```bash
    sudo vim ~/.docker/config.json
    ```

18. **Add the following content to the configuration file, then save and close:**
    ```json
    {
      "credsStore": "pass"
    }
    ```

19. **Finally, log in to Docker and check if the warning message disappears:**
    ```bash
    docker login
    ```

---

**Key Clarifications:**
- Ensure the `echo 'export PATH=$PATH:~/bin' >> ~/.bashrc` command is followed by `source ~/.bashrc` to apply the changes immediately.
- You may want to mention using `sudo vim ~/.docker/config.json` only if `vim` is installed; otherwise, any text editor can be used (e.g., `nano`).
- Ensure to verify that the GPG key has been properly initialized with the `pass` tool.

This revised guide should help users set up Docker's secure credential storage more effectively.
