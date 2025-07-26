export type User = {
  id: string
  email: string
  userType: UserType
}

export const UserType = {
  ADMIN: 0,
  USER: 1
} as const;
export type UserType = typeof UserType[keyof typeof UserType];  


export const AllowedProviders = {
  GOOGLE: 'google',
  APPLE: 'apple',
  CUSTOM: 'custom'
} as const;
export type AllowedProviders = typeof AllowedProviders[keyof typeof AllowedProviders];


export const SubscriptionPlan = {
  SINGLE: 'single',
  MONTHLY: 'monthly',
  YEARLY: 'yearly'
} as const;
export type SubscriptionPlan = typeof SubscriptionPlan[keyof typeof SubscriptionPlan];