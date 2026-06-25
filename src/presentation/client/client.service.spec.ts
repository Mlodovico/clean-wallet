import { validCreateClientInput } from "../../testing/fixtures/domain.fixtures";
import { Client } from "../../domain/client/Client";
import { CreateClientUseCase } from "../../application/client/create-client.use-case";
import { ClientService } from "./client.service";

describe("ClientService", () => {
  let service: ClientService;
  let createClientUseCase: jest.Mocked<CreateClientUseCase>;

  beforeEach(() => {
    createClientUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<CreateClientUseCase>;

    service = new ClientService(createClientUseCase);
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

  it("finds a client by id", async () => {
    const client = Client.create({
      ...validCreateClientInput,
      birthDate: validCreateClientInput.birthDate as Date,
    }).getValue();

    createClientUseCase.execute.mockResolvedValue(client);
    await service.create(validCreateClientInput);

    expect(service.findOne(client.id.getValue())).toBe(client);
  });

  it("updates an existing client", async () => {
    const client = Client.create({
      ...validCreateClientInput,
      birthDate: validCreateClientInput.birthDate as Date,
    }).getValue();

    createClientUseCase.execute.mockResolvedValue(client);
    await service.create(validCreateClientInput);

    const updated = service.update(client.id.getValue(), {} as Partial<Client>);

    expect(updated).toBeDefined();
    expect(updated?.id.getValue()).toBe(client.id.getValue());
    expect(updated?.updatedAt).toBeInstanceOf(Date);
  });

  it("returns undefined when updating a missing client", () => {
    expect(service.update("missing-id", {})).toBeUndefined();
  });
});
