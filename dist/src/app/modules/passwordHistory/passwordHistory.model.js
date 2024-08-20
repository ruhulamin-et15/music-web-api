"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordHistoryModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const passwordHistorySchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});
exports.PasswordHistoryModel = mongoose_1.default.model('PasswordHistory', passwordHistorySchema);
