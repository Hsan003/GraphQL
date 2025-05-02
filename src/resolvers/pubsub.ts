import { PubSub } from "graphql-subscriptions";
type CvEvents = {
  CV_CREATED: any;
  CV_UPDATED: any;
  CV_DELETED: any;
};
export const pubsub = new PubSub<CvEvents>();
