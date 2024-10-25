import { useEffect, useState } from "react";
import './styles.css'

import { ArgetinaMapSVG } from "@/assets/map";
import { getRefineProvince } from "@/lib/utils";

function Map() {
  const [provinces, setProvinces] = useState<NodeListOf<SVGPathElement> | null>(null);

  useEffect(() => {
    const provinces = document.querySelectorAll("path");
    setProvinces(provinces);
  }, [])

  useEffect(() => {
    if (provinces) {
      provinces.forEach((province) => {
        province.addEventListener('click', handleProvinceClick);
      });
    }

    return () => {
      provinces?.forEach((province) => {
        province.removeEventListener('click', handleProvinceClick);
      });
    }
  }, [provinces])

  const handleProvinceClick = (ev: MouseEvent) => {
    console.log({ evId: ev.target?.id });
    console.log(getRefineProvince(ev.target?.id));
  }

  return (
    <div id="map-container" className="p-2 border-2 border-black">
      <ArgetinaMapSVG />
    </div>
  );
}

export default Map;