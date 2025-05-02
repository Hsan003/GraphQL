export const Subscription = {
  cvAdded: {
    subscribe: (_parent: unknown, _args: unknown, { pubSub }: any) =>
      pubSub.subscribe('CV_ADDED'),
    resolve: (payload: any) => payload,
  },
  cvUpdated: {
    subscribe: (_parent: unknown, _args: unknown, { pubSub }: any) =>
      pubSub.subscribe('CV_UPDATED'),
    resolve: (payload: any) => payload,
  },
  cvDeleted: {
    subscribe: (_parent: unknown, _args: unknown, { pubSub }: any) =>
      pubSub.subscribe('CV_DELETED'),
    resolve: (payload: any) => payload,
  },
};
