import { useEffect, useMemo, useState } from "react";
import type { FieldAppSDK } from "@contentful/app-sdk";
import { useSDK, useAutoResizer } from "@contentful/react-apps-toolkit";
import { Flex, Note, TextInput, Textarea } from "@contentful/f36-components";

// Per-field configuration, set as App Definition instance parameters when the
// app is assigned to a field.
type InstanceParams = {
  controllingField?: string; // field ID that gates this one
  enableWhenValue?: string; // comma-separated values that ENABLE this field
  disableWhenValue?: string; // comma-separated values that DISABLE this field
  mode?: string; // "disable" (default) | "hide"
};

function parseList(raw?: string): string[] {
  return (raw ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function normalise(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "boolean") return String(value);
  return String(value);
}

export default function Field() {
  const sdk = useSDK<FieldAppSDK>();
  useAutoResizer();

  const params = sdk.parameters.instance as InstanceParams;
  const controllingFieldId = params.controllingField?.trim() || "";
  const enableValues = useMemo(
    () => parseList(params.enableWhenValue),
    [params.enableWhenValue],
  );
  const disableValues = useMemo(
    () => parseList(params.disableWhenValue),
    [params.disableWhenValue],
  );
  const mode = params.mode === "hide" ? "hide" : "disable";
  const isLong = sdk.field.type === "Text";

  // This field's own value.
  const [value, setValue] = useState<string>(() => normalise(sdk.field.getValue()));
  useEffect(() => {
    const detach = sdk.field.onValueChanged((v) => setValue(normalise(v)));
    return () => detach();
  }, [sdk.field]);

  // The controlling field's value (live).
  const [controlValue, setControlValue] = useState<unknown>(undefined);
  useEffect(() => {
    if (!controllingFieldId) return;
    const cf = sdk.entry.fields[controllingFieldId];
    if (!cf) return;
    setControlValue(cf.getValue());
    const detach = cf.onValueChanged((v) => setControlValue(v));
    return () => detach();
  }, [controllingFieldId, sdk.entry.fields]);

  // If misconfigured (no controlling field, or it doesn't exist) we never block
  // editing — fail open, so a bad config can't lock out an editor.
  const enabled = useMemo(() => {
    if (!controllingFieldId || !sdk.entry.fields[controllingFieldId]) return true;
    const cv = normalise(controlValue);
    if (disableValues.length) return !disableValues.includes(cv);
    if (enableValues.length) return enableValues.includes(cv);
    return true;
  }, [controllingFieldId, controlValue, disableValues, enableValues, sdk.entry.fields]);

  const handleChange = (next: string) => {
    setValue(next);
    if (next) sdk.field.setValue(next);
    else sdk.field.removeValue();
  };

  // "hide" mode: collapse the input entirely when not applicable. (The field's
  // label is drawn by Contentful outside this app, so it still shows.)
  if (!enabled && mode === "hide") return null;

  const reason = disableValues.length
    ? `“${controllingFieldId}” is ${disableValues.map((v) => `“${v}”`).join(" or ")}`
    : enableValues.length
      ? `“${controllingFieldId}” is not ${enableValues.map((v) => `“${v}”`).join(" or ")}`
      : "";

  return (
    <Flex flexDirection="column" gap="spacingXs">
      {isLong ? (
        <Textarea
          value={value}
          isDisabled={!enabled}
          onChange={(e) => handleChange(e.target.value)}
          resize="vertical"
          rows={3}
        />
      ) : (
        <TextInput
          value={value}
          isDisabled={!enabled}
          onChange={(e) => handleChange(e.target.value)}
        />
      )}
      {!enabled && (
        <Note variant="neutral">
          Greyed out{reason ? ` because ${reason}` : ""}. The value is kept and applies again
          when the condition changes.
        </Note>
      )}
    </Flex>
  );
}
