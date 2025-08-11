import Product from '../models/product.model.js';

export const renderAdminPanel = async (req, res) => {
  try {
    const products = await Product.find().lean();
    const user = req.user;

    res.render('panelAdmin', {
      title: 'Panel Admin',
      products,
      role: user?.role || 'user',
      user,
      editing: false
    });
    
  } catch (err) {
    res.status(500).send('Error al cargar los productos');
  }
};