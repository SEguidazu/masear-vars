import { useContext, useEffect, useMemo, useState } from "react";
import MapContext from "@/data/context";

import Dialog from "@/components/custom/dialog";
import { ArgetinaMapSVG } from "@/assets/map";

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

  const closeDialog = () => setOpenDialog(false);

  if (isLoading)
    return <div className="text-center animate-pulse">Cargando...</div>;

  return (
    <div
      id="map-container"
      className="max-h-screen grid grid-cols-2 grid-rows-1 gap-x-2 justify-items-center p-2 border-2 border-black"
    >
      <ArgetinaMapSVG className="w-72 h-full" />
      <Dialog
        open={openDialog}
        closeDialog={closeDialog}
        provinceCode={provinceSelected}
        legislativo={getLegislativo || {}}
        ejecutivo={getEjecutivo || {}}
      />
    </div>
  );
}

export default Map;
