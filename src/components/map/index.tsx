import { useContext, useEffect, useMemo, useState } from "react";
import MapContext from "@/data/context";

import Dialog from "@/components/custom/dialog";
import { ArgetinaMapSVG } from "@/assets/map";

import { cn } from "@/lib/utils";

import "./styles.css";

function Map() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [provinces, setProvinces] = useState<NodeListOf<SVGPathElement> | null>(
    null
  );
  const [provinceSelected, setProvinceSelected] = useState<string>("");
  const { legislativo, ejecutivo, isLoading } = useContext(MapContext);

  useEffect(() => {
    if (!isLoading) {
      const paths = document.querySelectorAll("path");

      if (paths.length > 0) {
        const cleanProvinces = Array.from(paths).filter(
          (path) => path.id.length > 0 && !path.id.includes("_no_def")
        );

        setProvinces(Object(cleanProvinces));
      }
    }
  }, [isLoading]);

  useEffect(() => {
    if (provinces) {
      provinces.forEach((province) => {
        province.addEventListener("click", handleProvinceClick);
      });
    }

    return () => {
      provinces?.forEach((province) => {
        province.removeEventListener("click", handleProvinceClick);
      });
    };
  }, [provinces]);

  const getLegislativo = useMemo(() => {
    return legislativo.find((item) => item.Provincia === provinceSelected);
  }, [legislativo, provinceSelected]);

  const getEjecutivo = useMemo(() => {
    return ejecutivo.find((item) => item.Provincia === provinceSelected);
  }, [ejecutivo, provinceSelected]);

  const handleProvinceClick = (ev: MouseEvent) => {
    setProvinceSelected(
      (ev.target as SVGPathElement).getAttribute("name") || ""
    );
    setOpenDialog(true);
  };

  const handleButtonClick = (ev: React.MouseEvent<HTMLButtonElement>) => {
    const target = ev.target as HTMLButtonElement;
    const province = target.getAttribute("name") || "";
    if (province === "Argentina") {
      setProvinceSelected(province);
      setOpenDialog(true);
    } else {
      setProvinceSelected("");
      closeDialog();
    }
  };

  const closeDialog = () => {
    setOpenDialog(false);
    setProvinceSelected("");
  };

  if (isLoading)
    return <div className="text-center animate-pulse">Cargando...</div>;

  return (
    <div
      id="map-container"
      className="max-h-screen grid md:grid-cols-2 grid-rows-1 gap-x-2 justify-items-center p-2 border-2 border-black relative"
    >
      <div className="col-start-1 row-start-1 w-full flex flex-col items-center justify-center relative z-10">
        <div className="inline-flex items-center mb-4">
          <button
            className={cn(
              "text-first font-bold text-lg py-1 px-6 border-2 border-third rounded-s-full hover:bg-third transition-colors duration-200",
              provinceSelected === "Argentina" && "bg-third"
            )}
            onClick={handleButtonClick}
            name="Argentina"
          >
            NACI&Oacute;N
          </button>
          <button
            className={cn(
              "text-first font-bold text-lg py-1 px-6 border-2 border-third border-s-0 rounded-e-full hover:bg-third transition-colors duration-200",
              provinceSelected !== "Argentina" && "bg-third"
            )}
            onClick={handleButtonClick}
            name="Provincia"
          >
            PROVINCIAS
          </button>
        </div>
        <ArgetinaMapSVG className="w-72 h-full" />
      </div>
      <div className="col-start-1 md:col-start-2 row-start-1 w-full h-full flex flex-col md:items-center items-end md:justify-center justify-end relative">
        <p className="max-w-sm inline-flex flex-col items-start font-[Raleway] font-extrabold md:text-[12rem]/[0.9] text-[4rem]/[0.9] tracking-wide antialiased opacity-50">
          <span className="text-third">MA</span>
          <span className="text-second">SE</span>
          <span className="text-first">AR</span>
        </p>
        <Dialog
          open={openDialog}
          closeDialog={closeDialog}
          provinceCode={provinceSelected}
          legislativo={getLegislativo || {}}
          ejecutivo={getEjecutivo || {}}
        />
      </div>
    </div>
  );
}

export default Map;
