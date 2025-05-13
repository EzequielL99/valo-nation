import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ValoNationApp from './ValoNationApp.jsx'

// Importar Bootstrap
import './styles/custom.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ValoNationApp />
  </StrictMode>,
)
