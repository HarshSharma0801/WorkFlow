"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Newlead_1 = __importDefault(require("../controllers/Newlead"));
const router = express_1.default.Router();
router.get('/', Newlead_1.default.getLead);
router.post('/sendNewLead', Newlead_1.default.SendNewLead);
exports.default = router;
//# sourceMappingURL=index.js.map