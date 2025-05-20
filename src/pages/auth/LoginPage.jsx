import { UserIcon, KeyIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

export default function LoginPage() {
  return (
    <form action="#" className='form-login'>
      <div className="border border-light-subtle rounded-pill d-flex align-items-center py-2 mb-4">
        <label htmlFor="inputUsuario" className='ps-3 pe-2 d-flex justify-content-center align-items-center'>
            <UserIcon className='icon'/>
        </label>
        <input
          type="text"
          name='usuario'
          id='inputUsuario'
          className="d-block text-light bg-transparent border-0 flex-grow-1"
          placeholder="Usuario"
          aria-label="Usuario"
          aria-describedby="visible-addon"
          aria-required
          autoComplete='off'
          required
        />
      </div>

      <div className="border border-light-subtle rounded-pill d-flex align-items-center py-2 mb-4">
        <label htmlFor="inputPassword" className='ps-3 pe-2 d-flex justify-content-center align-items-center'>
            <KeyIcon className='icon'/>
        </label>
        <input
          type="password"
          name='password'
          id='inputPassword'
          className="d-block text-light bg-transparent border-0 flex-grow-1"
          placeholder="Contraseña"
          aria-label="Contraseña"
          aria-describedby="visible-addon"
          aria-required
          required
        />
      </div>

      <input type="submit" value='Ingresar' className='text-uppercase btn btn-lg btn-primary w-100 mb-3' />

      <Link to='/' className='text-white-50 text-decoration-none'>NO TENGO CUENTA</Link>
    </form>
  );
}
