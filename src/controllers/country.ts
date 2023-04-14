// src/controllers/country.ts

import { checkValidCCID } from '../models/checkValidCCID.ts';
import { getCountryList } from '../models/getCountryList.ts';
import { getCountryDetails } from '../models/getCountryDetails.ts';

export { returnCountryDetails, returnCountryList };

function returnCountryList(ctx) {
	const countries = getCountryList();

	ctx.response.body = {
		ts: Math.floor(Date.now() / 1000),
		title: 'Countries API > Country',
		countries: countries,
	};
}

function returnCountryDetails(ctx) {
	const sanitisedUserInput = {
		ccid: ctx.params.ccid.toLowerCase(),
	};

	if (!checkValidCCID(sanitisedUserInput.ccid)) {
		ctx.response.status = 404;
		ctx.response.body = {
			ts: Math.floor(Date.now() / 1000),
			title: `Countries API > Country > ${sanitisedUserInput.ccid} (Not Found)`,
			error: 'The provided Country Code ID (CCID) was not recognised.',
		};
		return;
	}

	const countryDetail = getCountryDetails(sanitisedUserInput.ccid);

	if (countryDetail.length == 0) {
		ctx.response.status = 500;
		ctx.response.body = {
			ts: Math.floor(Date.now() / 1000),
			title: `Countries API > Country > ${sanitisedUserInput.ccid} (Internal Server Error)`,
			error: 'The server was unable to process this request. Please try again later.',
		};
		return;
	}

	ctx.response.body = {
		ts: Math.floor(Date.now() / 1000),
		title: `Countries API > Country > ${sanitisedUserInput.ccid}`,
		type: 'FeatureCollection',
		features: countryDetail,
	};

	console.log(`[OK] Client Requested: '${sanitisedUserInput.ccid}'`);
}
