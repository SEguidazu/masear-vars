import { useEffect, useState } from "react";

import Dialog from "@/components/custom/dialog";
import { ArgetinaMapSVG } from "@/assets/map";

import "./styles.css";

function Map() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [provinces, setProvinces] = useState<NodeListOf<SVGPathElement> | null>(
    null
  );
  const [provinceSelected, setProvinceSelected] = useState<string>("");

  useEffect(() => {
    const provinces = document.querySelectorAll("path");
    setProvinces(provinces);
  }, []);

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

  const handleProvinceClick = (ev: MouseEvent) => {
    setProvinceSelected((ev.target as SVGPathElement).getAttribute("name") || "");
    setOpenDialog(true)
  };

  const closeDialog = () => setOpenDialog(false);

  return (
    <div
      id="map-container"
      className="max-h-screen flex justify-center items-center p-2 border-2 border-black"
    >
      <ArgetinaMapSVG className="w-72 h-full" />
      <Dialog open={openDialog} closeDialog={closeDialog} provinceCode={provinceSelected} />
    </div>
  );
}

export default Map;
