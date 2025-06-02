"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler_1 = require("./middleware/errorHandler");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
// import routes
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const books_routes_1 = __importDefault(require("./routes/books.routes"));
const author_routes_1 = __importDefault(require("./routes/author.routes"));
const installment_routes_1 = __importDefault(require("./routes/installment.routes"));
const personalLibrary_routes_1 = __importDefault(require("./routes/personalLibrary.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middlewares básicos
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routers
app.use("/api/auth", auth_routes_1.default);
app.use("/api/books", books_routes_1.default);
app.use("/api/my-library", personalLibrary_routes_1.default);
app.use("/api/my-library", installment_routes_1.default);
app.use("/api/authors", author_routes_1.default);
// Error handler
app.use(errorHandler_1.errorHandler);
exports.default = app;
