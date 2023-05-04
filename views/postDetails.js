const timeAgo = require('node-time-ago');

function postDetails(post) {
  const html = `<!DOCTYPE html>
    <html>
      <head>
        <title>Wizard News</title>
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>
        <div class="news-list">
          <header><img src="/logo.png" /><a href="/">Wizard News</a></header>
          <div class="news-item">
            <p>${post.title}<small>(by ${post.name})</small></p>
            <p>${post.content}</p>
            <small class="news-info"
              >${post.upvotes} upvotes | ${timeAgo(post.date)}</small
            >
          </div>
        </div>
      </body>
    </html>`;

  return html;
}

module.exports = postDetails;
