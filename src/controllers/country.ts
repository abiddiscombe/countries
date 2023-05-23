// src/controllers/country.ts

import { getCountryList } from "../services/getCountryList.ts";

// deno-lint-ignore no-explicit-any
export async function country(ctx: any) {
  const title = "Countries List";

  try {
    const countries = await getCountryList();

    ctx.response.body = {
      ...ctx.state.header,
      title: title,
      countries: countries.map((country: string[]) => {
        return {
          href: `/country/${country[1].toLowerCase()}`,
          admin: country[0],
        };
      }),
    };
  } catch {
    ctx.response.status = 500;
    ctx.response.body = {
      ...ctx.state.header,
      title: title,
      error: {
        code: 500,
        desc: "Internal Service Error. Please try again later.",
      },
    };
  }
}
