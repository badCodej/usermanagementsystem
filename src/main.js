import 'styles/bootstrap-grid.scss'
import 'styles/style.scss'
import 'styles/helpers.scss'

import Observer from 'observer'
import Router from './router'
import Layout from './components/layout'
import { Modal } from 'components'
import Initialize from './config/initialize'

Initialize()
new Observer()
new Layout()
new Router()
new Modal()

