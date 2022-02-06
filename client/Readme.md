# Dogger
## Librerias

### React-Toastify

  React-Toastify permite agregar tarjetas para notificaciones con facilidad

#### Instalación

```
npm install --save react-toastify
yarn add react-toastify
```

#### Ejemplo
```javascript
 import React from 'react';

  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  
  function App(){
    const notify = () => toast("Wow so easy!");

    return (
      <div>
        <button onClick={notify}>Notify!</button>
        <ToastContainer />
      </div>
    );
  }
```

#### Documentación

[react-toastify](https://fkhadra.github.io/react-toastify/introduction)