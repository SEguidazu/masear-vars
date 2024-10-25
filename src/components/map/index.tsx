import { useEffect, useState } from "react";
import "./styles.css";

import { ArgetinaMapSVG } from "@/assets/map";
import { getRefineProvince } from "@/lib/utils";

import varsJudicial from "@/data/masear-vars-judicial.json";

function Map() {
  const [provinces, setProvinces] = useState<NodeListOf<SVGPathElement> | null>(
    null
  );

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
    console.log({ evId: ev.target?.id });
    console.log(getRefineProvince(ev.target?.id));
    console.log({ varsJudicial });
    varsJudicial.forEach((province) => {
      console.log(province);
      console.log(Object.entries(province));
    });
  };

  return (
    <div
      id="map-container"
      className="grid grid-cols-2 p-2 border-2 border-black"
    >
      <ArgetinaMapSVG />
      <dialog>
        <h2>Hello world</h2>
        <p>This is a dialog</p>

        {/* <ul>
          <li>Mayoría requerida para ser electo en primera vuelta </li>
          <li>Ballotage</li>
          <li>Elecciones Primarias </li>
          <li>Reelección</li>
          <li>Cantidad de reelecciones permitidas </li>
          <li>Concurrencia con elecciones nacionales </li>
          <li>Doble voto simultáneo y acumulativo (Ley de lemas) </li>
          <li>
            Indice de alternancia (Cantidad de gobernadores/presidentes electos)
          </li>
          <li>Forma de voto</li>
          <li>Tipo de boleta</li>
          <li>Promedio de participación electoral </li>
          <li>Forma de elección de la CSJN</li>
          <li>Cantidad de partidos inscriptos en condiciones de presentarse</li>
          <li>Ficha Limpia</li>
          <li>Cuotas de Género</li>
          <li>Otros Cupos</li>
          <li>Observaciones</li>
          <li>Links/Fuentes</li>
        </ul>

        <ul>
          <li>Sistema legislativo</li>
          <li>Cantidad de distritos</li>
          <li>Magnitud de los distritos - Diputados</li>
          <li>Cantidad de representantes - Diputados</li>
          <li>Forma de recambio - Diputados</li>
          <li>Duración del mandato - Diputados</li>
          <li>Formula electoral - Diputados</li>
          <li>Magnitud de los distritos - Senadores</li>
          <li>Cantidad de representantes - Senadores</li>
          <li>Forma de recambio - Senado</li>
          <li>Duración del mandato - Senadores</li>
          <li>Formula electoral - Senadores</li>
          <li>Concurrencia elecciones provinciales/nacionales</li>
          <li>Umbral de exclusión elecciones generales</li>
          <li>Doble voto simultáneo y acumulativo (Ley de lemas)</li>
          <li>Ficha Limpia</li>
          <li>Cuotas de Género</li>
          <li>Otros Cupos</li>
          <li>Observaciones</li>
          <li>Links/Fuentes</li>
        </ul> */}
      </dialog>
    </div>
  );
}

export default Map;
