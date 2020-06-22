const resolver = {
  Query: {
    login: () => ({
      email: 'String',
      passowrd: 'String',
    }),
  },
};

export default resolver;
