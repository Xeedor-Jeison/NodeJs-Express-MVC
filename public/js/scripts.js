const formulario = document.getElementById('agregar-url');
const mensaje = document.createElement('div');
mensaje.classList.add('mensaje-url');

formulario.addEventListener('submit', async e => {
  e.preventDefault();

  const urlOriginal =document.getElementById('urlOriginal').value;

  const respuesta = await fetch(e.target.action, {
    method: e.target.method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ urlOriginal }) 
  });
  const resultado = await respuesta.json();

  // Verificar si todo esta bien
  if(resultado.codigo == 201){
    mensaje.innerHTML = `<p>Se ha acortado correctamente la URL,vísita <a target="_blank" rel="noopener noreferrer" href=/${resultado.url}>EL ENLACE AQUI</a> </p>`

    const contenedor = document.querySelector('main');
    contenedor.appendChild(mensaje);
  }else{
    //construir mensaje de error
    mensaje.classList.add('error');
    mensaje.innerHTML = `<p>${resultado.error}</p>`
    const contenedor = document.querySelector('main');
    contenedor.appendChild(mensaje);
  }
})

// Si hay un error en el querystring
const urlParams = new  URLSearchParams(window.location.search);

if(urlParams.has('error')){
  mensaje.classList.add('error');
  mensaje.innerHTML = `<p>URL no valida</p>`
  
  const contenedor = document.querySelector('main');
  contenedor.appendChild(mensaje);
}