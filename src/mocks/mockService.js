
import products from './products';
import templates from './templates';
const api = {
	products,
	templates
};

const apis = {
	PRODUCTS: 'products',
	TEMPLATES: 'templates'
};

const methods = {
	ALL: 'ALL',
	BYID: 'BYID',
	CREATE: 'CREATE',
	DELETE: 'DELETE'
};

function jsonCopy(src) {
	return JSON.parse(JSON.stringify(src));
}

const createResource = (resourceName, body) => {
	const data = api[resourceName];
	const id = data.reduce((crr, cur) => crr.id > cur.id) +1;
	body.id = id;
	data.push(body);
	return id;
};

const call = (resource,mothod,payload) => {
	if(!api[resource]) {
		return null;
	}
	switch(mothod) {
	case methods.ALL:
		return jsonCopy(api[resource]);
	case methods.BYID:
		return jsonCopy(api[resource].find(r => r.id === Number(payload)));
	case methods.CREATE:
		return createResource(resource,payload);
	default:
		return null;
	}
};
const mockService = {
	apis,
	methods,
	call
};

export default mockService;