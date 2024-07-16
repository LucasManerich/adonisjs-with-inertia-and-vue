import router from '@adonisjs/core/services/router'
const ProjectsController = () => import('#controllers/projects_controller')
const TasksController = () => import('#controllers/tasks_controller')

router.on('/').redirectToPath('/project')
router.get('/project', [ProjectsController, 'index'])
router.get('/project/create', [ProjectsController, 'create'])
router.post('/project/create', [ProjectsController, 'processCreate'])

router.get('/project/:projectId/task', [TasksController, 'index'])
router.get('/project/:projectId/task/create', [TasksController, 'create'])
router.post('/project/:projectId/task/create', [TasksController, 'processCreate'])

router.post('/project/:projectId/task/:taskId/set-completed', [
  TasksController,
  'processSetCompleted',
])
