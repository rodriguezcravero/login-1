//****************DECLARACION DE VARIABLES****************//
let inputs = document.querySelectorAll('input'); //Los inputs se recorren con un 'forEach' para detectar el evento de cada uno.
let boton = document.getElementById('boton');
let info = document.getElementById('info');
let mail = document.getElementById('mail');
let pass = document.getElementById('pass');
let botonModal = document.querySelector('.cerrar')

//****************DECLARACION DE EVENTOS****************//

window.onload = function(){
	mail.value = '';
	pass.value = ''
};

boton.addEventListener('click', validar);

inputs.forEach(input=> accionInput(input));

botonModal.addEventListener('click', reiniciar);

//****************DECLARACION DE FUNCIONES****************//

//Cada input tiene el evento de focus y blur, que desliza su respectivo ícono.
function accionInput(input){
	input.addEventListener('focus', function(){
		this.previousSibling.previousSibling.classList.add('iconoLeft');
	});
	input.addEventListener('blur', function(){
		this.previousSibling.previousSibling.classList.remove('iconoLeft');
	});
}


function validar(e){

	e.preventDefault();

	//Primero se chequea que no estén vacíos ambos campos.
	if(mail.value == '' && pass.value == ''){
		setInfo('alert-danger', 'Los campos están vacíos');
		boton.disabled = true;
		mail.classList.add('inputWrong');
		pass.classList.add('inputWrong');
	} 
	//Luego se chequea que la dirección de mail sea válida. Código copiado de google.
	else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail.value)){
		boton.disabled = true;
		setInfo('alert-danger', 'No es un correo válido');
	} 
	//Luego se chequea que el campo de password no esté vacío
	else if(pass.value == ''){
		boton.disabled = true;
		setInfo('alert-warning', 'El campo de password está vacío');
		pass.classList.add('inputWrong');
	}
	//Solamente se chequea con una posibilidad correcta.
	//La escalabilidad aquí sería chequear con una base de datos hasta matchear usuario y contraseña.
	else if(mail.value == 'admin@admin.com' && pass.value == 'admin'){
		$('#myModal').modal('show'); //Código de JQUERY copiado de Bootstrap.
	} 
	//Aquí finalizan las validaciones, y si se ingresó un correo y password válidos, pero no son del usuario registrado, se informa.
	else {
		boton.disabled = true;
		setInfo('alert-primary', 'Miembro no registrado')
	}

	//Función que 'limpia' el campo de mensajes después de 2 segundos y medio.
	setTimeout(limpiar, 2500)

};

//Función que recibe qué tipo de color de alerta y qué mensaje se muestra debajo del botón de submit.
function setInfo(alerta, mensaje){
	info.classList.remove('alert-light');
	info.classList.add(alerta);
	info.innerText = mensaje;
}

//Función que limpia las clases de las validaciones. Se escribe un espacio en el div del mensaje, para que no pierda su tamaño.
//Invalido y vuelvo a habilitar el botón, para que no haya superposición de mensajes.
function limpiar(){
	boton.disabled = false;
	info.classList.add('alert-light');
	info.classList.remove('alert-danger');
	info.classList.remove('alert-warning');
	info.classList.remove('alert-primary');
	info.innerHTML = '&nbsp';
	mail.classList.remove('inputWrong');
	pass.classList.remove('inputWrong');
};

//Cuando se ingresa el usuario y pass correctos, se abre un modal. Luego al cerrar el modal, se reinicia la página.
function reiniciar(){
	window.location.reload();
}