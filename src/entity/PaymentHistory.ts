import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	CreateDateColumn,
} from 'typeorm';

@Entity()
export class PaymentHistory extends BaseEntity {
	@PrimaryGeneratedColumn('increment')
	public id!: number;

	@Column({
		type: 'integer',
	})
	user_id!: number;

	@Column({
		type: 'varchar',
	})
	action!: string;

	@Column({
		type: 'integer',
	})
	amount!: number;

	@CreateDateColumn({
		type: 'timestamp',
	})
	ts!: Date;
}
