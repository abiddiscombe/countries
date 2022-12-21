// src/controllers/country.ts

import { checkValidCCID } from '../models/checkValidCCID.ts';
import { getCountryList } from '../models/getCountryList.ts';
import { getCountryDetails } from '../models/getCountryDetails.ts';

export { returnCountryDetails, returnCountryList };

function returnCountryList(ctx) {
	const countries = getCountryList();

	ctx.body = {
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
		ctx.status = 404;
		ctx.body = {
			ts: Math.floor(Date.now() / 1000),
			title: `Countries API > Country > ${sanitisedUserInput.ccid} (Not Found)`,
			error: 'The provided Country Code ID (CCID) was not recognised.',
		};
		return;
	}

	const countryDetail = getCountryDetails(sanitisedUserInput.ccid);

	if (countryDetail.length == 0) {
		ctx.status = 500;
		ctx.body = {
			ts: Math.floor(Date.now() / 1000),
			title: `Countries API > Country > ${sanitisedUserInput.ccid} (Internal Server Error)`,
			error: 'The server was unable to process this request. Please try again later.',
		};
		return;
	}

	ctx.body = {
		ts: Math.floor(Date.now() / 1000),
		title: `Countries API > Country > ${sanitisedUserInput.ccid}`,
		type: 'FeatureCollection',
		features: countryDetail,
	};

	console.log(`[OK] Client Requested: '${sanitisedUserInput.ccid}'`);
}
