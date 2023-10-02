import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('uploads')
export class UploadModel {
  @PrimaryColumn('uuid')
  id: string;

  @Column('date')
  created_at: Date;

  @Column('date')
  updated_at: Date;

  @Column('uuid')
  owner_id: string;

  @Column('varchar')
  status: string;

  @Column('varchar')
  filename: string;

  @Column('int')
  file_size: number;

  @Column('varchar')
  mimetype: string;

  @Column('varchar')
  url: string;
}
