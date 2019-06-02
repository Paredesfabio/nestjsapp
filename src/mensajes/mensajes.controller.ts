import { Controller, Get, Post, Put, Body, Res, Delete, HttpStatus, Param } from '@nestjs/common';
import { CreateMensajeDto } from './dto/create-mensaje-dto';
import { MensajesService } from './mensajes.service';
import { Mensaje } from './entities/mensaje.entity';

@Controller('mensajes')
export class MensajesController {

    constructor(private readonly  mensajeService: MensajesService) {}

    @Post()
    create(@Body() createmensajedto: CreateMensajeDto, @Res() response) {
        this.mensajeService.createMessage(createmensajedto)
        .then( mensaje => {
            response.status(HttpStatus.CREATED).json(mensaje);
        }).catch( err => {
            response.status(HttpStatus.FORBIDDEN).json({ mensaje: 'Error en la creacion del mnesaje'});
        });
    }

    @Get()
    getAll(@Res() response) {
        this.mensajeService.getAll()
        .then( mensaje => {
            response.status(HttpStatus.OK).json(mensaje);
        }).catch( err => {
            response.status(HttpStatus.FORBIDDEN).json({ mensaje: `Error al obtener la lista de mensajes mnesaje ${ err }`});
        });
    }

    @Put(':id')
    update(@Body() updatemensajedto: CreateMensajeDto, @Res() response, @Param('id') id) {
        this.mensajeService.updateMessage(id, updatemensajedto)
        .then( mensaje => {
            response.status(HttpStatus.OK).json(mensaje);
        }).catch( err => {
            response.status(HttpStatus.FORBIDDEN).json({ mensaje: `Error al actualizar el mensaje ${ err }`});
        });
    }

    @Delete(':id')
    delete(@Res() response, @Param('id') id): any {
        this.mensajeService.deleteMessage(id)
        .then( mensaje => {
            response.status(HttpStatus.OK).json(mensaje);
        }).catch( err => {
            response.status(HttpStatus.FORBIDDEN).json({ mensaje: `Error al eliminar el mensaje ${ err }`});
        });
    }
}
