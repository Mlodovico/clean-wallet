import { ChangeClientPasswordUseCase } from "../../application/client/change-client-password.use-case";
import { ChangeClientStatusUseCase, ClientStatusAction } from "../../application/client/change-client-status.use-case";
import { CreateClientInput, CreateClientUseCase } from "../../application/client/create-client.use-case";
import { FindClientInput, FindClientUseCase } from "../../application/client/find-client.use-case";
import { GetClientUseCase } from "../../application/client/get-client.use-case";
import { UpdateClientInput, UpdateClientUseCase } from "../../application/client/update-client.use-case";
import { Client } from "../../domain/client/Client";
export declare class ClientService {
    private readonly createClientUseCase;
    private readonly getClientUseCase;
    private readonly updateClientUseCase;
    private readonly changeClientStatusUseCase;
    private readonly changeClientPasswordUseCase;
    private readonly findClientUseCase;
    private clients;
    constructor(createClientUseCase: CreateClientUseCase, getClientUseCase: GetClientUseCase, updateClientUseCase: UpdateClientUseCase, changeClientStatusUseCase: ChangeClientStatusUseCase, changeClientPasswordUseCase: ChangeClientPasswordUseCase, findClientUseCase: FindClientUseCase);
    findAll(): Client[];
    create(clientData: CreateClientInput): Promise<Client>;
    findOne(id: string): Promise<Client>;
    findBy(criteria: FindClientInput): Promise<Client>;
    update(id: string, updateData: Omit<UpdateClientInput, "id">): Promise<Client>;
    changeStatus(id: string, action: ClientStatusAction): Promise<Client>;
    changePassword(id: string, currentPassword: string, newPassword: string): Promise<void>;
}
