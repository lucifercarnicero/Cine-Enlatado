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

  exports.getThreeRandomCiclos = async (req, res) => {
    const uri = 'mongodb+srv://lu:lu@cluster0.gb4jbia.mongodb.net/MEAN'; // Reemplaza con tu propia URI de conexión a MongoDB
  
    try {
      const client = new MongoClient(uri);
      await client.connect();
  
      const database = client.db('MEAN');
      const collection = database.collection('Ciclos');
  
      const randomCiclos = await collection.find().limit(3).toArray();
  
      res.json(randomCiclos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Hubo un error al obtener los ciclos aleatorios.' });
    } finally {
      client.close();
    }
  };






