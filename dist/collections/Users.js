"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
exports.Users = {
    slug: "users",
    admin: {
        hidden: function (_a) {
            var user = _a.user;
            return (user === null || user === void 0 ? void 0 : user.role) !== "admin";
        },
    },
    auth: {
        verify: {
            generateEmailHTML: function (_a) {
                var token = _a.token;
                return "\n          <div>\n            <p>Hi,</p>\n            <p>Click the link below to verify your email address.</p>\n            <a href=\"".concat(process.env.NEXT_PUBLIC_SERVER_URL, "/verify-email?token=").concat(token, "\">Verify Email</a>\n          </div>\n        ");
            },
        },
    },
    access: {
        read: function () { return true; },
        create: function () { return true; },
    },
    fields: [
        {
            name: "role",
            defaultValue: "user",
            required: true,
            admin: {
                condition: function () { return true; },
            },
            type: "select",
            options: [
                {
                    label: "Admin",
                    value: "admin",
                },
                {
                    label: "User",
                    value: "user",
                },
            ],
        },
    ],
};
