export default {
  SET_POST(state, { post }) {
    state.postIds.push(post.id)
    state.posts = { ...state.posts, [post.id]: post }
    // equivalent to expression below
    // state.posts = Object.assign( {}, state.posts, {[post.id]: post})
  }
}
