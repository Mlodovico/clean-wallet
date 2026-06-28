"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./presentation/app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableShutdownHooks();
    const port = process.env.PORT ?? 3000;
    await app.listen(port);
    console.log(`Application is running on: ${await app.getUrl()}`);
}
void bootstrap().catch((error) => {
    console.error("Error during application bootstrap", error);
    process.exit(1);
});
//# sourceMappingURL=main.js.map