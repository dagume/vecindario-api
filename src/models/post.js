import Sequelize from 'sequelize';
import { sequelize } from '../Database/mysql';

const Post = sequelize.define('posts', {
   
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  parent_id: {
    type: Sequelize.INTEGER,
  },
  name: {
    type: Sequelize.STRING,
  },
  content: {
    type: Sequelize.STRING,
  },
  owner_email: {
    type: Sequelize.STRING,
  },
  comment_counter: {
    type: Sequelize.INTEGER,
  },
  like_counter: {
    type: Sequelize.INTEGER,
  },
  dislike_counter: {
    type: Sequelize.INTEGER,
  }
}, {
    timestamps:true
});

export default Post;