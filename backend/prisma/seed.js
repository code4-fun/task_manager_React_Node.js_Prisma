import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

async function seed() {
  await prisma.project.deleteMany()
  await prisma.task.deleteMany()
  await prisma.subtask.deleteMany()
  await prisma.board.deleteMany()
  await prisma.user.deleteMany()
  await prisma.comment.deleteMany()

  const john = await prisma.user.create({ data: { name: "John" } })
  const mike = await prisma.user.create({ data: { name: "Mike" } })

  const proj1 = await prisma.project.create({
    data: {
      name: "Project 1",
      description: "Learn many may means feeling wound county dare discretion sufficient moments herself remainder their. Meet sure made company calling unpleasant dear colonel view resources morning dear weeks world prospect.",
      userId: john.id
    }
  })

  const proj2 = await prisma.project.create({
    data: {
      name: "Project 2",
      description: "Either afraid pleased graceful pretended hastened old account be feebly entreaties brother contented. Two coming civil branched recurred two norland thing match. Admiration greatly five same match square married rendered see parties did engaged as nor possession early.",
      userId: mike.id
    }
  })

  const proj3 = await prisma.project.create({
    data: {
      name: "Project 3",
      description: "Pianoforte or frankness dine sixteen sons months contained court affection way about oh any style above. Pain estimable none goodness visitor discovered vanity kindness begin can advantages. Use my play garden help.",
      userId: mike.id
    }
  })

  const boardQueue = await prisma.board.create({
    data: {
      status: 'Queue',
      order: 1
    }
  })

  const boardDevelopment = await prisma.board.create({
    data: {
      status: 'Development',
      order: 2
    }
  })

  const boardDone = await prisma.board.create({
    data: {
      status: 'Done',
      order: 3
    }
  })

  const task1 = await prisma.task.create({
    data: {
      title: 'Lose venture recommend does all judgment tears hundred. Task 1',
      description: "Description of the task 1. Phasellus varius nisi a nisl interdum, at ultrices ex tincidunt.",
      priority: 'LOW',
      boardId: boardQueue.id,
      projectId: proj2.id,
      order: 1
    }
  })

  const task3 = await prisma.task.create({
    data: {
      title: 'Dearest speedily feet but recurred unable acceptance again Task 3',
      description: "Description of the task 3. Phasellus varius nisi a nisl interdum, at ultrices ex tincidunt.",
      priority: 'MEDIUM',
      boardId: boardQueue.id,
      projectId: proj2.id,
      order: 2
    }
  })

  const task6 = await prisma.task.create({
    data: {
      title: 'Steepest unable letter fail house his unreserved Task 6',
      description: "Description of the task 6. Phasellus varius nisi a nisl interdum, at ultrices ex tincidunt.",
      priority: 'MEDIUM',
      boardId: boardQueue.id,
      projectId: proj2.id,
      order: 3
    }
  })

  const task5 = await prisma.task.create({
    data: {
      title: 'Truth balls improve matter west room walls contained green Task 5',
      description: "Description of the task 5. Phasellus varius nisi a nisl interdum, at ultrices ex tincidunt.",
      completedAt: new Date('2022-12-17 16:12:20+03'),
      priority: 'LOW',
      boardId: boardDone.id,
      projectId: proj2.id,
      order: 1
    }
  })

  const task12 = await prisma.task.create({
    data: {
      title: 'Vanity arose me so endeavor provided present lady household Task 5',
      description: "Description of the task 12. Phasellus varius nisi a nisl interdum, at ultrices ex tincidunt.",
      completedAt: new Date('2022-12-17 16:12:20+03'),
      priority: 'LOW',
      boardId: boardDone.id,
      projectId: proj2.id,
      order: 2
    }
  })

  const task9 = await prisma.task.create({
    data: {
      title: 'Hastily lain afford china said adapted green Task 9',
      description: "Description of the task 9. Phasellus varius nisi a nisl interdum, at ultrices ex tincidunt.",
      priority: 'HIGH',
      boardId: boardDevelopment.id,
      projectId: proj2.id,
      order: 1
    }
  })

  const task10 = await prisma.task.create({
    data: {
      title: 'We praise outlived whole that demesne pain really Task 10',
      description: "Description of the task 10. Phasellus varius nisi a nisl interdum, at ultrices ex tincidunt.",
      priority: 'HIGH',
      boardId: boardDevelopment.id,
      projectId: proj2.id,
      order: 2
    }
  })

  const task11 = await prisma.task.create({
    data: {
      title: 'Northward fine families concern forth snug judgment Task 11',
      description: "Description of the task 11. Phasellus varius nisi a nisl interdum, at ultrices ex tincidunt.",
      priority: 'HIGH',
      boardId: boardDevelopment.id,
      projectId: proj2.id,
      order: 3
    }
  })

  const task2 = await prisma.task.create({
    data: {
      title: 'Way unpleasant square rejoiced roused breakfast extensive Task 2',
      description: "Description of the task 2. Phasellus varius nisi a nisl interdum, at ultrices ex tincidunt.",
      priority: 'MEDIUM',
      boardId: boardDevelopment.id,
      projectId: proj1.id,
      order: 1
    }
  })

  const task7 = await prisma.task.create({
    data: {
      title: 'True sigh stronger instantly surrounded adieus Task 7',
      description: "Description of the task 7. Phasellus varius nisi a nisl interdum, at ultrices ex tincidunt.",
      completedAt: new Date('2022-12-14 16:12:20+03'),
      priority: 'LOW',
      boardId: boardDone.id,
      projectId: proj1.id,
      order: 1
    }
  })

  const task4 = await prisma.task.create({
    data: {
      title: 'Diverted plan play dissimilar conviction china Task 4',
      description: "Description of the task 4. Phasellus varius nisi a nisl interdum, at ultrices ex tincidunt.",
      priority: 'HIGH',
      boardId: boardDevelopment.id,
      projectId: proj3.id,
      order: 1
    }
  })

  const task8 = await prisma.task.create({
    data: {
      title: 'Now alteration neat play age her wrote lain Task 8',
      description: "Description of the task 8. Phasellus varius nisi a nisl interdum, at ultrices ex tincidunt.",
      priority: 'MEDIUM',
      boardId: boardDevelopment.id,
      projectId: proj3.id,
      order: 2
    }
  })

  const subtask1 = await prisma.subtask.create({
    data: {
      description: "Content of subtask 1 of task 1",
      completed: true,
      taskId: task1.id
    }
  })

  const subtask2 = await prisma.subtask.create({
    data: {
      description: "Content of subtask 2 of task 1",
      completed: true,
      taskId: task1.id
    }
  })

  const subtask3 = await prisma.subtask.create({
    data: {
      description: "Content of subtask 3 of task 1",
      completed: false,
      taskId: task1.id
    }
  })

  const subtask4 = await prisma.subtask.create({
    data: {
      description: "Content of subtask 1 of task 2",
      completed: false,
      taskId: task2.id
    }
  })

  const comment1 = await prisma.comment.create({
    data: {
      message: "Comment 1 of task 1",
      userId: john.id,
      taskId: task1.id
    },
  })

  const comment2 = await prisma.comment.create({
    data: {
      message: "Comment 1 of comment 1",
      userId: mike.id,
      taskId: task1.id,
      parentId: comment1.id
    },
  })

  const comment3 = await prisma.comment.create({
    data: {
      message: "Comment 2 of task 1",
      userId: mike.id,
      taskId: task1.id
    },
  })
}

async function seedDelete() {
  await prisma.file.deleteMany()
  await prisma.subtask.deleteMany()
  await prisma.comment.deleteMany()
  await prisma.task.deleteMany()
  await prisma.board.deleteMany()
  await prisma.project.deleteMany()
  await prisma.user.deleteMany()
}

seedDelete()
seed()
