const express = require("express");
const app = express();
const dotenv = require("dotenv");
var methodOverride = require('method-override');
const flash = require('express-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
const routerClient = require("./route/client/index.route");
const routerAdmin = require("./route/admin/index.route");
const database = require("./config/database");
const systemConfig = require("./config/system")
const path = require('path');

dotenv.config();

database.connect();

const port = process.env.PORT;

app.use(cookieParser('abcdefgh'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

app.use(express.static(`${__dirname}/public`));

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
    res.locals.prefixAdmin = systemConfig.prefixAdmin;
    next();
});

/* New Route to the TinyMCE Node module */
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

routerAdmin(app);
routerClient(app);


app.listen(port, () => {
    console.log(`Đang chạy trên cổng ${port}`);
});
