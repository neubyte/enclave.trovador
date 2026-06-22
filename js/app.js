const rutas = {
  artistas: "data/artistas.json",
  agenda: "data/agenda.json"
};

const meses = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

document.addEventListener("DOMContentLoaded", () => {
  iniciarMenu();
  iniciarArtistas();
  iniciarAgenda();
});

function iniciarMenu() {
  const boton = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");

  if (!boton || !menu) return;

  boton.addEventListener("click", () => {
    const abierto = menu.classList.toggle("abierto");
    boton.setAttribute("aria-expanded", String(abierto));
  });
}

async function cargarJson(ruta) {
  const respuesta = await fetch(ruta);
  if (!respuesta.ok) {
    throw new Error(`No se pudo cargar ${ruta}`);
  }
  return respuesta.json();
}

async function iniciarArtistas() {
  const contenedor = document.querySelector("#artistas-lista");
  if (!contenedor) return;

  const disciplinaSelect = document.querySelector("#filtro-disciplina");
  const localidadSelect = document.querySelector("#filtro-localidad");
  const limpiar = document.querySelector("#limpiar-filtros");

  try {
    const artistas = await cargarJson(rutas.artistas);
    completarOpciones(disciplinaSelect, artistas.map((artista) => artista.disciplina));
    completarOpciones(localidadSelect, artistas.map((artista) => artista.localidad));

    const actualizar = () => {
      const disciplina = disciplinaSelect.value;
      const localidad = localidadSelect.value;
      const filtrados = artistas.filter((artista) => {
        const coincideDisciplina = !disciplina || artista.disciplina === disciplina;
        const coincideLocalidad = !localidad || artista.localidad === localidad;
        return coincideDisciplina && coincideLocalidad;
      });
      renderizarArtistas(contenedor, filtrados);
    };

    disciplinaSelect.addEventListener("change", actualizar);
    localidadSelect.addEventListener("change", actualizar);
    limpiar.addEventListener("click", () => {
      disciplinaSelect.value = "";
      localidadSelect.value = "";
      actualizar();
    });

    actualizar();
  } catch (error) {
    contenedor.innerHTML = `<p class="estado-vacio">${error.message}</p>`;
  }
}

function completarOpciones(select, valores) {
  if (!select) return;

  [...new Set(valores)].sort().forEach((valor) => {
    const opcion = document.createElement("option");
    opcion.value = valor;
    opcion.textContent = valor;
    select.appendChild(opcion);
  });
}

function renderizarArtistas(contenedor, artistas) {
  if (!artistas.length) {
    contenedor.innerHTML = '<p class="estado-vacio">No hay artistas para esos filtros.</p>';
    return;
  }

  contenedor.innerHTML = artistas.map((artista) => `
    <article class="tarjeta-artista">
      <div class="tarjeta-inicial" aria-hidden="true">${iniciales(artista.nombre)}</div>
      <div>
        <p class="tarjeta-meta">${artista.disciplina} - ${artista.localidad}</p>
        <h2>${artista.nombre}</h2>
      </div>
      <p>${artista.bio}</p>
      <div class="tarjeta-tags">
        ${artista.etiquetas.map((etiqueta) => `<span class="tag">${etiqueta}</span>`).join("")}
      </div>
    </article>
  `).join("");
}

function iniciales(nombre) {
  return nombre
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join("")
    .toUpperCase();
}

async function iniciarAgenda() {
  const contenedor = document.querySelector("#agenda-lista");
  if (!contenedor) return;

  try {
    const eventos = await cargarJson(rutas.agenda);
    const ordenados = [...eventos].sort((a, b) => a.fecha.localeCompare(b.fecha));
    renderizarAgenda(contenedor, ordenados);
  } catch (error) {
    contenedor.innerHTML = `<p class="estado-vacio">${error.message}</p>`;
  }
}

function renderizarAgenda(contenedor, eventos) {
  contenedor.innerHTML = eventos.map((evento) => {
    const fecha = new Date(`${evento.fecha}T12:00:00`);
    return `
      <article class="evento">
        <div class="evento-fecha">
          <span class="evento-dia">${fecha.getDate()}</span>
          <span class="evento-mes">${meses[fecha.getMonth()]}</span>
        </div>
        <div>
          <p class="tarjeta-meta">${evento.localidad} - ${evento.espacio}</p>
          <h2>${evento.titulo}</h2>
          <p>${evento.descripcion}</p>
        </div>
      </article>
    `;
  }).join("");
}
