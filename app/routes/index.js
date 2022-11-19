const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  if( ctx.session.user ) {
    ctx.redirect('/dashboard');
  }
  let error = ctx.query.error;
  await ctx.render('index', {
    title: 'Twelve Systems', error
  })
})

router.get('/dashboard', async (ctx, next) => {
  // check user login
  console.log( ctx.session.user );
  if( !ctx.session.user ) {
    ctx.redirect('/');
  }
  await ctx.render('dashboard', {
    title: 'Twelve Systems',
    user: ctx.session.user
  })
})

router.post('/user', async (ctx, next) => {
  // insert query
  let query = 'INSERT INTO twelve_sys."Auth_Users" (username, password, email) VALUES ($1, $2, $3)';
  let values = [ctx.request.body.username, ctx.request.body.password, ctx.request.body.email];
  let result = await ctx.app.pool.query(query, values);
  // if insert success
  console.log(result) ; 
  if( result.rowCount == 1 ){
    ctx.body = {
      status: "success"
    }
  }else{
    ctx.body = {
      status: "fail",
      error: "Server side fail",
    }
  }
})

router.post('/user/session', async (ctx, next) => {
  let query = 'SELECT * From twelve_sys."Auth_Users" WHERE username = $1 AND password = $2'
  let values = [ctx.request.body.username, ctx.request.body.password];
  let result = await ctx.app.pool.query(query, values);

  if( result.rowCount > 0 ){
    ctx.session.user = {
      id: result.rows[0].id,
      username: result.rows[0].username,
      email: result.rows[0].email,
    };
    ctx.body = { status: "success" };
  }else{
    ctx.status = 401;
    ctx.body = { status:"failed", error: "登入失敗" };
  }
})

router.delete('/user/session', async (ctx, next) => {
  // session destory
  ctx.session = null;
  ctx.body = { status: "success" };
})



module.exports = router
