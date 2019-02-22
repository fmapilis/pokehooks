require("dotenv").config();
const path = require("path");
const next = require("next");
const express = require("express");
const lessMiddleware = require("less-middleware");
const LessPluginAutoPrefix = require("less-plugin-autoprefix");
const LessPluginCleanCSS = require("less-plugin-clean-css");

const port = parseInt(process.env.APP_PORT, 10) || 18000;
const app = next({ dev: true });
const handle = app.getRequestHandler();
const cleanCss = new LessPluginCleanCSS({ advanced: true });
const autoPreFix = new LessPluginAutoPrefix({ browsers: ["last 2 versions"] });
const apiRoutes = require("./api");

app.prepare()
  .then(async() => {
    const server = express();

    let source = path.join(__dirname, "static", "less");
    let dest = path.join(__dirname);
    let render = {
      plugins: [
        cleanCss,
        autoPreFix
      ]
    };
    server.use(lessMiddleware(source, {
      render,
      dest,
      once: false,
      preprocess: {
        path: (pathname) => pathname.replace(path.join("/static", "styles"), "")
      },
    }));

    await apiRoutes(server);

    server.get("/healthcheck", (req, res) => {
      res.sendStatus(200);
    });

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) {
        throw err;
      }
      console.log(`> Ready on http://localhost:${port}`);
    });
  });
