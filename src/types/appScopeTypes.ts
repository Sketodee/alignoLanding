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

export const SubscriptionStatus = {
  ACTIVE: 'active',
  CANCELED: 'canceled',
  PAST_DUE: 'past_due',
  UNPAID: 'unpaid',
  TRIALING: 'trialing',
  INCOMPLETE: 'incomplete',
  INCOMPLETE_EXPIRED: 'incomplete_expired'
} as const;
export type SubscriptionStatus = typeof SubscriptionStatus[keyof typeof SubscriptionStatus];

export interface Plugin {
  id: number
  name: string
  description: string
  iconUrl: string
  imageUrl: string
  pluginType: string
  subDescriptions: SubDescription[]
  currentWindowsVersion: string
  currentMacOsVersion: string
  createdAt: string
  updatedAt: string
  versions: Version[]
}

export interface Version {
  id: number
  pluginId: number
  platform: 'windows' | 'mac'
  url: string
  size: number
  version: string
  releaseDate: string
  createdAt: string
  updatedAt: string
}

interface SubDescription {
  title: string
  description: string
}
