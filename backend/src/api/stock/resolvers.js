export default {
  Query: {
    async getStocks(parent, args, { api, request }, info) {
      const stocks = await api.stock.find();
      return stocks;
    }
  },

  Mutation: {
    async randomizeStocks(parent, args, { api, request }, info) {
      const stocks = await api.stock.find();
      stocks.forEach(stock => {
        const priceMod = Math.round(Math.random() * 20 - 10); //rnd number between -10 and 10
        stock.price += priceMod;
        stock.save();
      });

      return stocks;
    }
  }
};
