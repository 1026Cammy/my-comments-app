document.addEventListener('DOMContentLoaded', async () => {
    const submitCommentButton = document.getElementById('submit-comment');
    const commentInput = document.getElementById('comment-input');
    const commentList = document.getElementById('comment-list');

    // Load comments from the server
    const loadComments = async () => {
        const response = await fetch('https://supportindeed.com/phpMyAdmin/index.php?server=1&xck=1702568649/comments.php');
        const comments = await response.json();
        comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.textContent = comment.comment;
            commentList.appendChild(commentElement);
        });
    };

    await loadComments();

    // Add comment event listener
    submitCommentButton.addEventListener('click', async () => {
        const commentText = commentInput.value.trim();
        if (commentText) {
            const response = await fetch('https://supportindeed.com/phpMyAdmin/index.php?server=1&xck=1702568649/comments.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `comment=${encodeURIComponent(commentText)}`
            });

            if (response.ok) {
                const commentElement = document.createElement('div');
                commentElement.textContent = commentText;
                commentList.appendChild(commentElement);
                commentInput.value = ''; // Clear input
            } else {
                alert('Failed to submit comment!');
            }
        } else {
            alert('Please enter a comment!');
        }
    });
});
