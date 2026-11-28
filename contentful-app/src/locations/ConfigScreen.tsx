import { useCallback, useEffect } from "react";
import type { ConfigAppSDK } from "@contentful/app-sdk";
import { useSDK } from "@contentful/react-apps-toolkit";
import { Box, Heading, Note, Paragraph, Stack, Text } from "@contentful/f36-components";

export default function ConfigScreen() {
  const sdk = useSDK<ConfigAppSDK>();

  // Preserve any existing field assignments on save (this app has no global
  // config of its own — everything is per-field instance parameters).
  const onConfigure = useCallback(async () => {
    const currentState = await sdk.app.getCurrentState();
    return { targetState: currentState };
  }, [sdk]);

  useEffect(() => {
    sdk.app.onConfigure(() => onConfigure());
  }, [sdk.app, onConfigure]);

  useEffect(() => {
    sdk.app.setReady();
  }, [sdk.app]);

  return (
    <Box style={{ maxWidth: 768, margin: "40px auto", padding: "0 20px" }}>
      <Stack flexDirection="column" alignItems="flex-start" spacing="spacingM">
        <Heading>Conditional Field</Heading>
        <Paragraph>
          Greys out (or hides) a text field until another field on the same entry has a chosen
          value. There is nothing to configure here — set it up per field when you assign the
          app to a field, using the instance parameters below.
        </Paragraph>
        <Note variant="primary" title="Per-field instance parameters">
          <Text fontWeight="fontWeightDemiBold">controllingField</Text> — the field ID that
          gates this one (e.g. <Text fontWeight="fontWeightDemiBold">heroHeadlineSource</Text>).
          <br />
          <Text fontWeight="fontWeightDemiBold">disableWhenValue</Text> — comma-separated values
          that GREY OUT this field (e.g. <Text fontWeight="fontWeightDemiBold">Article title</Text>).
          <br />
          <Text fontWeight="fontWeightDemiBold">enableWhenValue</Text> — alternatively,
          comma-separated values that ENABLE it (everything else greys out). Use one of these two,
          not both.
          <br />
          <Text fontWeight="fontWeightDemiBold">mode</Text> — <Text fontWeight="fontWeightDemiBold">disable</Text>{" "}
          (default, greys out) or <Text fontWeight="fontWeightDemiBold">hide</Text>.
        </Note>
      </Stack>
    </Box>
  );
}
