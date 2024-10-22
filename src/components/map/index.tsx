import { useEffect, useRef, useState } from "react";
import { ArgetinaMapSVG } from "@/assets/map";
import './styles.css'
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
    <div id="container">
      <ArgetinaMapSVG />
    </div>
  );
}

export default Map;