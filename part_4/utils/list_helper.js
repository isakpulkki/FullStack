const dummy = (blogs) => {
    return 1
  }

  const totalLikes = (blogs) => {
    return blogs.reduce((totalLikes, blog) => {
        return totalLikes + blog.likes
    }, 0)
  }

  const favoriteBlog = (blogs) => {
    return blogs.reduce((favoriteBlog, blog) => {
        if (blog.likes > favoriteBlog.likes) {
            return {
                title: blog.title,
                author: blog.author,
                likes: blog.likes
            }
        }
    }, {"likes": 0})
  }

  module.exports = {
    dummy, totalLikes, favoriteBlog
  }