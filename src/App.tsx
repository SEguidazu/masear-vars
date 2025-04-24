import { useEffect, useState } from "react";
import { fetchMapData } from "@/data/service";
import MapContext, { ContextProps, initialContext } from "@/data/context";
import Map from "@/components/map";

function App() {
  const [mapData, setMapData] = useState<ContextProps>(initialContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setMapData((prev) => ({ ...prev, isLoading: true }));
        const response = await fetchMapData();

        if (response) setMapData({ ...response, isLoading: false });
      } finally {
        setMapData((prev) => ({ ...prev, isLoading: false }));
      }
    };

    fetchData();
  }, []);

  return (
    <MapContext.Provider value={mapData}>
      <main>
        <Map />
      </main>
    </MapContext.Provider>
  );
}

export default App;
