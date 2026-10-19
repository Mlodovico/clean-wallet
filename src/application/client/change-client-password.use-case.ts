import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";

import { PasswordErrors } from "../../domain/client/errors/password.errors";
import { ClientRepositoryPort } from "../../domain/client/ports/client-repository.port";
import { Password } from "../../domain/client/vo/Password";
import { EventPublisherPort } from "../port/event-publisher.port";
import { PasswordHasherPort } from "../port/password-hasher.port";
import { UnitOfWorkPort } from "../port/unit-of-work.port";
import {
  findClientOrFail,
  toClientPersistenceRecord,
} from "./client-use-case.helpers";

export type ChangeClientPasswordInput = {
  id: string;
  currentPassword: string;
  newPassword: string;
};

@Injectable()
export class ChangeClientPasswordUseCase {
  constructor(
    private readonly clientRepository: ClientRepositoryPort,
    private readonly passwordHasher: PasswordHasherPort,
    private readonly eventPublisher: EventPublisherPort,
    private readonly unitOfWork: UnitOfWorkPort,
  ) {}

  async execute(input: ChangeClientPasswordInput): Promise<void> {
    const client = await findClientOrFail(this.clientRepository, input.id);

    const matches = await this.passwordHasher.compare(
      input.currentPassword ?? "",
      client.passwordHash.getValue(),
    );
    if (!matches) {
      throw new UnauthorizedException(
        PasswordErrors.currentPasswordIsInvalid().message,
      );
    }

    if (input.newPassword === input.currentPassword) {
      throw new BadRequestException(
        PasswordErrors.newPasswordMustBeDifferent().message,
      );
    }

    const passwordResult = Password.create(input.newPassword ?? "");
    if (passwordResult.isFailure) {
      throw new BadRequestException(
        `Invalid password: ${passwordResult.getError()}`,
      );
    }

    const result = client.changePassword(
      await this.passwordHasher.hash(input.newPassword),
    );
    if (result.isFailure) {
      throw new BadRequestException(result.getError());
    }

    const updated = result.getValue();

    try {
      await this.unitOfWork.run(async () => {
        await this.clientRepository.update(
          updated.id.getValue(),
          toClientPersistenceRecord(updated),
        );
        await this.eventPublisher.publish({
          type: "client.password_changed",
          payload: { clientId: updated.id.getValue() },
          occurredAt: new Date(),
        });
      });
    } catch {
      throw new InternalServerErrorException("Failed to change password");
    }
  }
}
