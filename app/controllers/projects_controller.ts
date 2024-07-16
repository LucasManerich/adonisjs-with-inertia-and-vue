import { createProjectValidator } from '#validators/project_validators'
import type { HttpContext } from '@adonisjs/core/http'
import Project from '#models/project'
import { DateTime } from 'luxon'

export default class ProjectsController {
  async index({ inertia }: HttpContext) {
    const projects = await Project.query()
      .whereNull('deleted_at')
      .orderBy('id', 'desc')
      .preload('tasks')

    const response = projects.map((project) => {
      return {
        id: project.id,
        title: project.title,
        startDate: project.startDate.toFormat('dd/MM/yyyy'),
        endDate: project.endDate.toFormat('dd/MM/yyyy'),
        completedPercentage: project.completedPercentage,
        hasOverdueTasks: project.hasOverdueTasks,
      }
    })

    return inertia.render('projects/index', {
      projectList: response,
    })
  }

  async create({ inertia }: HttpContext) {
    return inertia.render('projects/create')
  }

  async processCreate({ request, response }: HttpContext) {
    const data = request.all()
    const payload = await createProjectValidator.validate(data)

    const project = new Project()
    project.title = payload.title
    project.startDate = DateTime.fromFormat(payload.startDate, 'dd/MM/yyyy')
    project.endDate = DateTime.fromFormat(payload.endDate, 'dd/MM/yyyy')
    await project.save()

    response.redirect().toPath('/project')
  }
}
