const { exec } = require('child_process');
const fs = require('fs');

function commitAndPushChanges() {
    const fileName = 'example.txt';
    const newContent = `New content at ${new Date()}`;
    fs.writeFileSync(fileName, newContent);

    // Add all changes
    exec('git add .', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error adding changes: ${error.message}`);
            return;
        }

        // Commit with a timestamp
        exec(`git commit -m "Auto commit at $(date)"`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error committing changes: ${error.message}`);
                return;
            }

            // Push to the remote repository
            exec('git push origin main', (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error pushing changes: ${error.message}`);
                    return;
                }

                console.log('Changes committed and pushed successfully.');
            });
        });
    });
}

// Commit and push changes every 30 seconds
setInterval(commitAndPushChanges, 30000);
