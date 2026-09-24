import { validCreateClientInput } from "../../testing/fixtures/domain.fixtures";
import { Client } from "../../domain/client/Client";
import { CreateClientUseCase } from "../../application/client/create-client.use-case";
import { GetClientUseCase } from "../../application/client/get-client.use-case";
import { UpdateClientUseCase } from "../../application/client/update-client.use-case";
import { ClientService } from "./client.service";

describe("ClientService", () => {
  let service: ClientService;
  let createClientUseCase: jest.Mocked<CreateClientUseCase>;
  let getClientUseCase: jest.Mocked<GetClientUseCase>;
  let updateClientUseCase: jest.Mocked<UpdateClientUseCase>;

  beforeEach(() => {
    createClientUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<CreateClientUseCase>;
    getClientUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<GetClientUseCase>;
    updateClientUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<UpdateClientUseCase>;

    service = new ClientService(
      createClientUseCase,
      getClientUseCase,
      updateClientUseCase,
    );
  });

  it("returns an empty list by default", () => {
    expect(service.findAll()).toEqual([]);
  });

  it("creates a client through the use case and stores it in memory", async () => {
    const client = Client.create({
      ...validCreateClientInput,
      birthDate: validCreateClientInput.birthDate as Date,
    }).getValue();

    createClientUseCase.execute.mockResolvedValue(client);

    const created = await service.create(validCreateClientInput);

    expect(createClientUseCase.execute).toHaveBeenCalledWith(
      validCreateClientInput,
    );
    expect(created).toBe(client);
    expect(service.findAll()).toHaveLength(1);
  });

  it("finds a client by public id", async () => {
    const client = Client.create({
      ...validCreateClientInput,
      birthDate: validCreateClientInput.birthDate as Date,
    }).getValue();

    getClientUseCase.execute.mockResolvedValue(client);

    await expect(service.findOne(client.id.getValue())).resolves.toBe(client);
    expect(getClientUseCase.execute).toHaveBeenCalledWith(client.id.getValue());
  });

  it("updates an existing client", async () => {
    const client = Client.create({
      ...validCreateClientInput,
      birthDate: validCreateClientInput.birthDate as Date,
    }).getValue();
    const updatedClient = client.update({ name: "Jane Doe" }).getValue();

    updateClientUseCase.execute.mockResolvedValue(updatedClient);

    const updated = await service.update(client.id.getValue(), {
      name: "Jane Doe",
    });

    expect(updateClientUseCase.execute).toHaveBeenCalledWith({
      id: client.id.getValue(),
      name: "Jane Doe",
    });
    expect(updated).toBe(updatedClient);
  });
});
