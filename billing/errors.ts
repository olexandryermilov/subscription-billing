export class BillingError extends Error {
  constructor(
    public readonly code: string,
    message?: string,
  ) {
    super(message ?? code);
    this.name = new.target.name;
  }
}

export class ForbiddenTransitionError extends BillingError {}

export class InvalidSeatCountError extends BillingError {
  constructor(seats: number) {
    super("invalid_seat_count", `Seat count must be a positive integer, got ${seats}`);
  }
}

export class TenantNotFoundError extends BillingError {
  constructor(tenantId: string) {
    super("tenant_not_found", `Tenant ${tenantId} not found`);
  }
}
