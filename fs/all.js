    const readdir = util.promisify(fs.readdir);
              const read_dir = await readdir(`${uperroot}/temp-pdf/${msg.chat.id}`);

              try {
                const readFile = util.promisify(fs.readFile);
                const readPDF = await readFile(`${uperroot}/temp-pdf/${msg.chat.id}/${read_dir[read_dir.length - 1]}`);
                // const readPDF = await fsPromises.readFile(`${uperroot}/temp-pdf/${msg.chat.id}/${read_dir[read_dir.length - 1]}`);

    

                await fsPromises.readdir(`${uperroot}/temp-pdf/${msg.chat.id}`, function (err, files) {
                  if (err) {
                    return console.log('Unable to scan directory: ' + err);
                  }

                  files.forEach(function (file) {
                    // fs.unlinkSync(`${uperroot}/temp-pdf/${msg.chat.id}/${file}`);
                  });
                });
              }
              catch (err) {
                console.log(err);
              }
