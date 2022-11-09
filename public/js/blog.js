// event handler for new blog post
const blogPostHandler = async function (event) {
    event.prevntDefault();

    const subject = document.querySelector('#blog-subject').value.trim();
    const blogText = document.querySelector('#blog-text').value.trim();

    if (subject && blogText) {
        const response = await fetch('/api/blogs', {
            method: 'POST',
            body: JSON.stringify({ subject, blogText }),
            headers: { 'Content-Type': 'application/json' };
        });

        if (response.ok) {
            document.location.replace('/users');
        } else {
            alert('Failed to post blog');
        }
    }
};

const deleteHandler = async function (event) {
    
}