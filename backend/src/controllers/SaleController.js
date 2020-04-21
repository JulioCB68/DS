const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const { page = 1 } = request.query;

    const [count] = await connection('sales').count();

    const sales = await connection('sales')
      .join('users', 'users.id', '=', 'sales.user_id')
      .limit(10.000)
      .offset((page - 1) * 5)
      .select([
        'sales.*', 
      ]);

    response.header('X-Total-Count', count['count(*)']);

    return response.json(sales);
  },

  async create(request, response) {
    const { name, commands, requests, quantities, value } = request.body;
    const user_id = request.headers.authorization;

    const [id] = await connection('sales').insert({  
      name,
      commands,
      requests,
      quantities,
      value,
      user_id,
    });

    return response.json({ id });
  },

  async delete(request, response) {
    const { id } = request.params;
    const user_id = request.headers.authorization;

    const sale = await connection('sales')
      .where('id', id)
      .select('user_id')  
      .first();

    if (sale.user_id !== user_id) {
      return response.status(401).json({ error: 'Operation not permitted.' });
    }

    await connection('sales').where('id', id).delete();

    return response.status(204).send();
  }
};