import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ValoNationApp from './ValoNationApp.jsx'

// Normalize
import 'normalize.css';

// Importar SASS + Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import './styles/main.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ValoNationApp />
  </StrictMode>,
)
