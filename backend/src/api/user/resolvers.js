import { szeAuth } from "szeutils";

export default {
  Query: {
    async getUser(parent, args, { api, request }, info) {
      let user = null;
      try {
        user = await api.authorize(request);
      } catch (err) {
        console.log(err);
        return null;
      }

      return user;
    }
  },

  Mutation: {
    async createUser(parent, args, { api }, info) {
      const { email, password } = args;
      const User = api.user;

      const user = await User.createUser(email, password);
      return user;
    },

    async updateUser(parent, args, { api, request }, info) {
      api.authorize(request, args.id);

      const oldUser = await api.user
        .findOneAndUpdate({ _id: args.id }, args.data)
        .exec();

      const user = { ...oldUser.toJSON(), ...args.data };
      request.session.user = user;

      return user;
    },

    async login(parent, args, { api, request }, info) {
      const { email, password } = args;
      const User = api.user;

      const user = await User.auth(email, password);
      request.session.user = user;

      return user;
    }
  },

  User: {
    async portfolio(parent, args, { request, api }, info) {
      api.authorize(request, parent.id);
      const portfolio = await api.portfolio.find({ owner: parent.id });

      return portfolio;
    }
  }
};
