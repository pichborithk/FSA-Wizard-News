const express = require('express');
const morgan = require('morgan');

const postBank = require('./postBank');

const app = express();
const { PORT = 1337 } = process.env;

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  const posts = postBank.list();

  const html = `<!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
      ${posts
        .map(
          post => `
        <div class='news-item'>
          <p>
            <span class="news-position">${post.id}. ▲</span>
            <a href="/posts/${post.id}">${post.title}</a>
            <small>(by ${post.name})</small>
          </p>
          <small class="news-info">
            ${post.upvotes} upvotes | ${post.date}
          </small>
        </div>`
        )
        .join('')}
    </div>
  </body>
</html>`;
  res.send(html);
});

app.get('/posts/:id', (req, res) => {
  const id = req.params.id;
  const post = postBank.find(id);

  if (!post.id) {
    /* -------------------------------------- // Handling Error ------------------------------------- */
    /* ---------------------------------------------------------------------------------------------- */
    /*                                            Option 1                                            */
    /* ---------------------------------------------------------------------------------------------- */
    // res.status(404);
    // const html = `
    //   <!DOCTYPE html>
    //     <html>
    //     <head>
    //       <title>Wizard News</title>
    //       <link rel="stylesheet" href="/style.css" />
    //     </head>
    //     <body>
    //       <header><img src="/logo.png"/>Wizard News</header>
    //       <div class="not-found">
    //         <p>404: Page Not Found</p>
    //       </div>
    //     </body>
    //   </html>`;

    // res.send(html);

    /* ---------------------------------------------------------------------------------------------- */
    /*                                            Option 2                                            */
    /* ---------------------------------------------------------------------------------------------- */
    throw new Error('Not Found'); //this will only throw error but client request still hanging without solve
  } else {
    const html = `
      <!DOCTYPE html>
        <html>
        <head>
          <title>Wizard News</title>
          <link rel="stylesheet" href="/style.css" />
        </head>
        <body>
          <div class="news-list">
            <header><img src="/logo.png"/>Wizard News</header>
            <div class='news-item'>
              <p>${post.title}<small>(by ${post.name})</small></p>
              <p>${post.content}</p>
              <small class="news-info">${post.upvotes} upvotes | ${post.date}</small>
            </div>
          </div>
        </body>
      </html>`;

    res.send(html);
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}, http://localhost:${PORT}`);
});
