export class StatusErrors extends Error {
  static invalidTransition(from: string, to: string): StatusErrors {
    return new StatusErrors(
      `Client status cannot change from ${from} to ${to}`,
    );
  }

  static clientIsInactive(): StatusErrors {
    return new StatusErrors("Client is inactive and cannot be changed");
  }

  static clientIsNotActive(): StatusErrors {
    return new StatusErrors("Client must be active to perform this operation");
  }
}
