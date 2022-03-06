import React from 'react'
import AddBlogPost from './views/blog/AddBlogPost'
import AddEditUser from './views/users/AddEditUser'
import UserList from './views/users/UserList'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const BlogPosts = React.lazy(() => import('./views/blog/BlogPosts'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/blogposts', name: 'Blog Posts', component: BlogPosts },
  { path: '/addpost', name: 'Add Post', component: AddBlogPost },
  { path: '/editpost', name: 'Edit Post', component: AddBlogPost },
  { path: '/users', name: 'User List', component: UserList },
  { path: '/adduser', name: 'Add user', component: AddEditUser },
  { path: '/edituser', name: 'Add user', component: AddEditUser },
]

export default routes
