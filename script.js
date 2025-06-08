let lastSubmissionTime = 0;

function formhandler() {
    const now = Date.now();

    // Cooldown: block if under 10 seconds since last submission
    if (now - lastSubmissionTime < 10000) {
        alert('Please wait a few seconds before submitting again.');
        return;
    }

    const fname = document.getElementById("fname").value.trim();
    const reason = document.getElementById("reason").value.trim();

    if (!fname || !reason) {
        alert('Please fill out both fields.');
        return;
    }

    const profanityPatterns = [
        /f[\W_]*u[\W_]*c[\W_]*k/i,
        /s[\W_]*h[\W_]*i[\W_]*t/i,
        /b[\W_]*i[\W_]*t[\W_]*c[\W_]*h/i,
        /a[\W_]*s[\W_]*s/i,
        /d[\W_]*a[\W_]*m[\W_]*n/i,
        /h[\W_]*e[\W_]*l[\W_]*l/i,
        /n[\W_]*i[\W_]*g[\W_]*g[\W_]*e[\W_]*r/i,
        /c[\W_]*u[\W_]*n[\W_]*t/i,
        /p[\W_]*u[\W_]*s[\W_]*s[\W_]*y/i,
        /d[\W_]*i[\W_]*c[\W_]*k/i,
        /c[\W_]*o[\W_]*c[\W_]*k/i,
        /wh[\W_]*o[\W_]*r[\W_]*e/i,
        /s[\W_]*l[\W_]*u[\W_]*t/i
    ];

    for (const pattern of profanityPatterns) {
        if (pattern.test(fname) || pattern.test(reason)) {
            alert('Your submission contains inappropriate language. Please revise it.');
            return;
        }
    }

    const pledge = {
        fname,
        reason
    };

    firebase.database().ref('pledges').push(pledge)
        .then(() => {
            document.getElementById("form").reset();
            lastSubmissionTime = now; // update last submission timestamp
            alert('Thank you for taking the pledge!');
        })
        .catch((error) => {
            console.error('Error saving pledge:', error);
            alert('Oops! Something went wrong.');
        });
}
