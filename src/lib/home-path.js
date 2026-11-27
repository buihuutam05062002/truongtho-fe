
export const isStaffUser = (user) =>
  !!user?.roles?.some((r) => r === "ROLE_ADMIN" || r === "ROLE_STAFF")

export const homePathFor = (user) => (isStaffUser(user) ? "/admin" : "/home")
