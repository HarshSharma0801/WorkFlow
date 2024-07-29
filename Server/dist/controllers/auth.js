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
exports.login = exports.register = void 0;
const user_1 = __importDefault(require("../modals/user"));
const hash_1 = require("../utils/hash");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const existingUser = yield user_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ valid: false, message: 'User already exists' });
        }
        const hashedPassword = yield (0, hash_1.hashPassword)(password);
        const newUser = new user_1.default({ name, email, password: hashedPassword });
        yield newUser.save();
        return res.status(201).json({ valid: true, message: 'User registered successfully' });
    }
    catch (error) {
        return res.status(500).json({ valid: false, message: 'Server error', error });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield user_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ valid: false, message: 'Invalid credentials' });
        }
        const isMatch = yield (0, hash_1.comparePassword)(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ valid: false, message: 'Invalid credentials' });
        }
        const main = { user, id: user._id };
        return res.status(200).json({ valid: true, user: main });
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
});
exports.login = login;
//# sourceMappingURL=auth.js.map