import { Testimonial } from '../models/Testimoniales.js';


const guardarTestimonial = async (req,res) => {

    //Validar..
    const {nombre, correo, mensaje } = req.body;

    const errores = [];

    if(nombre.trim() === ''){
        errores.push({mensaje : 'el nombre esta vacio'});
    }

    if(correo.trim() === ''){
        errores.push({mensaje : 'el correo esta vacio'});
    }

    if(mensaje.trim() === ''){
        errores.push({mensaje : 'el mensaje esta vacio'});
    }

    if(errores.length > 0){
        //Consultar testimoniales
        const testimoniales = await Testimonial.findAll();
        //Mostrar la vista con erroes
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        });
    }else{
        //Almacenar en base de datos
        try { 
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            });

            res.redirect('/testimoniales');

        } catch (error) {
            console.error(error);
        }
    }


    
}

export {
    guardarTestimonial
}