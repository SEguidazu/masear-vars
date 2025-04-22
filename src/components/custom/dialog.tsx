import { useCallback, useEffect, useState, useContext } from "react";
import MapContext from "@/data/context";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { X } from "lucide-react";

interface DialogProps {
  open: boolean;
  closeDialog: () => void;
  provinceCode: string;
}

type SelectedRule = [string, string | number | undefined][];

function Dialog({ open, closeDialog, provinceCode }: DialogProps) {
  const { legislativo, ejecutivo } = useContext(MapContext);
  const [selectedRule, setSelectedRule] = useState<string | null>(null);
  const [ruleData, setRuleData] = useState<SelectedRule | null>(null);

  useEffect(() => {
    console.log({ provinceCode })
    if (provinceCode && provinceCode.length > 0) {
      setSelectedRule(null)
      setRuleData(null)
    }
  }, [provinceCode])

  const RenderList = useCallback(({ item }: { item: { [key: string]: string | number } }) => {
    console.log({ item })
    if (item.Provincia) delete item.Provincia;

    return (
      <ul className="max-h-80 inline-flex flex-col flex-wrap">
        {Object.entries(item).map(([key, value], index) => (
          <li key={index}>
            <strong>{key?.toString()}:</strong> {value?.toString()}
          </li>
        ))}
      </ul>
    );
  }, []);

  const LegislativoAccordion = useCallback(() => {
    const item = legislativo.find(c => c.Provincia === provinceCode);

    return item && (
      <Accordion type="single" collapsible>
        <AccordionItem value="legislativo-item-1">
          <AccordionTrigger>Sistema Legislativo</AccordionTrigger>
          <AccordionContent>
            <RenderList item={item} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }, [RenderList, legislativo, provinceCode])

  return (
    <dialog open={open} className="sm:max-w-[768px] max-w-[425px] w-full absolute p-2 border-2 border-first rounded-md text-black bg-white">
      <button onClick={closeDialog} aria-label="Cerrar dialogo" className="rounded-full border-first border p-1 float-right">
        <X size={20} />
      </button>

      <h2 className="text-base mt-2 mb-1">Reglamentacion de Elecciones Argentina</h2>

      <LegislativoAccordion />

      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </dialog>
  )
}

export default Dialog;