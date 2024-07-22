"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.send("9999");
});
router.get("/eight", (req, res) => {
    res.send("888");
});
exports.default = router;
