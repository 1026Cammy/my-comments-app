document.addEventListener('DOMContentLoaded', async () => {
    const submitCommentButton = document.getElementById('submit-comment');
    const commentInput = document.getElementById('comment-input');
    const commentList = document.getElementById('comment-list');

    // Load comments from the server
    const loadComments = async () => {
        try {
            const response = await fetch('https://cammyk.mygamesonline.org/comments.php');
            if (!response.ok) throw new Error('Failed to load comments');
            const comments = await response.json();
            comments.forEach(comment => {
                const commentElement = document.createElement('div');
                commentElement.textContent = comment.comment;
                commentList.appendChild(commentElement);
            });
        } catch (error) {
            console.error(error);
            alert('Error loading comments');
        }
    };

    await loadComments();

    // Add comment event listener
    submitCommentButton.addEventListener('click', async () => {
        const commentText = commentInput.value.trim();
        if (commentText) {
            // Prompt for the password
            const password = prompt('What is our motto?');
            if (!password) {
                alert('What is our motto?');
                return;
            }

            try {
                const username = '6969646464'; // Replace with your actual username

                const response = await fetch('https://cammyk.mygamesonline.org/comments.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': 'Basic ' + btoa(`${username}:${password}`)
                    },
                    body: `comment=${encodeURIComponent(commentText)}`
                });

                if (response.ok) {
                    const commentElement = document.createElement('div');
                    commentElement.textContent = commentText;
                    commentList.appendChild(commentElement);
                    commentInput.value = ''; // Clear input
                } else {
                    throw new Error('Failed to submit comment');
                }
            } catch (error) {
                console.error(error);
                alert('Error submitting comment');
            }
        } else {
            alert('Please enter a comment!');
        }
    });
});
