// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environmentProd.ts` with `environmentProd.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  btwUrl: "https://controleerbtwnummer.eu/api/validate/",
  kvkUrl: "https://api.overheid.io/v3/suggest/openkvk/",
  OPENKVK_OVERHEID_API_KEY: "7d49122aa631ae2298446661f43d9ae99646eb59953775b34cf25e18a12bfe5c"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
