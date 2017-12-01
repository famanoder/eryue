export default `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="renderer" content="webkit">
	<meta name="keywords" content="花满楼,花满楼的小站,前端学习分享，与君共勉！">
	<title>{ title ="欢迎来到花满楼的小站！" }</title>
	<style>
	body {background-color: #FAFDFC;}
	h1 {
		font-family: 微软雅黑;
	    font-size: 26px;
	    margin-left: 10px;
	    color: #29e0dc;
	}
	p {
	    color: #29dab9;
	    font-size: 15px;
	    font-family: verdana;
	    margin: 10px;
	}
	small{
		font-family: arial;
    	color: #777;
    	margin-left: 10px;
	}
	</style>
</head>
<body>
	<div id="app">
		<h1>{ welcome }</h1>
		{ features= }
		<small>if you have some suggestions, please contact with me < {email} ></small>
	</div>
</body>
</html>
`;
