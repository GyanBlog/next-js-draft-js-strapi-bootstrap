
class ContentProcessor {
  /**
   * Put a flag in data for author's articles
   */
  async processAuthor(articles, loggedinUser) {
    if (articles && articles.length > 0) {
      let currentUserEmail = null;
      if (loggedinUser && loggedinUser.email) {
        currentUserEmail = loggedinUser.email;
      }

      if (currentUserEmail) {
        for (let i=0; i<articles.length; i++) {
          if (articles[i].author.email == currentUserEmail) {
            articles[i].myArticle = true;
          }
        }
      }
    }

    return articles;
  }
}

module.exports = new ContentProcessor();