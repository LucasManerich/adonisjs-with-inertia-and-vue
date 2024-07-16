import { createTaskValidator } from '#validators/task_validators'
import type { HttpContext } from '@adonisjs/core/http'
import Project from '#models/project'
import { DateTime } from 'luxon'
import Task from '#models/task'

export default class TasksController {
  async index({ inertia, request }: HttpContext) {
    const projectId = request.param('projectId')
    const project = await Project.findOrFail(projectId)

    const tasks = await Task.query().where('projectId', projectId).orderBy('id', 'desc')

    return inertia.render('tasks/index', {
      projectId: project.id,
      projectTitle: project.title,
      taskList: tasks.map((task) => ({
        id: task.id,
        title: task.title,
        isCompleted: task.isCompleted,
        startDate: task.startDate.toFormat('dd/MM/yyyy'),
        endDate: task.endDate.toFormat('dd/MM/yyyy'),
      })),
    })
  }

  async create({ inertia, request }: HttpContext) {
    const projectId = request.param('projectId')
    const project = await Project.findOrFail(projectId)

    return inertia.render('tasks/create', {
      projectId: project.id,
      projectTitle: project.title,
    })
  }

  async processCreate({ request, response }: HttpContext) {
    const data = request.all()
    const projectId = request.param('projectId')
    const payload = await createTaskValidator.validate(data)

    const task = new Task()
    task.projectId = projectId
    task.isCompleted = false
    task.title = payload.title
    task.startDate = DateTime.fromFormat(payload.startDate, 'dd/MM/yyyy')
    task.endDate = DateTime.fromFormat(payload.endDate, 'dd/MM/yyyy')
    await task.save()

    response.redirect().toPath('/project/' + projectId + '/task')
  }

  async processSetCompleted({ request, response }: HttpContext) {
    const taskId = request.param('taskId')
    const projectId = request.param('projectId')

    const task = await Task.findOrFail(taskId)
    task.isCompleted = true
    await task.save()

    response.redirect().toPath('/project/' + projectId + '/task')
  }
}
