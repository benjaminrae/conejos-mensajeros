import { Column, Entity, PrimaryColumn } from 'typeorm';
import { UserKeys } from '../../user.keys';

@Entity(UserKeys.USER_CREDENTIALS_TABLE)
export class UserCredentialsModel {
  @PrimaryColumn('uuid')
  id: string;

  @Column('date')
  created_at: Date;

  @Column('date')
  updated_at: Date;

  @Column('varchar')
  password: string;

  @Column('uuid')
  user_id: string;
}
