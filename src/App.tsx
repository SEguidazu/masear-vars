import { useEffect, useState } from "react";
import { fetchMapData } from "@/data/service";
import MapContext, { ContextProps, initialContext } from "@/data/context";
import Map from "@/components/map";

function App() {
  const [mapData, setMapData] = useState<ContextProps>(initialContext)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchMapData();

      if (response) setMapData(response)
    }

    fetchData();
  }, [])

  return (
    <MapContext.Provider value={mapData}>
      <main>
        <Map />
      </main>
    </MapContext.Provider>
  );
}

export default App;
