const { exec } = require('child_process');
const fs = require('fs');

function commitAndPushChanges() {
    const fileName = 'example.txt';
    const newContent = `New content at ${new Date()}`;
    fs.writeFileSync(fileName, newContent);

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

function getRandomTime() {
    return Math.floor(Math.random() * 24 * 60 * 60 * 1000);
}

function scheduleRandomCommit() {
    const timeUntilNextCommit = getRandomTime();

    console.log(`Step: Commit scheduled`);
    console.log(`Random time selected: ${timeUntilNextCommit / (60 * 1000)} minutes`);

    const intervalId = setInterval(() => {
        const remainingTime = timeUntilNextCommit - Date.now();
        const remainingMinutes = Math.ceil(remainingTime / (60 * 1000));

        console.clear(); // Clear console for a cleaner display
        console.log(`Step: Commit scheduled`);
        console.log(`Random time selected: ${timeUntilNextCommit / (60 * 1000)} minutes`);
        console.log(`Remaining time until next commit: ${remainingMinutes} minutes`);

        if (remainingTime <= 0) {
            clearInterval(intervalId);
            commitAndPushChanges();
            console.log(`Step: Commit executed`);
            scheduleRandomCommit();
        }
    }, 1000);
}

scheduleRandomCommit();
