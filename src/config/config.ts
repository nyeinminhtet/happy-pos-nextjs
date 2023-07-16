interface Config {
  apiBaseUrl: string;
  jwtSecret: string;
  spaceAccessKeyId: string;
  spaceSecretAccessKey: string;
  spaceEndpoint: string;
  databaseUser: string;
  databasePassword: string;
  databaseName: string;
  databaseHost: string;
  clientId: string;
  clientSecret: string;
  orderAppUrl: string;
}

export const config: Config = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "",
  jwtSecret: process.env.JWT_SECRET || "",
  spaceAccessKeyId: process.env.SPACE_ACCESS_KEY_ID || "",
  spaceSecretAccessKey: process.env.SPACE_SECRET_ACCESS_KEY || "",
  spaceEndpoint: process.env.SPACE_ENDPOINT || "",
  databaseHost: process.env.DATABASE_HOST || "",
  databaseUser: process.env.DATABASE_USER || "",
  databasePassword: process.env.DATABASE_PASSWORD || "",
  databaseName: process.env.DATABASE_NAME || "",
  clientId: process.env.GOOGLE_CLIENT_ID || "",
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  orderAppUrl: process.env.NEXT_PUBLIC_ORDER_APP_URL || "",
};
