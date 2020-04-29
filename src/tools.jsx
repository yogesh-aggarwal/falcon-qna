import React from "react";
import { Tooltip } from "@material-ui/core";

export const statics = {
  tooltipEnterDelay: 500,
};
export const styles = {
  inlineItems: { display: "flex", alignItems: "center" },
};

export const currentUser = "john"

export function getTimeAgo(timestampDiff) {
  let seconds = timestampDiff / 1000;
  if (seconds <= 60) {
    return `${Math.floor(seconds)} sec`;
  } else if (60 < seconds && seconds < 3600) {
    return `${Math.floor(seconds / 60)} min`;
  } else if (seconds >= 3600) {
    return `${Math.floor(seconds / 60 / 60)} hr`;
  }
}

export function AttachTooltip(title, component) {
  return (
    <Tooltip title={title} enterDelay={statics.tooltipEnterDelay}>
      {component}
    </Tooltip>
  );
}
