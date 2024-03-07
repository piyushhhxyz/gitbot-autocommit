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

function getRandomTime() {
    // Get a random time between 0:00 and 23:59
    const randomHour = Math.floor(Math.random() * 24);
    const randomMinute = Math.floor(Math.random() * 60);

    // Set the random time for today
    const today = new Date();
    today.setHours(randomHour, randomMinute, 0, 0);

    // Calculate the time until the next commit
    const timeUntilNextCommit = today.getTime() - Date.now();

    return timeUntilNextCommit;
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
