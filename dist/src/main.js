"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./presentation/app.module");
async function bootstrap() {
    try {
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        await app.listen(process.env.PORT ?? 3000);
        console.log(`Application is running on: ${await app.getUrl()}`);
    }
    catch (error) {
        console.error("Error during application bootstrap", error);
    }
}
void bootstrap();
//# sourceMappingURL=main.js.map