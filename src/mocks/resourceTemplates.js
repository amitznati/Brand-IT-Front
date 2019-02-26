

function jsonCopy(src) {
	return JSON.parse(JSON.stringify(src));
}
const TEMPLATE = {
	id: 1,
	layouts: [
		{
			type: 'image',
			properties: {
				src: 'https://via.placeholder.com/600/56a8c2',
				height: 8,
				width: 8,
				x: 0,
				y: 0
			}
		},
	]
};

const PRODUCT = {
	id: 1,
	name: '',
	image: '',
	productSize: {
		height: 0,
		width: 0
	},
	templateFrame: {
		height: 0,width: 0, x: 0, y: 0
	}
};

const CATEGORY = {
	id: 1,
	name: 'Food & Restorants',
};

const KIT = {
	id: 1,
	categoryId: 1,
	name: 'Italian',
	inputAttributes: [
		'Company Name','Slogen'
	],
};

const THEME = {
	id: 1,
	name: 'Waves',
	kitId: 1,
	photos: [
		'https://via.placeholder.com/600/56a8c2'
	],
	templates: [
		{productId: 1, templateId: 1}
	]
};



const LOGO = {
	id: 1,
	kitId: 1,
	templateId: 1
};

const ResourceTemplates = {
	CATEGORY: jsonCopy(CATEGORY),
	KIT: jsonCopy(KIT),
	THEME: jsonCopy(THEME),
	PRODUCT: jsonCopy(PRODUCT),
	TEMPLATE: jsonCopy(TEMPLATE),
	LOGO: jsonCopy(LOGO),
};

export default ResourceTemplates;