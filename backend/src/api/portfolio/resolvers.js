export default {
  Query: {
    async portfolios(parent, args, { api, request }, info) {
      api.authorize(request, args.userId);

      const portfolios = await api.portfolio.find({ owner: args.userId });
      return portfolios.toJSON();
    },

    async portfolio(parent, args, { api, request }, info) {
      api.authorize(request, args.userId);

      const portfolio = await api.portfolio.findOne({
        _id: args.portfolioId,
        owner: args.userId
      });
      return portfolio.toJSON();
    }
  },

  Mutation: {
    async createPortfolio(parent, { data }, { api, request }, info) {
      const user = await api.authorize(request, data.owner);
      const stock = await api.stock.findOne({ _id: data.stock }).exec();
      const totalCost = stock.price * data.amount;

      if (user.funds < totalCost) throw new Error("Not enough funds");

      user.funds -= totalCost;
      await api.user.findOneAndUpdate({ _id: user.id }, { funds: user.funds });

      const portfolio = await new api.portfolio(data).save();
      return portfolio.toJSON();
    },

    async updatePortfolio(parent, args, { api, request }, info) {
      const user = await api.authorize(request, args.userId);
      const self = api.resolvers.Mutation;

      if (args.data.buy === true) {
        const portfolio = await api.portfolio
          .findOne({
            _id: args.id,
            owner: user.id
          })
          .exec();
        const stock = await api.stock
          .findOne({
            _id: portfolio.stock
          })
          .exec();

        const totalPrice = args.data.amount * stock.price;
        if (totalPrice > user.funds) throw new Error("not enough funds");

        user.funds -= totalPrice;
        portfolio.amount += args.data.amount;

        user.save();
        portfolio.save();
        return portfolio;
      } else {
        if (args.data.amount <= 0)
          portfolio = self.deletePortfolio(
            parent,
            args,
            { api, request },
            info
          );
        else {
          portfolio = await api.portfolio
            .findOneAndUpdate({ _id: args.id, owner: args.userId }, args.data)
            .exec();
          portfolio = portfolio.toJSON();
        }

        return { ...portfolio, ...args.data };
      }
    },

    async deletePortfolio(parent, args, { api, request }, info) {
      api.authorize(request, args.userId);

      const portfolio = await api.portfolio
        .findOneAndRemove({
          _id: args.id,
          owner: args.userId
        })
        .exec();

      return portfolio.toJSON();
    }
  },

  Portfolio: {
    async owner(parent, args, { api, request }, info) {
      api.authorize(request, args.userId);

      const owner = await api.user.findOne({ _id: parent.owner });
      return owner;
    },

    async stock(parent, args, { api, request }, info) {
      api.authorize(request, args.userId);

      const stock = await api.stock.findOne({ _id: parent.stock });
      return stock;
    }
  }
};
