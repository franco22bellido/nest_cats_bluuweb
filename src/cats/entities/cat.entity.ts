import { Breed } from 'src/breeds/entities/breed.entity';
import {Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Cat {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    name: string;
    @Column()
    age : number;

    @DeleteDateColumn()
    deletedAt : Date;

    @Column()
    breedId: number;

    @ManyToOne(()=> Breed, breed => breed.cats, {eager: false})
    breed: Breed;
    
}