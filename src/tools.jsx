import React from "react";
import { Tooltip } from "@material-ui/core";
import { ApolloClient } from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

export const statics = {
  tooltipEnterDelay: 500,
  serverAddress: "http://localhost",
};
export const styles = {
  inlineItems: { display: "flex", alignItems: "center" },
};

export const client = new ApolloClient({
  link: new HttpLink({
    uri: statics.serverAddress,
  }),
  cache: new InMemoryCache(),
});

// export const currentUser = { _id: "john" };
export const currentUser = { _id: "bob" };

export function getTimeAgo(timestampDiff) {
  let seconds = timestampDiff / 1000;
  if (seconds <= 60) {
    return `${Math.floor(seconds)} sec`;
  } else if (60 < seconds && seconds < 3600) {
    return `${Math.floor(seconds / 60)} min`;
  } else if (seconds < 864e2 && seconds >= 3600) {
    return `${Math.floor(seconds / 60 / 60)} hr`;
  } else if (seconds < 20736e2 && seconds >= 864e2) {
    return `${Math.floor(seconds / 60 / 60 / 24)} days`;
  } else if (seconds < 6228e3 && seconds >= 20736e2) {
    return `${Math.floor(seconds / 60 / 60 / 24 / 30)} months`;
  } else {
    return `${Math.floor(seconds / 60 / 60 / 24 / 30 / 365)} year`;
  }
}

export function AttachTooltip(title, component) {
  return (
    <Tooltip title={title} enterDelay={statics.tooltipEnterDelay}>
      {component}
    </Tooltip>
  );
}
