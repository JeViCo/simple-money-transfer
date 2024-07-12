import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn('increment')
	public id!: number;

	@Column({
		type: 'integer',
	})
	balance!: number;
}
