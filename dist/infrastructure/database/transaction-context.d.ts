import { AsyncLocalStorage } from "node:async_hooks";
import { EntityManager } from "typeorm";
export declare const transactionContext: AsyncLocalStorage<EntityManager>;
