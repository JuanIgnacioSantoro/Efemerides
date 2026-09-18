async function verificarFechaEspecial() {
	try {
		// 1. Cargar el archivo JSON
		const respuesta = await fetch("fechas.json");
		const datos = await respuesta.json();

		// 2. Obtener la fecha actual
		const hoy = new Date();

		// Obtener la fecha en formato YYYY-MM-DD
		const ano = hoy.getFullYear();
		const mes = String(hoy.getMonth() + 1).padStart(2, "0");
		const dia = String(hoy.getDate()).padStart(2, "0");
		const fechaFormateada = `${ano}-${mes}-${dia}`;
		const fechaDiaMes = `${mes}-${dia}`;

		// 3. Calcular el día del año (para el día 256, etc.)
		const inicioDeAno = new Date(ano, 0, 0);
		const diferenciaMs = hoy - inicioDeAno;
		const unDiaMs = 1000 * 60 * 60 * 24;
		const diaDelAno = Math.floor(diferenciaMs / unDiaMs);

		// 4. Comparar con el JSON
		let mensaje = null;

		// 5. Tomar Id del elemento al que se le va a colocar el mensaje
		const valor = document.getElementById("valor");
		const fondo = document.getElementById("fondo");

		// 6. Elegir número o de día o una fecha específica
		const evento = datos.dias_del_ano[diaDelAno] || datos.fechas_especificas[fechaDiaMes];

		// 7. Devolver o mostrar el resultado
		if (evento) {
			valor.textContent = evento.mensaje;
			valor.style.color = evento.color;
			fondo.style.backgroundColor = evento.fondo;
			console.log(
				`%c${evento.mensaje}`,
				`color: ${evento.color}; font-weight: bold; font-size: 16px;`,
			);
			return evento;
		} else {
			const NumeroDeDia = `Hoy es el día ${diaDelAno}.`;
			valor.textContent = NumeroDeDia;
			console.log(NumeroDeDia);
			return NumeroDeDia;
		}
	} catch (error) {
		console.error("Error al cargar el JSON:", error);
	}
}

// Ejecutar la función
verificarFechaEspecial();
