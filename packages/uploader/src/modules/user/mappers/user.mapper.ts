import { Mapper, UniqueEntityId } from '@conejos-mensajeros/ddd';
import { Injectable } from '@nestjs/common';
import { User } from '../domain/user.entity';
import { UserResponse } from '../dtos/user-response.dto';
import { UserModel } from '../persistence/models/user.model';

@Injectable()
export class UserMapper implements Mapper<User, UserModel, UserResponse> {
  toDomain(data: UserModel): User {
    return new User({
      id: new UniqueEntityId(data.id),
      props: {
        email: data.email,
      },
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    });
  }

  toPersistence(domainEntity: User): UserModel {
    const userModel = new UserModel();
    const userProps = domainEntity.getProps();

    userModel.id = domainEntity.id;
    userModel.email = userProps.email;
    userModel.created_at = userProps.createdAt;
    userModel.updated_at = userProps.updatedAt;

    return userModel;
  }

  toPresenter(domainEntity: User): UserResponse {
    return new UserResponse(domainEntity);
  }
}
