const getAllPosts = async (db) => {
  const posts = await db.get_posts()
  return posts 
}


module.exports = {
  getPosts: async (req, res) => {
    //TODO Get all posts
    
    const db = req.app.get('db')
    const posts = await getAllPosts()
    res.status(200).send(posts)
  },


  addPost: async (req, res) => {
    //TODO Create new post
  /*
    TODO - Pull user's id from session
    TODO - Get content from req.body
    TODO - Save the post to the db
    TODO - Send back all posts
  */
    const db = req.app.get('db')
    
    //Pull user id from session
    const { id } = req.session.user

    //Get content from req.body
    const {content} = req.body

    //Save posts to db
    await db.add_post([id, content])

      //Send array of posts
    const posts = await getAllPosts(db)
    res.status(200).send(posts)
  },


  editPost: async (req, res) => {
    //TODO Edit existing post

    /*
    TODO - Get content from req.body
    TODO - Get the post_id from req.params
    TODO - Save the updated post to the db
    TODO - Send back all posts
    */

    const db = req.app.get('db')

    //Get content from body
    const { content } = req.body

    //Get post id from params
    const { post_id } = req.params

    //Save updated post
    await db.edit_post([content, post_id])

    //Send array of posts
    const posts = await getAllPosts(db)
    res.status(200).send(posts)
  },


  deletePost: async (req, res) => {
    //TODO Delete existing post
   
    /*
    TODO get post_id from req.params
    TODO delete post from db
    TODO send back updated posts array
    */

    const db = req.app.get('db')

    //Get post id from params
    const {post_id} = req.params

    //Delete post
    await db.delete_post([post_id])

    //Send back updated array
    const posts = await getAllPosts(db)
    res.status(200).send(posts)


  },


};
