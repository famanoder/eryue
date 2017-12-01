export function getArgType(arg){
	return Object.prototype.toString.call(arg).toLowerCase().match(/\s(\w+)/)[1];
}