const { exec } = require('child_process');

function commitChanges() {
    // Make changes to your files here if needed
    // e.g., use fs module to write to a file

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

            console.log('Changes committed successfully.');
        });
    });
}

// Commit changes every 30 seconds
setInterval(commitChanges, 30000);
