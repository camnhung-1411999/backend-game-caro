"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mailer = void 0;
const common_1 = require("@nestjs/common");
const Email = require("email-templates");
const path = require("path");
const nodemailer = require("nodemailer");
let Mailer = class Mailer {
    async send(data, url) {
        const transporter = await nodemailer.createTransport({
            pool: true,
            service: 'Gmail',
            auth: {
                user: process.env.HOST_MAIL,
                pass: process.env.PASS_MAIL,
            },
        });
        const email = new Email({
            message: {
                from: process.env.HOST_MAIL,
            },
            send: true,
            transport: transporter,
        });
        try {
            const mail2 = await email.send({
                templates: path.join(__dirname, url),
                message: {
                    to: data.user,
                },
                locals: {
                    data,
                },
            });
        }
        catch (error) {
            console.log(error);
        }
    }
};
Mailer = __decorate([
    common_1.Injectable()
], Mailer);
exports.Mailer = Mailer;
//# sourceMappingURL=mailer.middleware.js.map