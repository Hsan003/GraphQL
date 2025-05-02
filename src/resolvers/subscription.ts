import { pubsub } from "./pubsub";

export const Subscription = {
  cvCreated: {
    subscribe: (): any => pubsub.asyncIterableIterator("CV_CREATED"),
  },
  cvUpdated: {
    subscribe: (): any => pubsub.asyncIterableIterator("CV_UPDATED"),
  },
  cvDeleted: {
    subscribe: (): any => pubsub.asyncIterableIterator("CV_DELETED"),
  },
};
