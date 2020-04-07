import React from 'react';
import { Checkbox } from '@material-ui/core';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import ClearIcon from '@material-ui/icons/Clear';
import { deletePost, completePost } from '../redux/actions';

const Item = ({ post, posts }) => {
  const classes = ['item__title', post.done ? 'done' : null];
  const dispatch = useDispatch();
  const handdleDelete = (event) => {
    event.preventDefault();
    const newPosts = posts.filter((item) => {
      return item.id !== post.id;
    });
    dispatch(deletePost(newPosts, post.url));
  };
  const handleDoneChange = () => {
    const newPosts = posts.filter((item) => {
      const toChange = item;
      if (toChange.id === post.id) {
        toChange.done = !toChange.done;
        return toChange;
      }
      return toChange;
    });
    dispatch(completePost(newPosts, post, post.url));
  };
  return (
    <div className="item">
      <Checkbox
        onChange={() => {
          handleDoneChange();
        }}
        id={post.id}
        checked={post.done}
      />
      <p className={classes.join(' ')}>{post.title}</p>
      <button
        type="submit"
        className="clear"
        onKeyDown={(event) => {
          handdleDelete(event);
        }}
        onClick={(event) => {
          handdleDelete(event);
        }}
      >
        <ClearIcon />
      </button>
    </div>
  );
};

const mapDispatchToProps = {
  deletePost,
};
const mapStateToProps = (state) => ({
  posts: state.todo.todo,
});
Item.propTypes = {
  post: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Item);
