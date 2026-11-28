import { useMemo } from "react";
import { locations } from "@contentful/app-sdk";
import { useSDK } from "@contentful/react-apps-toolkit";
import Field from "./locations/Field";
import ConfigScreen from "./locations/ConfigScreen";

// Each App Framework "location" renders a different component. This app uses
// two: the per-field editor (Entry field) and the install/config screen.
const ComponentLocationSettings: Record<string, React.ComponentType> = {
  [locations.LOCATION_APP_CONFIG]: ConfigScreen,
  [locations.LOCATION_ENTRY_FIELD]: Field,
};

export default function App() {
  const sdk = useSDK();

  const Component = useMemo(() => {
    for (const [location, Comp] of Object.entries(ComponentLocationSettings)) {
      if (sdk.location.is(location)) return Comp;
    }
    return null;
  }, [sdk.location]);

  return Component ? <Component /> : null;
}
