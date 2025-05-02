import { pubSub } from '../pubSubInstance';

export const Subscription = {
  cvAdded: {
    subscribe: () => pubSub.subscribe('cvAdded'),
    resolve:   (payload: { cvAdded: any; }) => payload.cvAdded,
  },
  cvUpdated: {
    subscribe: () => pubSub.subscribe('cvUpdated'),
    resolve:   (payload: { cvUpdated: any; }) => payload.cvUpdated,
  },
  cvDeleted: {
    subscribe: () => pubSub.subscribe('cvDeleted'),
    resolve:   (payload: { cvDeleted: any; }) => payload.cvDeleted,
  },
};
