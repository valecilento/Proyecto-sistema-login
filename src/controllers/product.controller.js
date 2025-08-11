import Product from '../models/product.model.js';

export const updateProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const { title, description, price, stock } = req.body;

    const updated = await Product.findByIdAndUpdate(
      pid,
      { title, description, price, stock },
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
