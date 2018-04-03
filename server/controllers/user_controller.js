'use strict'

const { User } = require('../models')

const postUsers = (req, res, next) => {
  const props = req.body.user

  User.create(props)
    .then(userId => User.findById(userId))
    .then(user => res.json({
      ok: true,
      message: 'User created',
      user
    }))
    .catch(next)
}

const getUsers = (req, res, next) => {
  User.findAll()
    .then(users => res.json({
      ok: true,
      message: 'Users found',
      users
    }))
    .catch(next)
}

const getUser = (req, res, next) => {
  const userId = req.params.id

  User.findById(userId)
    .then(user => res.json({
      ok: true,
      message: 'User found',
      user
    }))
    .catch(next)
}

const putUser = (req, res, next) => {
  const userId = req.params.id
  const props = req.body.user

  User.update(userId, props)
    .then(updateCount => Promise.all([
      updateCount,
      User.findById(userId)
    ])
    .then(([updateCount, user]) => res.json({
      ok: true,
      message: 'User updated',
      user,
      updateCount
    }))
    .catch(next)
}

const deleteUser = (req, res, next) => {
  const userId = req.params.id

  User.destroy(userId)
    .then(deleteCount => res.json({
      ok: true,
      message: 'User deleted',
      deleteCount
    }))
    .catch(next)
}

module.exports = {
  postUsers,
  getUsers,
  getUser,
  putUser,
  deleteUser
}
