interface DialogProps {
  open?: boolean;
  provinceCode?: string;
}

function Dialog({ open, provinceCode }: DialogProps) {
  console.log({ provinceCode });

  return (
    <dialog open={open} className="relative">
      <h1>Reglamentacion de Elecciones Argentina</h1>
      <p>Seleccione que reglamentacion desea consultar</p>

      <span>Provincia: {provinceCode}</span>
    </dialog>
  )
}

export default Dialog;