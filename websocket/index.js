// WebSocket 核心模组
const express = require("express");
const expressWS = require("express-ws");
const router = express.Router();
expressWS(router);

router.ws("/server", (ws, req) => {
  try {
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
