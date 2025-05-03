import { useCallback, useEffect } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { X } from "lucide-react";

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
  const RenderList = useCallback(
    ({ item }: { item: { [key: string]: string | number } }) => {
      if (item.Provincia) delete item.Provincia;

      return (
        <ul className="max-h-80 h-full w-full inline-flex flex-col text-wrap  overflow-y-scroll">
          {Object.entries(item).map(
            ([key, value], index) =>
              !!value && (
                <li key={index} className="max-w-full w-full">
                  <span className="text-base font-bold block mb-1">
                    {key?.toString()}
                  </span>
                  <span className="block mb-3 italic break-all">
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

  const LegislativoAccordion = useCallback(() => {
    return (
      legislativo && (
        <AccordionItem className="max-w-full" value="legislativo-item">
          <AccordionTrigger className="text-base">
            Sistema Legislativo
          </AccordionTrigger>
          <AccordionContent>
            <RenderList item={legislativo} />
          </AccordionContent>
        </AccordionItem>
      )
    );
  }, [RenderList, legislativo]);

  const EjecutivoAccordion = useCallback(() => {
    return (
      ejecutivo && (
        <AccordionItem className="max-w-full border-b-0" value="ejecutivo-item">
          <AccordionTrigger className="text-base">
            Sistema Ejecutivo
          </AccordionTrigger>
          <AccordionContent>
            <RenderList item={ejecutivo} />
          </AccordionContent>
        </AccordionItem>
      )
    );
  }, [RenderList, ejecutivo]);

  useEffect(() => {
    if (provinceCode && provinceCode.length > 0) closeDialog();

    return () => {
      closeDialog();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <dialog
      open={open}
      className="max-w-lg w-full p-6 border-2 border-first rounded-md text-black bg-white shadow-xl"
    >
      <button
        onClick={closeDialog}
        aria-label="Cerrar dialogo"
        className="rounded-full border-first border p-1 absolute top-2 right-2 hover:bg-first hover:text-white transition-colors duration-200"
        title="Cerrar dialogo"
      >
        <X size={20} />
      </button>

      <h2 className="font-[Raleway] font-bold text-xl text-gray-500 mt-2 mb-1">
        REGLAS ELECTORALES
      </h2>
      <p className="font-[Raleway] font-extrabold text-4xl/[0.9] tracking-wide text-second uppercase mb-4">
        {provinceCode}
      </p>

      <Accordion type="single" collapsible>
        <LegislativoAccordion />

        <EjecutivoAccordion />
      </Accordion>
    </dialog>
  );
}

export default Dialog;
