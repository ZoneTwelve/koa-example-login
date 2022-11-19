const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  if( ctx.session.user ) {
    ctx.redirect('/dashboard');
  }
  await ctx.render('index', {
    title: 'Twelve Systems'
  })
})

router.get('/dashboard', async (ctx, next) => {
  if( !ctx.session.user ) {
    ctx.redirect('/');
  }
  await ctx.render('dashboard', {
    title: 'Twelve Systems'
  })
})

router.post('/user', async (ctx, next) => {
  // insert query
  let query = "INSERT INTO users (username, password, email) VALUES ($1, $2, $3, $4, $5)";
  let values = [ctx.request.body.username, ctx.request.body.password, ctx.request.body.email];
  let result = await ctx.app.pool.query(query, values);
  // if insert success
  if( result.rowCount > 0 ){
    ctx.session.user = {
      id: result.rows[0].id,
      username: result.rows[0].username,
      email: result.rows[0].email,
    };
    ctx.redirect('/dashboard');
  }else{
    ctx.redirect('/?error=1');
  }
})

router.post('/user/session', async (ctx, next) => {
  let query = "SELECT * FROM users WHERE username = $1 AND password = $2";
  let values = [ctx.request.body.username, ctx.request.body.password];
  const { rows } = await ctx.pool.query(query, values)
  if(rows.length > 0){
    ctx.session.user = rows[0];
    ctx.redirect('/user');
  }else{
    ctx.redirect('/');
  }
})




module.exports = router
