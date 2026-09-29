import {
  buildClient,
  validCreateClientInput,
} from "../../testing/fixtures/domain.fixtures";
import { ChangeClientPasswordUseCase } from "../../application/client/change-client-password.use-case";
import { ChangeClientStatusUseCase } from "../../application/client/change-client-status.use-case";
import { CreateClientUseCase } from "../../application/client/create-client.use-case";
import { FindClientUseCase } from "../../application/client/find-client.use-case";
import { GetClientUseCase } from "../../application/client/get-client.use-case";
import { UpdateClientUseCase } from "../../application/client/update-client.use-case";
import { ClientService } from "./client.service";

const mockUseCase = <T>(): jest.Mocked<T> =>
  ({ execute: jest.fn() }) as unknown as jest.Mocked<T>;

describe("ClientService", () => {
  let service: ClientService;
  let createClientUseCase: jest.Mocked<CreateClientUseCase>;
  let getClientUseCase: jest.Mocked<GetClientUseCase>;
  let updateClientUseCase: jest.Mocked<UpdateClientUseCase>;
  let changeClientStatusUseCase: jest.Mocked<ChangeClientStatusUseCase>;
  let changeClientPasswordUseCase: jest.Mocked<ChangeClientPasswordUseCase>;
  let findClientUseCase: jest.Mocked<FindClientUseCase>;

  beforeEach(() => {
    createClientUseCase = mockUseCase();
    getClientUseCase = mockUseCase();
    updateClientUseCase = mockUseCase();
    changeClientStatusUseCase = mockUseCase();
    changeClientPasswordUseCase = mockUseCase();
    findClientUseCase = mockUseCase();

    service = new ClientService(
      createClientUseCase,
      getClientUseCase,
      updateClientUseCase,
      changeClientStatusUseCase,
      changeClientPasswordUseCase,
      findClientUseCase,
    );
  });

  it("returns an empty list by default", () => {
    expect(service.findAll()).toEqual([]);
  });

  it("creates a client through the use case and stores it in memory", async () => {
    const client = buildClient({ status: "pending" });
    createClientUseCase.execute.mockResolvedValue(client);

    const created = await service.create(validCreateClientInput);

    expect(createClientUseCase.execute).toHaveBeenCalledWith(
      validCreateClientInput,
    );
    expect(created).toBe(client);
    expect(service.findAll()).toHaveLength(1);
  });

  it("finds a client by public id", async () => {
    const client = buildClient();
    getClientUseCase.execute.mockResolvedValue(client);

    await expect(service.findOne(client.id.getValue())).resolves.toBe(client);
    expect(getClientUseCase.execute).toHaveBeenCalledWith(client.id.getValue());
  });

  it("finds a client by document or email", async () => {
    const client = buildClient();
    findClientUseCase.execute.mockResolvedValue(client);

    await expect(service.findBy({ email: "murilo@example.com" })).resolves.toBe(
      client,
    );
    expect(findClientUseCase.execute).toHaveBeenCalledWith({
      email: "murilo@example.com",
    });
  });

  it("updates an existing client", async () => {
    const client = buildClient();
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

  it("changes the client status", async () => {
    const client = buildClient({ status: "suspended" });
    changeClientStatusUseCase.execute.mockResolvedValue(client);

    await expect(
      service.changeStatus(client.id.getValue(), "suspend"),
    ).resolves.toBe(client);
    expect(changeClientStatusUseCase.execute).toHaveBeenCalledWith({
      id: client.id.getValue(),
      action: "suspend",
    });
  });

  it("changes the client password", async () => {
    changeClientPasswordUseCase.execute.mockResolvedValue(undefined);
    const id = buildClient().id.getValue();

    await service.changePassword(id, "Password1!", "NewPassword2@");

    expect(changeClientPasswordUseCase.execute).toHaveBeenCalledWith({
      id,
      currentPassword: "Password1!",
      newPassword: "NewPassword2@",
    });
  });
});
