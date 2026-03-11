## Taskflow Project

Proyecto con **maquetas/experimentos** de una app tipo “to-do”, en diferentes enfoques (HTML/CSS, JS, Tailwind).

### Estructura

- `apps/maqueta-html/`: maqueta solo HTML/CSS (sin lógica).
- `apps/maqueta-js/`: maqueta HTML/CSS + JS (localStorage, buscador, etc.).
- `apps/maqueta-tailwind/`: maqueta con Tailwind (CSS generado en `src/output.css`).
- `docs/`: documentación (IA, notas, etc.).

### Cómo ejecutar

- **Maqueta HTML**
  - Abrir `apps/maqueta-html/index.html` en el navegador.

- **Maqueta JS**
  - Abrir `apps/maqueta-js/index.html` en el navegador.

- **Maqueta Tailwind**
  - Abrir `apps/maqueta-tailwind/index.html` en el navegador.
  - Si quieres **regenerar CSS**:
    - En `apps/maqueta-tailwind/`:
      - `npm install`
      - `npm run build` (una vez) o `npm run dev` (watch)
