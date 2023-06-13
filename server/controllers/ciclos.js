const Ciclo = require('../models/Ciclo');



exports.crearCiclo = async (req, res) => {
  try {
    const nuevoCiclo = new Ciclo(req.body);
    await nuevoCiclo.save();
    res.json({ mensaje: 'Ciclo creado correctamente.' });
  } catch (error) {
    console.log(error);
    res.json({ mensaje: 'Hubo un error al crear el ciclo.' });
  }
};



exports.eliminarCiclo = async (req, res) => {
  try {
    const { id } = req.params;
    await Ciclo.findByIdAndDelete(id);
    res.json({ mensaje: 'Ciclo eliminado correctamente.' });
  } catch (error) {
    console.log(error);
    res.json({ mensaje: 'Hubo un error al eliminar el ciclo.' });
  }
};

exports.editarCiclo = async (req, res) => {
  try {
    const { id } = req.params;
    const cicloActualizado = req.body;
    await Ciclo.findByIdAndUpdate(id, cicloActualizado);
    res.json({ mensaje: 'Ciclo actualizado correctamente.' });
  } catch (error) {
    console.log(error);
    res.json({ mensaje: 'Hubo un error al actualizar el ciclo.' });
  }
};

exports.buscarCiclos = async (req, res) => {
  const nombre = req.query.nombre;
  try {
    const ciclos = await Ciclo.find({ nombre: { $regex: nombre, $options: 'i' } });
    res.json(ciclos);
  } catch (error) {
    console.log(error);
    res.json({ mensaje: 'Hubo un error al buscar los ciclos.' });
  }
};

exports.obtenerCiclos = async (req, res) => {
  try {
    const ciclos = await Ciclo.find();
    res.json(ciclos);
  } catch (error) {
    console.log(error);
    res.json({ mensaje: 'Hubo un error al obtener los ciclos.' });
  }
};

exports.getCiclo = async (req, res) => {

    try {
      const ciclo = await Ciclo.findById(req.params.id);
      res.json(ciclo);
    } catch (error) {   
      console.log(error);
      res.json({ mensaje: 'Hubo un error al obtener el ciclo.' });
    } 
  };


  exports.like = async (req, res) => {
    try {
      const cicloId = req.params.id;
      const usuarioId = req.body.usuarioId;
  
      // ¿Ciclo existe?
      const ciclo = await Ciclo.findById(cicloId);
      if (!ciclo) {
        return res.status(404).json({ mensaje: 'Ciclo no encontrado' });
      }
  
      // ¿Está el usuario ya en la lista?
      const usuarioYaDioLike = ciclo.likes.some(like => like.usuario?.equals(usuarioId));
      if (usuarioYaDioLike) {
        return res.status(400).json({ mensaje: 'El usuario ya ha dado like a este ciclo' });
      }
  
      // Si pasa todo lo anterior, añado
      ciclo.likes.push({ usuario: usuarioId });
      ciclo.numLikes = ciclo.likes.length;
      await ciclo.save();
  
      res.status(200).json({ mensaje: 'Like añadido correctamente',ciclo: ciclo });
    } catch (error) {
      console.error('Error al añadir like:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  };

  exports.dislike = async (req, res) => {
    try {
      const cicloId = req.params.id;
      const usuarioId = req.body.usuarioId;
  
      
      const ciclo = await Ciclo.findById(cicloId);
      if (!ciclo) {
        return res.status(404).json({ mensaje: 'Ciclo no encontrado' });
      }
  
      
      const likeIndex = ciclo.likes.findIndex(like => like.usuario?.equals(usuarioId));
      if (likeIndex === -1) {
        return res.status(400).json({ mensaje: 'El usuario no ha dado like a este ciclo' });
      }
  
      
      ciclo.likes.splice(likeIndex, 1);
      ciclo.numLikes = ciclo.likes.length;
      await ciclo.save();
  
      res.status(200).json({ mensaje: 'Dislike realizado correctamente',ciclo: ciclo });
    } catch (error) {
      console.error('Error al realizar dislike:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  };
  
  exports.getCiclosByAutor = async (req, res) => {
    try {
      const autorId = req.params.id;
      const ciclos = await Ciclo.find({ autor: autorId }).populate('autor');
      res.json(ciclos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al obtener los ciclos del autor' });
    }
  };


  exports.getComentarios = async (req, res) => {
    
    try {
      const cicloId = req.params.id;
      const ciclo = await Ciclo.findById(cicloId);
      if (!ciclo) {
        return res.status(404).json({ mensaje: 'Ciclo no encontrado' });
      }
  
      res.status(200).json({ 
        
        comentarios: ciclo.comentarios,
        
        });
    } catch (error) {
      console.error('Error al obtener comentarios:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  }

  exports.addComentario = async (req, res) => {

    try {
      const cicloId = req.params.id;
      const usuarioId = req.body.usuario;
      const comentario = req.body.comentario;
      const id= req.body.id;
  
      const ciclo = await Ciclo.findById(cicloId);
      if (!ciclo) {
        return res.status(404).json({ mensaje: 'Ciclo no encontrado' });
      }
  
      ciclo.comentarios.push({ usuario: usuarioId, comentario, id });
      await ciclo.save();
  
      res.status(200).json({ mensaje: 'Comentario añadido correctamente',ciclo: ciclo });
    } catch (error) {
      console.error('Error al añadir comentario:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  }

  

exports.deleteComentario = async (req, res) => {
  try {
    const comentarioId = req.params.id;
    const cicloId = req.body.cicloId;

    // Buscar el ciclo por su ID y el comentario a eliminar por su ID
    const ciclo = await Ciclo.findById(cicloId);
    if (!ciclo) {
      return res.status(404).json({ mensaje: 'Ciclo no encontrado' });
    }

    const comentario = ciclo.comentarios.find(com => com._id.toString() === comentarioId);
    if (!comentario) {
      return res.status(404).json({ mensaje: 'Comentario no encontrado' });
    }

    // Eliminar el comentario del arreglo de comentarios
    ciclo.comentarios = ciclo.comentarios.filter(com => com._id.toString() !== comentarioId);

    // Guardar los cambios en la base de datos
    await ciclo.save();

    res.status(200).json({ mensaje: 'Comentario eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar comentario:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};







