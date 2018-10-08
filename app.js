var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require("express-session");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var positionsRouter = require('./routes/positions');
var proversRouter = require('./routes/prover');
var zhangdanRouter = require('./routes/zhangdan');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 使用 session 中间件
app.use(session({
	secret: "aldskjflkadsjfalkdsfjlkdsajf",
	cookie : {
		maxAge : 30 * 60 * 1000
	}
}));

// 权限认证
/*app.use(function(req, res, next){
  // 判断请求资源的URL
  const {url} = req;
  if (url.endsWith(".html") && url !== "/") { // 访问其它页面资源
    if (req.session.loginUser) // 已有登录用户
      next(); // 继续访问
    else { // 没有登录用户，跳转到首页
      res.redirect("/");
      return;
    }
  } else {
    next();
  }
});*/

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter); // 访问项目 "/" 根的资源
app.use('/api/user', usersRouter); // 访问项目 "/api/user" 目录的资源
app.use("/api/position", positionsRouter); // 访问项目 "/api/position" 目录的资源
app.use("/api/prover", proversRouter); // 访问项目 "/api/prover" 目录的资源
app.use("/api/zhangdan", zhangdanRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
