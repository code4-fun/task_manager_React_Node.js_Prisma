import fastify from 'fastify'
import sensible from '@fastify/sensible'
import cors from '@fastify/cors'
import cookie from '@fastify/cookie'
import 'dotenv'
import {PrismaClient} from '@prisma/client'

const app = fastify()
app.register(sensible)
app.register(cookie, {secret: process.env.COOKIE_SECRET})
app.register(cors, {
  origin: true,
  credentials: true
})
app.addHook("onRequest", (req, res, done) => {
  if (req.cookies.userId !== CURRENT_USER_ID) {
    req.cookies.userId = CURRENT_USER_ID
    res.clearCookie("userId")
    res.setCookie("userId", CURRENT_USER_ID)
  }
  done()
})
const prisma = new PrismaClient()

const CURRENT_USER_ID = (
  await prisma.user.findFirst({
    where: {
      name: "Mike"
    }
  })
).id

app.get('/projects', async (req, res) => {
  return await commitToDb(
    prisma.project.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        user: {
          select: {
            id: true
          }
        }
      }
    })
  )
})

app.post('/projects', async (req, res) => {
  if (req.body.name === "" || req.body.name == null) {
    return res.send(app.httpErrors.badRequest("Project name is required"))
  }

  return await commitToDb(
    prisma.project.create({
      data: {
        name: req.body.name,
        description: req.body.description,
        userId: req.cookies.userId
      },
      select: {
        id: true,
        name: true,
        description: true,
        user: {
          select: {
            id: true
          }
        }
      }
    })
  )
})

app.delete('/projects/:projectId', async (req, res) => {
  const {userId} = await prisma.project.findUnique({
    where: {
      id: req.params.projectId
    },
    select: {
      userId: true
    }
  })

  if(userId !== req.cookies.userId){
    return res.send(
      app.httpErrors.unauthorized('You do not have permission to delete this message')
    )
  }

  return await commitToDb(
    prisma.project.delete({
      where: {
        id: req.params.projectId
      },
      select: {
        id: true
      }
    })
  )
})

app.put('/projects/:projectId', async (req, res) => {
  if(req.body.name === '' || req.body.name == null){
    return res.send(app.httpErrors.badRequest('Project name is required'))
  }

  const {userId} = await prisma.project.findUnique({
    where: {
      id: req.params.projectId
    },
    select : {
      userId: true
    }
  })
  if(userId !== req.cookies.userId){
    return res.send(app.httpErrors.unauthorized('You do not have permission to edit this project'))
  }

  return await commitToDb(
    prisma.project.update({
      where: {
        id: req.params.projectId
      },
      data: {
        name: req.body.name,
        description: req.body.description
      },
      select: {
        id: true,
        name: true,
        description: true,
        user: {
          select: {
            id: true
          }
        }
      }
    })
  )
})

app.get('/boards/:projectId', async (req, res) => {
  return await commitToDb(
    prisma.board.findMany({
      select: {
        id: true,
        status: true,
        order: true,
        tasks: {
          where: {
            projectId: req.params.projectId
          },
          select: {
            id: true,
            number: true,
            order: true,
            title: true,
            createdAt: true,
            priority: true,
          }
        }
      }
    })
  )
})

const TASK_SELECT_FIELDS = {
  id: true,
  number: true,
  title: true,
  description: true,
  createdAt: true,
  completedAt: true,
  priority: true,
  order: true,
  board: {
    select: {
      id: true,
      status: true
    }
  },
  subtasks: {
    select: {
      id: true,
      description: true,
      completed: true
    }
  },
  files: {
    select: {
      id: true,
      name: true
    }
  }
}

app.get('/tasks/:taskId', async (req, res) => {
  return await commitToDb(
    prisma.task.findUnique({
      where: {
        id: req.params.taskId
      },
      select: TASK_SELECT_FIELDS
    })
  )
})

app.post("/tasks", async (req, res) => {
  if (req.body.title === "" || req.body.title == null) {
    return res.send(app.httpErrors.badRequest("Title is required"))
  }

  const board = await prisma.board.findMany({
    where: {
      status: req.body.board
    },
    select: {
      id: true
    }
  })

  return await commitToDb(
    prisma.task.create({
      data: {
        title: req.body.title,
        description: req.body.description,
        completedAt: req.body.date,
        priority: req.body.priority,
        boardId: board[0].id,
        order: req.body.order,
        projectId: req.body.projectId
      },
      select: {
        id: true,
        number: true,
        title: true,
        description: true,
        boardId: true,
        order: true,
        priority: true
      }
    })
  )
})

app.delete('/tasks/:taskId', async (req, res) => {
  return await commitToDb(
    prisma.task.delete({
      where: {
        id: req.params.taskId
      },
      select: {
        id: true
      }
    })
  )
})

app.put('/tasks/:taskId', async (req, res) => {
  return await commitToDb(
    prisma.task.update({
      where: {
        id: req.params.taskId
      },
      data: {
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,
        completedAt: req.body.completedAt,
        boardId: req.body.boardId,
        order: req.body.order,
      },
      select: TASK_SELECT_FIELDS
    })
  )
})

app.get('/tasks/:taskId/comments', async (req, res) => {
  return await commitToDb(
    prisma.comment.findMany({
      where: {
        taskId: req.params.taskId
      },
      select: {
        id: true,
        message: true,
        parentId: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            name: true,
          }
        }
      }
    })
  )
})

app.post("/tasks/:taskId/comments", async (req, res) => {
  if (req.body.message === "" || req.body.message == null) {
    return res.send(app.httpErrors.badRequest("Message is required"))
  }

  return await commitToDb(
    prisma.comment.create({
      data: {
        message: req.body.message,
        userId: req.cookies.userId,
        parentId: req.body.parentId,
        taskId: req.params.taskId,
      },
      select: {
        id: true,
        message: true,
        parentId: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            name: true,
          }
        }
      }
    })
  )
})

app.put("/tasks/:taskId/comments/:commentId", async (req, res) => {
  if (req.body.message === "" || req.body.message == null) {
    return res.send(app.httpErrors.badRequest("Message is required"))
  }

  const {userId} = await prisma.comment.findUnique({
    where: { id: req.params.commentId },
    select: { userId: true }
  })

  if (userId !== req.cookies.userId) {
    return res.send(
      app.httpErrors.unauthorized(
        "You do not have permission to edit this message"
      )
    )
  }

  return await commitToDb(
    prisma.comment.update({
      where: { id: req.params.commentId },
      data: { message: req.body.message },
      select: {
        id: true,
        message: true
      }
    })
  )
})

app.delete("/tasks/:taskId/comments/:commentId", async (req, res) => {
  const {userId} = await prisma.comment.findUnique({
    where: { id: req.params.commentId },
    select: { userId: true },
  })

  if (userId !== req.cookies.userId) {
    return res.send(
      app.httpErrors.unauthorized(
        "You do not have permission to delete this message"
      )
    )
  }

  return await commitToDb(
    prisma.comment.delete({
      where: { id: req.params.commentId },
      select: { id: true }
    })
  )
})

async function commitToDb(promise){
  const [error, data] = await app.to(promise)
  if (error) return app.httpErrors.internalServerError(error.message)
  return data
}

app.listen({port: process.env.PORT})