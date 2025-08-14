import Product from '../models/product.model.js';

export const updateProduct = async (req, res) => {
  try {
    const id  = req.params.pid || req.params.id;
    const { title, description, price, stock, code } = req.body;

    const updated = await Product.findByIdAndUpdate(
      id,
      { title, description, price: Number(price), stock: Number(stock), code },
      { new: true }
    );
    console.log("Datos recibidos:", req.body);

    if (!updated) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    return res.status(200).json({ message: 'Producto actualizado', product: updated });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar producto', error });
  }
};
export const renderProducts = async (req, res) => {
  try {
    const products = await Product.find().lean(); 

    res.render('products', {
      title: 'Productos',
      products
    });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).send("Error interno del servidor");
  }
};