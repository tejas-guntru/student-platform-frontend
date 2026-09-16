export interface MembershipResponse {
  membershipId: string | null;
  status: "ACTIVE" | "EXPIRED" | null;
  active: boolean;
  startsAt: string | null;
  endsAt: string | null;
}