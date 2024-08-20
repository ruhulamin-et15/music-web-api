"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../modules/auth/auth.route");
const user_route_1 = require("../user/user.route");
const song_route_1 = require("../modules/song/song.route");
const album_route_1 = require("../modules/album/album.route");
const category_route_1 = require("../modules/category/category.route");
const blog_route_1 = require("../modules/blog/blog.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes,
    },
    {
        path: "/user",
        route: user_route_1.UserRoutes,
    },
    {
        path: "/songs",
        route: song_route_1.songRoutes,
    },
    {
        path: "/albums",
        route: album_route_1.albumRoutes,
    },
    {
        path: "/categories",
        route: category_route_1.categoryRoutes,
    },
    {
        path: "/blogs",
        route: blog_route_1.blogRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
