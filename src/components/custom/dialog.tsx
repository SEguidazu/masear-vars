import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import { X, ArrowLeft } from "lucide-react";

interface DialogProps {
  open: boolean;
  closeDialog: () => void;
  provinceCode: string;
  legislativo: { [key: string]: string | number };
  ejecutivo: { [key: string]: string | number };
}

function Dialog({
  open,
  closeDialog,
  provinceCode,
  legislativo,
  ejecutivo,
}: DialogProps) {
  const [optionSelected, setOptionSelected] = useState<
    "legislativo" | "ejecutivo" | null
  >(null);

  const RenderList = useCallback(
    ({ item }: { item: { [key: string]: string | number } }) => {
      if (item.Provincia) delete item.Provincia;

      return (
        <ul className="max-h-80 h-full w-full inline-flex flex-col text-wrap overflow-y-scroll border-t border-gray-500 pt-3">
          {Object.entries(item).map(
            ([key, value], index) =>
              !!value && (
                <li key={index} className="max-w-full w-full">
                  <span className="text-base text-gray-500 font-bold italic block uppercase">
                    {key?.toString()}
                  </span>
                  <span className="text-base text-gray-500 block mb-3 break-all">
                    {value?.toString()}
                  </span>
                </li>
              )
          )}
        </ul>
      );
    },
    []
  );

  useEffect(() => {
    if (provinceCode && provinceCode.length > 0) closeDialog();

    return () => {
      closeDialog();
      setOptionSelected(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setOptionSelected(null);
  }, [provinceCode]);

  return (
    open && (
      <dialog
        open={open}
        className="absolute z-20 max-w-lg w-full top-16 bottom-16 flex flex-col my-auto p-6 border-2 border-first rounded-md  text-black bg-white shadow-xl"
      >
        <div className="absolute top-2 right-2 inline-flex gap-2">
          {optionSelected && (
            <button
              onClick={() => setOptionSelected(null)}
              aria-label="Volver"
              className="rounded-full border-first border-2 p-1 hover:bg-first hover:text-white transition-colors duration-200"
              title="Volver"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <button
            onClick={() => {
              console.log("Cerrando dialogo");
              closeDialog();
            }}
            aria-label="Cerrar dialogo"
            className="rounded-full border-first border-2 p-1  hover:bg-first hover:text-white transition-colors duration-200"
            title="Cerrar dialogo"
          >
            <X size={20} />
          </button>
        </div>

        <h2 className="font-[Raleway] font-bold md:text-xl text-lg text-gray-500 md:mt-2 mt-4 mb-1">
          REGLAS ELECTORALES
        </h2>
        <p className="font-[Raleway] font-extrabold md:text-4xl/[0.9] text-3xl/[0.9] tracking-wide text-second uppercase mb-4">
          {provinceCode}
        </p>

        {optionSelected && (
          <RenderList
            item={optionSelected === "legislativo" ? legislativo : ejecutivo}
          />
        )}

        {!optionSelected && (
          <div className="flex flex-wrap items-center justify-center md:gap-8 gap-3 px-4">
            <Button
              className="flex flex-col w-48 h-auto p-2 rounded-md border-2 border-gray-500 hover:shadow-md hover:shadow-gray-300"
              variant="outline"
              onClick={() => setOptionSelected("legislativo")}
            >
              <img
                src="/congreso.png"
                alt=""
                className="md:w-20 w-16 md:h-20 h-16"
              />
              <span className="font-[Raleway] font-bold md:text-xl/[1.2] text-lg/[1] text-gray-500 mt-1">
                PODER <br /> LEGISLATIVO
              </span>
            </Button>
            <Button
              className="flex flex-col w-48 h-auto p-2 rounded-md border-2 border-gray-500 hover:shadow-md hover:shadow-gray-300"
              variant="outline"
              onClick={() => setOptionSelected("ejecutivo")}
            >
              <img
                src="/casa-rosada.png"
                alt=""
                className="md:w-20 w-16 md:h-20 h-16"
              />
              <span className="font-[Raleway] font-bold md:text-xl/[1.2] text-lg/[1] text-gray-500 mt-1">
                PODER <br /> EJECUTIVO
              </span>
            </Button>
          </div>
        )}
      </dialog>
    )
  );
}

export default Dialog;
