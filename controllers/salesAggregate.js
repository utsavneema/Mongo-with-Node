const mongoose = require("mongoose");
const sales = require ("../models/salesModel")

async function avgPrice(req, res) {
  try {
    const { quantity } = req.body;
    const result = await sales.aggregate([
      { $match: { quantity: parseInt(quantity) } },
      {
        $group: {
          _id: '$quantity',
          totalPrice: { $sum: '$price' },
          avgPrice: { $avg: '$price' }
        }
      }
    ]);
    res.status(200).json({ message: 'Data successfully fetched', result });
    console.log(result, '-------------------');
  } catch (error) {
    console.error('Error', error);
    res.status(500).json({ message: 'Error --------------------------------' });
  }
}
//--------------------------------------------------------------------------------------------------------------------

module.exports = {avgPrice}