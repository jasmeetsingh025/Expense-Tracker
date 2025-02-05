/**
 * @type {{ADMIN: "ADMIN"; USER: "USER"} as const}
 */
export const UserEnumRole = {
  ADMIN: "ADMIN",
  USER: "USER",
};

export const AvailableUserRoles = Object.values(UserEnumRole);

/**
 * @type {{INCOME: "INCOME"; EXPENSE: "EXPENSE"} as const}
 */
export const TransactionTypeEnum = {
  INCOME: "INCOME",
  EXPENSE: "EXPENSE",
};

export const AvailableTransactionTypes = Object.values(TransactionTypeEnum);

/**
 *  @type {{DAILY: "DAILY"; WEEKLY: "WEEKLY"; MONTHLY: "MONTHLY"; YEARLY: "YEARLY"} as const}
 */
export const FrequencyEnum = {
  DAILY: "DAILY",
  WEEKLY: "WEEKLY",
  MONTHLY: "MONTHLY",
  YEARLY: "YEARLY",
};

export const AvailableFrequencies = Object.values(FrequencyEnum);
