"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class NewLead {
    constructor() {
        this.SendNewLead = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email } = req.body;
                const response = yield axios_1.default.post("https://hooks.slack.com/services/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", {
                    text: `Hey there is a New KOL Lead  name: ${name}  ,  email :${email} `,
                });
                if (response.status == 200) {
                    return res.send("working " + name + " " + email);
                }
                else {
                    return res.send("Not working ");
                }
            }
            catch (error) {
                console.log(error);
            }
        });
        this.getLead = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                return res.send("Get Leads");
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = new NewLead();
//# sourceMappingURL=Newlead.js.map