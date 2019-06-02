import { CreateMensajeDto } from './dto/create-mensaje-dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mensaje } from './entities/mensaje.entity';

@Injectable()
export class MensajesService {
    constructor(
        @InjectRepository(Mensaje)private readonly messageRepository: Repository<Mensaje>,
    ) {}

    async getAll() {
        return await this.messageRepository.find();
    }

    async createMessage(mensaje: CreateMensajeDto) {
        const nuevoMensaje = new Mensaje();
        nuevoMensaje.mensaje = mensaje.mensaje;
        nuevoMensaje.nick = mensaje.nick;
        return await this.messageRepository.save(nuevoMensaje);
    }

    async updateMessage(id: number, mensaje: CreateMensajeDto) {
        const mensajeUpdate = await this.messageRepository.findOne(id);
        mensajeUpdate.nick = mensaje.nick;
        mensajeUpdate.mensaje = mensaje.mensaje;
        return await this.messageRepository.save(mensajeUpdate);
    }

    async deleteMessage(id: number) {
        return  await this.messageRepository.delete(id);
    }
}
