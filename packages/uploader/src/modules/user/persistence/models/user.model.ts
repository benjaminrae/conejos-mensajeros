import { Column, Entity, PrimaryColumn } from 'typeorm';
import { UserKeys } from '../../user.keys';

@Entity(UserKeys.USER_TABLE)
export class UserModel {
  @PrimaryColumn('uuid')
  id: string;

  @Column('date')
  created_at: Date;

  @Column('date')
  updated_at: Date;

  @Column('varchar', {
    unique: true,
  })
  email: string;
}
