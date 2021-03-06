"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PostModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var post_repository_1 = require("./post.repository");
var post_controller_1 = require("./event.controller");
var comment_module_1 = require("../comment/comment.module");
var vote_module_1 = require("../vote/vote.module");
var post_service_1 = require("./event.service");
var EventModule = /** @class */ (function () {
    function PostModule() {
    }
    PostModule = __decorate([
        (0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([post_repository_1.PostRepository]),
                comment_module_1.CommentModule,
                vote_module_1.VoteModule,
            ],
            controllers: [post_controller_1.EventController],
            providers: [post_service_1.EventService]
        })
    ], PostModule);
    return PostModule;
}());
exports.PostModule = EventModule;
