"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScryptPasswordHasher = void 0;
const common_1 = require("@nestjs/common");
const node_crypto_1 = require("node:crypto");
const node_util_1 = require("node:util");
const scryptAsync = (0, node_util_1.promisify)(node_crypto_1.scrypt);
const ALGORITHM = "scrypt";
const KEY_LENGTH = 64;
const SALT_BYTES = 16;
let ScryptPasswordHasher = class ScryptPasswordHasher {
    async hash(plainPassword) {
        const salt = (0, node_crypto_1.randomBytes)(SALT_BYTES).toString("hex");
        const derived = await scryptAsync(plainPassword, salt, KEY_LENGTH);
        return `${ALGORITHM}$${salt}$${derived.toString("hex")}`;
    }
    async compare(plainPassword, hash) {
        const [algorithm, salt, key] = hash.split("$");
        if (algorithm !== ALGORITHM || !salt || !key) {
            return false;
        }
        const expected = Buffer.from(key, "hex");
        const derived = await scryptAsync(plainPassword, salt, expected.length);
        return (derived.length === expected.length && (0, node_crypto_1.timingSafeEqual)(derived, expected));
    }
};
exports.ScryptPasswordHasher = ScryptPasswordHasher;
exports.ScryptPasswordHasher = ScryptPasswordHasher = __decorate([
    (0, common_1.Injectable)()
], ScryptPasswordHasher);
//# sourceMappingURL=ScryptPasswordHasher.js.map