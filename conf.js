export default {
	port:'9000',
	staticDir:'./static',
	mongoOption:{
		user:'famanoder',
		pass:'123321',
		host:'127.0.0.1',
		port:'27017',
		db:'test'
	},
	SSL:{
		support:false,
		key:'',
		cert:''
	},
	JWT:{
		support:true,
		expire:'1h',
		secret:"require('fs').readFileSync('private.key')"
	}
}


