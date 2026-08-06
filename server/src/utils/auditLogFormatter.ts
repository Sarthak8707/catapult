

export function formatAuditLog(log: any): string {
  const actor = log.actorName;
  const resource = log.resourceName ?? "resource";

  switch (log.resourceType) {
    case "project":
      return formatProjectLog(actor, resource, log);

    case "flag":
      return formatFlagLog(actor, resource, log);

    case "rule":
      return formatRuleLog(actor, resource, log);

    default:
      return `${actor} performed ${log.action} on ${resource}`;
  }
}

function formatProjectLog(
  actor: string,
  resource: string,
  log: any
): string {
  switch (log.action) {
    case "created":
      return `${actor} created project ${resource}`;

    case "updated":
      return `${actor} updated project ${resource}`;

    case "deleted":
      return `${actor} deleted project ${resource}`;

    default:
      return `${actor} ${log.action} project ${resource}`;
  }
}



function formatFlagLog(
  actor: string,
  resource: string,
  log: any
): string {
  switch (log.action) {
    case "created":
      return `${actor} created flag ${resource}`;

    case "updated":
      return `${actor} updated flag ${resource}`;

    case "deleted":
      return `${actor} deleted flag ${resource}`;

    case "turned_on":
      return `${actor} turned on flag ${resource}`;

    case "turned_off":
      return `${actor} turned off flag ${resource}`;

    case "archived":
      return `${actor} archived flag ${resource}`;

    case "restored":
      return `${actor} restored flag ${resource}`;

    default:
      return `${actor} ${log.action} flag ${resource}`;
  }
}


function formatRuleLog(
  actor: string,
  resource: string,
  log: any
): string {
  switch (log.action) {
    case "created":
      return `${actor} created rule ${resource}`;

    case "updated":
      return `${actor} updated rule ${resource}`;

    case "deleted":
      return `${actor} deleted rule ${resource}`;

    default:
      return `${actor} ${log.action} rule ${resource}`;
  }
}

